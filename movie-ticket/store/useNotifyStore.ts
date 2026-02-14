import { create } from "zustand";
import { notifyStorage } from "../services/notifyStorage";

type NotifyState = {
  ids: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  toggle: (id: string) => void;
  isNotified: (id: string) => boolean;
  clear: () => void;
};

export const useNotifyStore = create<NotifyState>((set, get) => ({
  ids: [],
  hydrated: false,

  hydrate: async () => {
    const state = await notifyStorage.get();
    set({ ids: state.ids, hydrated: true });
  },

  toggle: (id) => {
    const ids = get().ids;
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    set({ ids: next });
    notifyStorage.save({ ids: next });
  },

  isNotified: (id) => get().ids.includes(id),

  clear: () => {
    set({ ids: [] });
    notifyStorage.clear();
  },
}));
