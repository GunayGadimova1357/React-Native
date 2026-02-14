import { create } from "zustand";
import { ticketsStorage, type TicketItem } from "../services/ticketsStorage";

export type { TicketItem };

type TicketsState = {
  tickets: TicketItem[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addTicket: (ticket: TicketItem) => void;
  clearTickets: () => void;
};

export const useTicketsStore = create<TicketsState>((set, get) => ({
  tickets: [],
  hydrated: false,

  hydrate: async () => {
    const state = await ticketsStorage.get();
    set({ tickets: state.tickets, hydrated: true });
  },

  addTicket: (ticket) => {
    const exists = get().tickets.some((t) => t.bookingId === ticket.bookingId);
    if (exists) return;
    set((state) => {
      const next = { tickets: [ticket, ...state.tickets] };
      ticketsStorage.save(next);
      return next;
    });
  },

  clearTickets: () => {
    const next = { tickets: [] };
    set(next);
    ticketsStorage.clear();
  },
}));
