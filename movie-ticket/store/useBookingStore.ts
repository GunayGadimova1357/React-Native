import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type BookingMovie = {
  id: string;
  title: string;
  image: string;
  genre?: string;
  duration?: string;
  rating?: number;
  year?: number;
  age?: string;
};

type BookingDay = {
  id: string;
  day: string;
  date: string;
  month: string;
};

type BookingCinema = {
  id: string;
  name: string;
  location: string;
  distance: string;
};

type BookingState = {
  movie: BookingMovie | null;
  day: BookingDay | null;
  time: string | null;
  cinema: BookingCinema | null;
  seats: string[];
  pricePerSeat: number;
  bookingId: string | null;
  hydrated: boolean;

  startBooking: (movie: BookingMovie) => void;
  selectDay: (day: BookingDay) => void;
  selectTime: (time: string, cinema: BookingCinema) => void;
  setSeats: (seats: string[]) => void;
  toggleSeat: (seatId: string) => void;
  setBookingId: (id: string) => void;
  clearSelection: () => void;
  setHydrated: (value: boolean) => void;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      movie: null,
      day: null,
      time: null,
      cinema: null,
      seats: [],
      pricePerSeat: 15,
      bookingId: null,
      hydrated: false,

      startBooking: (movie) =>
        set({
          movie,
          day: null,
          time: null,
          cinema: null,
          seats: [],
          bookingId: null,
        }),

      selectDay: (day) => set({ day, time: null, cinema: null, seats: [] }),

      selectTime: (time, cinema) => set({ time, cinema }),

      setSeats: (seats) => set({ seats }),

      toggleSeat: (seatId) => {
        const { seats } = get();
        set({
          seats: seats.includes(seatId)
            ? seats.filter((s) => s !== seatId)
            : [...seats, seatId],
        });
      },

      setBookingId: (id) => set({ bookingId: id }),

      clearSelection: () =>
        set({
          movie: null,
          day: null,
          time: null,
          cinema: null,
          seats: [],
          bookingId: null,
        }),

      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "cine_booking_v1",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
      partialize: ({ hydrated, ...state }) => state,
    },
  ),
);
