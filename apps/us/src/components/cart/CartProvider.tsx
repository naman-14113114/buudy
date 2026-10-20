"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, type Product } from "@/data/products";
import {
  calculateCartTotals,
  emptyCart,
  getAppliedManualPromoCode,
  normalizeManualPromoCode,
  normalizeCartLines,
  upsertProductCartLines,
  type CartState,
} from "@/lib/cart";

type CartContextValue = CartState & {
  isHydrated: boolean;
  isOpen: boolean;
  totals: ReturnType<typeof calculateCartTotals>;
  activePromoCodes: string[];
  addProduct: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyManualPromoCode: (code: string) => boolean;
  removeManualPromoCode: (code: string) => void;
  clearManualPromoCode: () => void;
  setGiftMessage: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "buudy-cart-v2";
const legacyStorageKey = "buudy-cart-v1";
export const checkoutSnapshotStorageKey = "buudy-cart-checkout-snapshot-v1";

function hasProductLines(state: CartState) {
  return state.lines.some((line) => line.type === "product" && line.quantity > 0);
}

function readStoredCartCandidates() {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return [];
  }

  try {
    return [
      window.localStorage.getItem(storageKey),
      window.localStorage.getItem(checkoutSnapshotStorageKey),
      window.localStorage.getItem(legacyStorageKey),
    ].filter((stored): stored is string => Boolean(stored));
  } catch {
    return [];
  }
}

function readStoredCart() {
  let messageOnlyState: CartState | null = null;

  for (const stored of readStoredCartCandidates()) {
    try {
      const parsed = JSON.parse(stored) as CartState;
      const storedState = {
        ...emptyCart,
        ...parsed,
        manualPromoCodes: Array.from(
          new Set(
            (Array.isArray(parsed.manualPromoCodes)
              ? parsed.manualPromoCodes
              : parsed.manualPromoCode
              ? [parsed.manualPromoCode]
              : []
            )
              .map((c) => getAppliedManualPromoCode(c))
              .filter(Boolean),
          ),
        ),
        manualPromoCode: getAppliedManualPromoCode(
          Array.isArray(parsed.manualPromoCodes) && parsed.manualPromoCodes[0]
            ? parsed.manualPromoCodes[0]
            : parsed.manualPromoCode,
        ),
        lines: normalizeCartLines(Array.isArray(parsed.lines) ? parsed.lines : []),
      };

      if (hasProductLines(storedState)) {
        return storedState;
      }

      if (!messageOnlyState && storedState.giftMessage.length > 0) {
        messageOnlyState = storedState;
      }
    } catch {
      // A stale cart payload should not block a valid checkout backup.
    }
  }

  return messageOnlyState;
}

function writeStoredCart(state: CartState) {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Private browsing and embedded browsers can disable storage.
  }
}

export function writeCheckoutSnapshot(state: CartState) {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return;
  }

  try {
    window.localStorage.setItem(
      checkoutSnapshotStorageKey,
      JSON.stringify({
        ...state,
        savedAt: new Date().toISOString(),
      }),
    );
  } catch {
    // Private browsing and embedded browsers can disable storage.
  }
}

