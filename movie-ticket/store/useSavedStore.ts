import { create } from "zustand";
import { savedStorage, type SavedMovie } from "../services/savedStorage";

export type { SavedMovie };

type SavedState = {
  items: SavedMovie[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  add: (movie: Omit<SavedMovie, "addedAt">) => void;
  remove: (id: string) => void;
  toggle: (movie: Omit<SavedMovie, "addedAt">) => void;
  isSaved: (id: string) => boolean;
  clear: () => void;
};

export const useSavedStore = create<SavedState>((set, get) => ({
  items: [],
  hydrated: false,

  hydrate: async () => {
    const state = await savedStorage.get();
    set({ items: state.items, hydrated: true });
  },

  add: (movie) => {
    const exists = get().items.some((m) => m.id === movie.id);
    if (exists) return;
    set((state) => {
      const next = { items: [{ ...movie, addedAt: Date.now() }, ...state.items] };
      savedStorage.save(next);
      return next;
    });
  },

  remove: (id) =>
    set((state) => {
      const next = { items: state.items.filter((m) => m.id !== id) };
      savedStorage.save(next);
      return next;
    }),

  toggle: (movie) => {
    const exists = get().items.some((m) => m.id === movie.id);
    if (exists) {
      set((state) => {
        const next = { items: state.items.filter((m) => m.id !== movie.id) };
        savedStorage.save(next);
        return next;
      });
    } else {
      set((state) => {
        const next = { items: [{ ...movie, addedAt: Date.now() }, ...state.items] };
        savedStorage.save(next);
        return next;
      });
    }
  },

  isSaved: (id) => get().items.some((m) => m.id === id),

  clear: () => {
    const next = { items: [] };
    set(next);
    savedStorage.clear();
  },
}));
