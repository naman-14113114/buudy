"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buudyMask, type Product } from "@/data/products";
import {
  buildProductCartLines,
  calculateCartTotals,
  emptyCart,
  type CartLine,
  type CartState,
} from "@/lib/cart";

type CartContextValue = CartState & {
  isOpen: boolean;
  totals: ReturnType<typeof calculateCartTotals>;
  addProduct: (product: Product) => void;
  setQuantity: (quantity: number) => void;
  removeProduct: () => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setGiftMessage: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "buudy-cart-v1";

function readStoredCart() {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return null;
  }

  try {
    return window.localStorage.getItem(storageKey);
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

function normalizeLines(lines: CartLine[]) {
  const productLine = lines.find((line) => line.type === "product");
  const quantity = Math.max(productLine?.quantity ?? 0, 0);

  return quantity > 0 ? buildProductCartLines(buudyMask, quantity) : [];
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
            lines: normalizeLines(parsed.lines ?? []),
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

  function addProduct(product: Product) {
    setState((current) => {
      const currentProduct = current.lines.find((line) => line.type === "product");
      const quantity = (currentProduct?.quantity ?? 0) + 1;

      return {
        ...current,
        lines: buildProductCartLines(product, quantity),
      };
    });
    setIsOpen(true);
  }

  function setQuantity(quantity: number) {
    setState((current) => ({
      ...current,
      lines: quantity > 0 ? buildProductCartLines(buudyMask, quantity) : [],
    }));
  }

  function removeProduct() {
    setState((current) => ({
      ...current,
      lines: [],
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
      addProduct,
      setQuantity,
      removeProduct,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setGiftMessage: (message: string) =>
        setState((current) => ({ ...current, giftMessage: message })),
    }),
    [isOpen, state, totals],
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
