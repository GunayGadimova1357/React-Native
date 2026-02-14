import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "cine_auth_user";

export type AuthUser = {
  nickname: string;
  email?: string;
  avatarUri?: string;
};

export const authStorage = {
  async save(user: AuthUser) {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },

  async get(): Promise<AuthUser | null> {
    const data = await AsyncStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  async clear() {
    await AsyncStorage.removeItem(AUTH_KEY);
  },
};
