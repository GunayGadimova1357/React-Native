import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type User = {
  username: string;
  email: string;
  company?: string;
  password: string;
};

type AuthState = {
  user: User | null;
  users: User[];

  register: (data: User) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  loadUsers: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: [],

  register: async (data) => {
    const { users } = get();

    const exists = users.find((u) => u.email === data.email);
    if (exists) return "User already exists";

    const updated = [...users, data];

    await AsyncStorage.setItem("users", JSON.stringify(updated));

    set({ users: updated, user: data });

    return null;
  },

  login: async (email, password) => {
    const { users } = get();

    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) return "Invalid credentials";

    set({ user: found });

    return null;
  },

  logout: async () => {
    set({ user: null });
  },

  loadUsers: async () => {
    const data = await AsyncStorage.getItem("users");
    if (data) {
      set({ users: JSON.parse(data) });
    }
  },
}));
