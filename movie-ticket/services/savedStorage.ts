import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_KEY = "cine_saved_v1";

export type SavedMovie = {
  id: string;
  title: string;
  image: string;
  rating?: number;
  genre?: string;
  duration?: string;
  year?: number;
  age?: string;
  synopsis?: string;
  addedAt: number;
};

export type SavedStorageState = {
  items: SavedMovie[];
};

const defaultState: SavedStorageState = { items: [] };

export const savedStorage = {
  async get(): Promise<SavedStorageState> {
    const data = await AsyncStorage.getItem(SAVED_KEY);
    if (!data) return defaultState;
    try {
      return JSON.parse(data);
    } catch {
      return defaultState;
    }
  },

  async save(state: SavedStorageState) {
    await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(state));
  },

  async clear() {
    await AsyncStorage.removeItem(SAVED_KEY);
  },
};
