import { create } from "zustand";
import {
  cardStorage,
  type CardInfo,
  type PaymentMethod,
} from "../services/cardStorage";

type CardState = {
  cards: CardInfo[];
  paymentMethod: PaymentMethod;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addCard: (card: Omit<CardInfo, "id">) => void;
  updateCard: (id: string, patch: Omit<CardInfo, "id">) => void;
  removeCard: (id: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  clear: () => void;
};

const createId = () =>
  `card_${Date.now().toString(36)}_${Math.floor(Math.random() * 9999)}`;

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],
  paymentMethod: { type: "wallet" },
  hydrated: false,

  hydrate: async () => {
    const state = await cardStorage.get();
    set({ ...state, hydrated: true });
  },

  addCard: (card) => {
    const id = createId();
    set((state) => {
      const next = {
        cards: [{ id, ...card }, ...state.cards],
        paymentMethod: { type: "card", cardId: id } as PaymentMethod,
      };
      cardStorage.save(next);
      return next;
    });
  },

  updateCard: (id, patch) => {
    set((state) => {
      const next = {
        cards: state.cards.map((c) => (c.id === id ? { id, ...patch } : c)),
        paymentMethod: state.paymentMethod,
      };
      cardStorage.save(next);
      return next;
    });
  },

  removeCard: (id) => {
    const state = get();
    const nextCards = state.cards.filter((c) => c.id !== id);
    const method = state.paymentMethod;
    const nextMethod =
      method.type === "card" && method.cardId === id
        ? nextCards[0]
          ? { type: "card", cardId: nextCards[0].id }
          : { type: "wallet" }
        : method;
    const next = { cards: nextCards, paymentMethod: nextMethod };
    set(next);
    cardStorage.save(next);
  },

  setPaymentMethod: (method) => {
    const state = get();
    const next = { cards: state.cards, paymentMethod: method };
    set({ paymentMethod: method });
    cardStorage.save(next);
  },

  clear: () => {
    const next = { cards: [], paymentMethod: { type: "wallet" } as PaymentMethod };
    set(next);
    cardStorage.clear();
  },
}));
