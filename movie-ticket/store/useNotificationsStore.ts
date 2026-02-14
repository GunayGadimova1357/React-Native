import { create } from "zustand";
import {
  notificationsStorage,
  type NotificationPrefs,
} from "../services/notificationsStorage";

export type { NotificationPrefs };

type NotificationsState = {
  prefs: NotificationPrefs;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  toggle: (key: keyof NotificationPrefs) => void;
  set: (key: keyof NotificationPrefs, value: boolean) => void;
  clear: () => void;
};
 
export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  prefs: { ticketUpdates: true, promotions: false, reminders: true },
  hydrated: false,

  hydrate: async () => {
    const state = await notificationsStorage.get();
    set({ prefs: state.prefs, hydrated: true });
  },

  toggle: (key) => {
    const prefs = { ...get().prefs, [key]: !get().prefs[key] };
    set({ prefs });
    notificationsStorage.save({ prefs });
  },

  set: (key, value) => {
    const prefs = { ...get().prefs, [key]: value };
    set({ prefs });
    notificationsStorage.save({ prefs });
  },

  clear: () => {
    const prefs = { ticketUpdates: true, promotions: false, reminders: true };
    set({ prefs });
    notificationsStorage.clear();
  },
}));
