import AsyncStorage from "@react-native-async-storage/async-storage";

const TICKETS_KEY = "cine_tickets_v1";

export type TicketMovie = {
  id: string;
  title: string;
  image: string;
  genre?: string;
};

export type TicketDay = {
  id: string;
  day: string;
  date: string;
  month: string;
};

export type TicketCinema = {
  id: string;
  name: string;
  location: string;
};

export type TicketItem = {
  bookingId: string;
  movie: TicketMovie;
  day: TicketDay;
  time: string;
  cinema: TicketCinema;
  seats: string[];
  createdAt: number;
};

export type TicketsStorageState = {
  tickets: TicketItem[];
};

const defaultState: TicketsStorageState = { tickets: [] };

export const ticketsStorage = {
  async get(): Promise<TicketsStorageState> {
    const data = await AsyncStorage.getItem(TICKETS_KEY);
    if (!data) return defaultState;
    try {
      return JSON.parse(data);
    } catch {
      return defaultState;
    }
  },

  async save(state: TicketsStorageState) {
    await AsyncStorage.setItem(TICKETS_KEY, JSON.stringify(state));
  },

  async clear() {
    await AsyncStorage.removeItem(TICKETS_KEY);
  },
};
