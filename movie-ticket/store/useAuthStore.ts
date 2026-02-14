import { create } from "zustand";
import { authStorage, AuthUser } from "../services/authStorage";

type AuthState = {
  user: AuthUser | null;
  hydrated: boolean;

  signUp: (user: AuthUser) => Promise<void>;
  updateProfile: (patch: Partial<AuthUser>) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,

  signUp: async (user) => {
    await authStorage.save(user);
    set({ user });
  },

  updateProfile: async (patch) => {
    const current = await authStorage.get();
    if (!current) return;
    const next = { ...current, ...patch };
    await authStorage.save(next);
    set({ user: next });
  },

  hydrate: async () => {
    const user = await authStorage.get();
    set({ user, hydrated: true });
  },

  logout: async () => {
    await authStorage.clear();
    set({ user: null });
  },

  deleteAccount: async () => {
    await authStorage.clear();
    set({ user: null });
  },
}));
