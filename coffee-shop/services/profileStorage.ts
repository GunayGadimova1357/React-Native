import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProfileData = {
  name: string;
  avatar?: string;
};

const KEY = "profile-data";

export async function loadProfile(): Promise<ProfileData | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveProfile(data: ProfileData) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}
