import AsyncStorage from "@react-native-async-storage/async-storage";

const CARDS_KEY = "cine_cards_v1";

export type CardInfo = {
  id: string;
  brand: "Visa" | "Mastercard";
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  image?: string;
};

export type PaymentMethod =
  | { type: "card"; cardId: string }
  | { type: "wallet" };

export type CardStorageState = {
  cards: CardInfo[];
  paymentMethod: PaymentMethod;
};

const defaultState: CardStorageState = {
  cards: [],
  paymentMethod: { type: "wallet" },
};

export const cardStorage = {
  async get(): Promise<CardStorageState> {
    const data = await AsyncStorage.getItem(CARDS_KEY);
    if (!data) return defaultState;
    try {
      return JSON.parse(data);
    } catch {
      return defaultState;
    }
  },

  async save(state: CardStorageState) {
    await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(state));
  },

  async clear() {
    await AsyncStorage.removeItem(CARDS_KEY);
  },
};
