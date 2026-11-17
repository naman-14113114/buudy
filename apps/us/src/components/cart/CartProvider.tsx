"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import { appendAttributionToPath, pickAttributionFromSearch } from "@/lib/attribution";
import { getProductById, type Product } from "@/data/products";
import {
  calculateCartTotals,
  emptyCart,
  ensureProductInCart,
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
  addProduct: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyManualPromoCode: (code: string) => boolean;
  removeManualPromoCode: (code?: string) => void;
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
      const rawCodes = Array.isArray(parsed.manualPromoCodes)
        ? parsed.manualPromoCodes
        : parsed.manualPromoCode
        ? [parsed.manualPromoCode]
        : [];
      const validCodes = Array.from(
        new Set(rawCodes.map((c) => getAppliedManualPromoCode(c)).filter(Boolean)),
      );

      const storedState = {
        ...emptyCart,
        ...parsed,
        manualPromoCode: validCodes[0] || "",
        manualPromoCodes: validCodes,
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

function dispatchAddToCartEvent(product: Product) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("buudy:add-to-cart", {
      detail: {
        product,
      },
    }),
  );
}

export function writeCheckoutSnapshot(state: CartState) {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    window.localStorage.setItem(checkoutSnapshotStorageKey, JSON.stringify(state));
  } catch {
    // Checkout should continue even when storage is unavailable.
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
  const [state, setRenderedState] = useState<CartState>(emptyCart);
  const latestState = useRef(state);
  const router = useRouter();
  // Synchronous shared state also covers clicks on two different CTAs before
  // React renders either button's disabled state.
  const setState = useCallback((update: SetStateAction<CartState>) => {
    const next = typeof update === "function" ? update(latestState.current) : update;
    latestState.current = next;
    setRenderedState(next);
  }, []);
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
  }, [setState]);

  useEffect(() => {
    if (window.location.pathname === "/cart") return;
    router.prefetch(appendAttributionToPath("/cart", pickAttributionFromSearch(window.location.search)));
  }, [router]);

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
    const codes =
      state.manualPromoCodes && state.manualPromoCodes.length > 0
        ? state.manualPromoCodes
        : state.manualPromoCode
        ? [state.manualPromoCode]
        : [];
    return Array.from(new Set(codes.map(getAppliedManualPromoCode).filter(Boolean)));
  }, [state.manualPromoCode, state.manualPromoCodes]);

  function addProduct(product: Product, quantity = 1) {
    const current = latestState.current;
    const next = ensureProductInCart(current, product, quantity);
    if (next === current) return;
    const previousQuantity = current.lines.find(line => line.type === "product" && line.productId === product.id)?.quantity ?? 0;
    setState(next);
    // Persist before navigation, including for a full reload or interrupted tab.
    writeCheckoutSnapshot(next);
    for (let added = previousQuantity; added < quantity; added++) dispatchAddToCartEvent(product);
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
      const existingCodes =
        current.manualPromoCodes && current.manualPromoCodes.length > 0
          ? current.manualPromoCodes
          : current.manualPromoCode
          ? [current.manualPromoCode]
          : [];

      if (existingCodes.includes(canonical)) {
        return current;
      }

      applied = true;
      const nextCodes = [...existingCodes, canonical];
      return {
        ...current,
        manualPromoCode: nextCodes[0] || "",
        manualPromoCodes: nextCodes,
      };
    });

    return applied;
  }

  function removeManualPromoCode(code?: string) {
    setState((current) => {
      if (!code) {
        return {
          ...current,
          manualPromoCode: "",
          manualPromoCodes: [],
        };
      }
      const canonical = getAppliedManualPromoCode(code);
      const nextCodes = (current.manualPromoCodes || []).filter(
        (c) => c !== canonical && c !== code,
      );
      return {
        ...current,
        manualPromoCode: nextCodes[0] || "",
        manualPromoCodes: nextCodes,
      };
    });
  }

  function clearManualPromoCode() {
    setState((current) => ({
      ...current,
      manualPromoCode: "",
      manualPromoCodes: [],
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
    [activePromoCodes, hydrated, isOpen, state, totals, setState],
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
