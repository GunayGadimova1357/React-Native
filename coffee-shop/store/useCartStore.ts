import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CoffeeProduct, CoffeeSize } from "../data/coffee";

export type CartItem = {
  product: CoffeeProduct;
  size: CoffeeSize;
  qty: number;
};

type CartState = {
  items: CartItem[];

  add: (product: CoffeeProduct, size: CoffeeSize, qty?: number) => void;
  increase: (id: string, size: CoffeeSize) => void;
  decrease: (id: string, size: CoffeeSize) => void;
  remove: (id: string, size: CoffeeSize) => void;

  clear: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, size, qty = 1) =>
        set((state) => {
          const found = state.items.find(
            (i) => i.product.id === product.id && i.size === size,
          );

          if (found) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size === size
                  ? { ...i, qty: i.qty + qty }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, { product, size, qty }],
          };
        }),

      increase: (id, size) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id && i.size === size
              ? { ...i, qty: i.qty + 1 }
              : i,
          ),
        })),

      decrease: (id, size) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.product.id === id && i.size === size
                ? { ...i, qty: i.qty - 1 }
                : i,
            )
            .filter((i) => i.qty > 0),
        })),

      remove: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === id && i.size === size),
          ),
        })),

      clear: () => set({ items: [] }),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.prices[i.size] * i.qty,
          0,
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
