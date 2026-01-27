import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "auth:user";

export type StoredUser = {
  email: string;
};

export async function saveUserToStorage(user: StoredUser) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUserFromStorage(): Promise<StoredUser | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as StoredUser) : null;
}

export async function removeUserFromStorage() {
  await AsyncStorage.removeItem(USER_KEY);
}