function clearCheckoutRecovery(state: CartState) {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    window.localStorage.removeItem(checkoutSnapshotStorageKey);
    window.localStorage.removeItem(legacyStorageKey);
  } catch {
    // Private browsing and embedded browsers can disable storage.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(emptyCart);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useLayoutEffect(() => {
    function recoverStoredCart() {
      setState((current) => {
        if (hasProductLines(current)) {
          return current;
        }

        return readStoredCart() ?? current;
      });
      setHydrated(true);
    }

    recoverStoredCart();
    window.addEventListener("pageshow", recoverStoredCart);

    return () => window.removeEventListener("pageshow", recoverStoredCart);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeStoredCart(state);
    if (hasProductLines(state)) {
      writeCheckoutSnapshot(state);
    }
  }, [hydrated, state]);

  const totals = useMemo(
    () =>
      calculateCartTotals(
        state.lines,
        state.manualPromoCodes && state.manualPromoCodes.length > 0
          ? state.manualPromoCodes
          : state.manualPromoCode
          ? [state.manualPromoCode]
          : [],
      ),
    [state.lines, state.manualPromoCode, state.manualPromoCodes],
  );

  const activePromoCodes = useMemo(() => {
    const productIds = new Set(
      state.lines
        .filter((line) => line.type === "product")
        .map((line) => line.productId),
    );

    const productPromoCodes = Array.from(productIds)
      .map((productId) => getProductById(productId)?.promoCode)
      .filter((code): code is string => Boolean(code));

    const manualCodes =
      state.manualPromoCodes && state.manualPromoCodes.length > 0
        ? state.manualPromoCodes
        : state.manualPromoCode
        ? [state.manualPromoCode]
        : [];

    return Array.from(new Set([...productPromoCodes, ...manualCodes]));
  }, [state.lines, state.manualPromoCode, state.manualPromoCodes]);

  function addProduct(product: Product) {
    setState((current) => {
      const currentProduct = current.lines.find(
        (line) => line.type === "product" && line.productId === product.id,
      );
      const quantity = (currentProduct?.quantity ?? 0) + 1;

      return {
        ...current,
        lines: upsertProductCartLines(current.lines, product, quantity),
      };
    });
  }

  function setQuantity(productId: string, quantity: number) {
    setState((current) => {
      const product = getProductById(productId);

      if (!product) {
        return current;
      }

      const nextState = {
        ...current,
        lines: upsertProductCartLines(current.lines, product, quantity),
      };

      if (!hasProductLines(nextState)) {
        const emptyState = { ...nextState, manualPromoCode: "", manualPromoCodes: [] };
        clearCheckoutRecovery(emptyState);
        return emptyState;
      }

      return nextState;
    });
  }

  function removeProduct(productId: string) {
    setState((current) => {
      const nextState = {
        ...current,
        lines: current.lines.filter((line) => line.productId !== productId),
      };

      if (!hasProductLines(nextState)) {
        const emptyState = { ...nextState, manualPromoCode: "", manualPromoCodes: [] };
        clearCheckoutRecovery(emptyState);
        return emptyState;
      }

      return nextState;
    });
  }

  function applyManualPromoCode(code: string) {
    const canonical = getAppliedManualPromoCode(code);
    if (!canonical) return false;

    let applied = false;
    setState((current) => {
      const currentCodes =
        current.manualPromoCodes && current.manualPromoCodes.length > 0
          ? current.manualPromoCodes
          : current.manualPromoCode
          ? [current.manualPromoCode]
          : [];

      if (currentCodes.includes(canonical)) {
        return current;
      }

      applied = true;
      const nextCodes = [...currentCodes, canonical];
      return {
        ...current,
        manualPromoCodes: nextCodes,
        manualPromoCode: nextCodes[0] || "",
      };
    });

    return applied;
  }

  function removeManualPromoCode(code: string) {
    const canonical = getAppliedManualPromoCode(code) || normalizeManualPromoCode(code);
    setState((current) => {
      const currentCodes =
        current.manualPromoCodes && current.manualPromoCodes.length > 0
          ? current.manualPromoCodes
          : current.manualPromoCode
          ? [current.manualPromoCode]
          : [];

      const nextCodes = currentCodes.filter((c) => c !== canonical && c !== code);
      return {
        ...current,
        manualPromoCodes: nextCodes,
        manualPromoCode: nextCodes[0] || "",
      };
    });
  }

  function clearManualPromoCode() {
    setState((current) => ({
      ...current,
      manualPromoCodes: [],
      manualPromoCode: "",
    }));
  }

  function clearCart() {
    clearCheckoutRecovery(emptyCart);
    setState(emptyCart);
  }

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      isHydrated: hydrated,
      isOpen,
      totals,
      activePromoCodes,
      addProduct,
      setQuantity,
      removeProduct,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      applyManualPromoCode,
      removeManualPromoCode,
      clearManualPromoCode,
      setGiftMessage: (message: string) =>
        setState((current) => ({ ...current, giftMessage: message })),
    }),
    [activePromoCodes, hydrated, isOpen, state, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
