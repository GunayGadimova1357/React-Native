import { create } from "zustand";
import type { StoredUser } from "../services/authStorage";
import {
    getUserFromStorage,
    removeUserFromStorage,
    saveUserToStorage,
} from "../services/authStorage";

type AuthState = {
  user: StoredUser | null;
  isHydrated: boolean;

  hydrate: () => Promise<void>;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,

  hydrate: async () => {
    const user = await getUserFromStorage();
    set({ user, isHydrated: true });
  },

  signIn: async (email: string) => {
    const user = { email };
    await saveUserToStorage(user);
    set({ user });
  },

  signOut: async () => {
    await removeUserFromStorage();
    set({ user: null });
  },
}));
