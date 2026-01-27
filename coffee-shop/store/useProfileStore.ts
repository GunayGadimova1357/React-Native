import { create } from "zustand";
import {
    loadProfile,
    ProfileData,
    saveProfile,
} from "../services/profileStorage";

type ProfileState = ProfileData & {
  hydrate: () => Promise<void>;
  setName: (name: string) => void;
  setAvatar: (uri: string) => void;
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  name: "Luna diva",
  avatar: undefined,

  hydrate: async () => {
    const data = await loadProfile();
    if (data) set(data);
  },

  setName: (name) => {
    const next = { ...get(), name };
    set({ name });
    saveProfile(next);
  },

  setAvatar: (uri) => {
    const next = { ...get(), avatar: uri };
    set({ avatar: uri });
    saveProfile(next);
  },
}));
