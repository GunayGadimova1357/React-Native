import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATIONS_KEY = "cine_notifications_v1";

export type NotificationPrefs = {
  ticketUpdates: boolean;
  promotions: boolean;
  reminders: boolean;
};

export type NotificationsStorageState = {
  prefs: NotificationPrefs;
};

const defaults: NotificationPrefs = {
  ticketUpdates: true,
  promotions: false,
  reminders: true,
};

const defaultState: NotificationsStorageState = { prefs: defaults };

export const notificationsStorage = {
  async get(): Promise<NotificationsStorageState> {
    const data = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    if (!data) return defaultState;
    try {
      return JSON.parse(data);
    } catch {
      return defaultState;
    }
  },

  async save(state: NotificationsStorageState) {
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(state));
  },

  async clear() {
    await AsyncStorage.removeItem(NOTIFICATIONS_KEY);
  },
};
