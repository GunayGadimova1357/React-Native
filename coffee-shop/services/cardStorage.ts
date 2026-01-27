// services/cardStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "card-info";

export type CardInfo = {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  image?: string;
};

export async function saveCard(data: CardInfo) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function loadCard(): Promise<CardInfo | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearCard() {
  await AsyncStorage.removeItem(KEY);
}
