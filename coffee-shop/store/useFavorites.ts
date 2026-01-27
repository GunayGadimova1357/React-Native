import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CoffeeProduct } from "../data/coffee";

type FavoritesState = {
  items: CoffeeProduct[];
  toggle: (product: CoffeeProduct) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) =>
        set((state) => {
          const exists = state.items.some((p) => p.id === product.id);

          return {
            items: exists
              ? state.items.filter((p) => p.id !== product.id)
              : [...state.items, product],
          };
        }),

      isFavorite: (id) => get().items.some((p) => p.id === id),

      clear: () => set({ items: [] }),
    }),
    {
      name: "favorites-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
