"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: number;
  title: string;
  imageSrc: string;
  unitPrice: number; // numeric USD/price value (no currency symbol)
  quantity: number;
};

type CartInputItem = {
  id: number;
  title: string;
  imageSrc: string;
  unitPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  lastAddedItemId: number | null;
  addItem: (item: CartInputItem, quantity?: number) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart_items_v1";

export function parseMoneyLabel(input: string) {
  // Expected format like "$299". Fallback to 0.
  const cleaned = input.replace(/[^0-9.]/g, "");
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return [];

      return parsed
        .filter((x) => typeof (x as { id?: unknown })?.id === "number")
        .map((x) => {
          const item = x as {
            id?: unknown;
            title?: unknown;
            imageSrc?: unknown;
            unitPrice?: unknown;
            quantity?: unknown;
          };

          const id = typeof item.id === "number" ? item.id : 0;
          const unitPrice = typeof item.unitPrice === "number" ? item.unitPrice : 0;
          const quantity = typeof item.quantity === "number" ? item.quantity : 1;

          return {
            id,
            title: typeof item.title === "string" ? item.title : "",
            imageSrc:
              typeof item.imageSrc === "string" ? item.imageSrc : "",
            unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
            quantity: Number.isFinite(quantity) ? quantity : 1,
          };
        })
        .filter((x) => x.id > 0);
    } catch {
      return [];
    }
  });

  const [lastAddedItemId, setLastAddedItemId] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors.
    }
  }, [items]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const addItem = useCallback(
    (item: CartInputItem, quantity = 1) => {
      if (!item?.id) return;
      const qty = Math.max(1, quantity);

      // UI feedback: mark this specific product as "just added".
      setLastAddedItemId(item.id);
      window.setTimeout(() => {
        setLastAddedItemId((prev) => (prev === item.id ? null : prev));
      }, 1400);

      setItems((prev) => {
        const existingIndex = prev.findIndex((p) => p.id === item.id);
        if (existingIndex >= 0) {
          const next = [...prev];
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + qty,
          };
          return next;
        }

        return [
          ...prev,
          { ...item, quantity: qty, unitPrice: Number(item.unitPrice) || 0 },
        ];
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: number) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems],
  );

  const setQuantity = useCallback(
    (id: number, quantity: number) => {
      const qty = Math.max(0, Math.floor(quantity));
      setItems((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: qty } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [setItems],
  );

  const increment = useCallback(
    (id: number) => {
      setQuantity(id, (items.find((x) => x.id === id)?.quantity || 0) + 1);
    },
    [items, setQuantity],
  );

  const decrement = useCallback(
    (id: number) => {
      setQuantity(id, (items.find((x) => x.id === id)?.quantity || 0) - 1);
    },
    [items, setQuantity],
  );

  const clear = useCallback(() => setItems([]), []);

  const value: CartContextValue = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      lastAddedItemId,
      addItem: (item, quantity) => addItem(item, quantity),
      removeItem,
      setQuantity,
      increment,
      decrement,
      clear,
    }),
    [
      items,
      itemCount,
      subtotal,
      lastAddedItemId,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

