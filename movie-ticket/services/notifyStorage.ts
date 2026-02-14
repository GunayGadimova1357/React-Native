import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFY_KEY = "cine_notify_v1";

export type NotifyStorageState = {
  ids: string[];
};

const defaultState: NotifyStorageState = { ids: [] };

export const notifyStorage = {
  async get(): Promise<NotifyStorageState> {
    const data = await AsyncStorage.getItem(NOTIFY_KEY);
    if (!data) return defaultState;
    try {
      return JSON.parse(data);
    } catch {
      return defaultState;
    }
  },

  async save(state: NotifyStorageState) {
    await AsyncStorage.setItem(NOTIFY_KEY, JSON.stringify(state));
  },

  async clear() {
    await AsyncStorage.removeItem(NOTIFY_KEY);
  },
};
