"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, type Product } from "@/data/products";
import {
  calculateCartTotals,
  emptyCart,
  normalizeCartLines,
  upsertProductCartLines,
  type CartState,
} from "@/lib/cart";

type CartContextValue = CartState & {
  isOpen: boolean;
  totals: ReturnType<typeof calculateCartTotals>;
  activePromoCodes: string[];
  addProduct: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setGiftMessage: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "buudy-cart-v2";
const legacyStorageKey = "buudy-cart-v1";

function readStoredCart() {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return null;
  }

  try {
    return (
      window.localStorage.getItem(storageKey) ??
      window.localStorage.getItem(legacyStorageKey)
    );
  } catch {
    return null;
  }
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(emptyCart);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    window.requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }

      try {
        const stored = readStoredCart();
        if (stored) {
          const parsed = JSON.parse(stored) as CartState;
          const storedState = {
            ...emptyCart,
            ...parsed,
            lines: normalizeCartLines(parsed.lines ?? []),
          };
          const hasStoredCart =
            storedState.lines.length > 0 || storedState.giftMessage.length > 0;

          if (hasStoredCart) {
            setState((current) =>
              current.lines.length > 0 || current.giftMessage ? current : storedState,
            );
          }
        }
      } finally {
        setHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeStoredCart(state);
  }, [hydrated, state]);

  const totals = useMemo(() => calculateCartTotals(state.lines), [state.lines]);
  const activePromoCodes = useMemo(() => {
    const productIds = new Set(
      state.lines
        .filter((line) => line.type === "product")
        .map((line) => line.productId),
    );

    return Array.from(productIds)
      .map((productId) => getProductById(productId)?.promoCode)
      .filter((code): code is string => Boolean(code));
  }, [state.lines]);

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

      return {
        ...current,
        lines: upsertProductCartLines(current.lines, product, quantity),
      };
    });
  }

  function removeProduct(productId: string) {
    setState((current) => ({
      ...current,
      lines: current.lines.filter((line) => line.productId !== productId),
    }));
  }

  function clearCart() {
    setState(emptyCart);
  }

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      isOpen,
      totals,
      activePromoCodes,
      addProduct,
      setQuantity,
      removeProduct,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setGiftMessage: (message: string) =>
        setState((current) => ({ ...current, giftMessage: message })),
    }),
    [activePromoCodes, isOpen, state, totals],
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
