import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookingStore } from "../../store/useBookingStore";
import { useTicketsStore } from "../../store/useTicketsStore";
import { useCardStore } from "../../store/useCardStore";
import { maskCardNumber } from "../../utils/cardFormat";

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const cards = useCardStore((s) => s.cards);
  const paymentMethod = useCardStore((s) => s.paymentMethod);
  const setPaymentMethod = useCardStore((s) => s.setPaymentMethod);
  const hydrated = useCardStore((s) => s.hydrated);
  const hydrate = useCardStore((s) => s.hydrate);
  const movie = useBookingStore((state) => state.movie);
  const day = useBookingStore((state) => state.day);
  const time = useBookingStore((state) => state.time);
  const cinema = useBookingStore((state) => state.cinema);
  const seats = useBookingStore((state) => state.seats);
  const pricePerSeat = useBookingStore((state) => state.pricePerSeat);
  const bookingId = useBookingStore((state) => state.bookingId);
  const setBookingId = useBookingStore((state) => state.setBookingId);
  const addTicket = useTicketsStore((state) => state.addTicket);
  const ticketsHydrated = useTicketsStore((state) => state.hydrated);
  const hydrateTickets = useTicketsStore((state) => state.hydrate);

  const total = seats.length * pricePerSeat;
  const dateLabel = day ? `${day.day}, ${day.month} ${day.date}` : "-";
  const seatLabel = seats.length ? seats.join(", ") : "-";
  const selectedCard = useMemo(() => {
    if (paymentMethod.type !== "card") return null;
    return cards.find((c) => c.id === paymentMethod.cardId) ?? null;
  }, [paymentMethod, cards]);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  useEffect(() => {
    if (!ticketsHydrated) hydrateTickets();
  }, [ticketsHydrated, hydrateTickets]);

  const handleConfirm = () => {
    let nextBookingId = bookingId;
    if (!nextBookingId) {
      const stamp = Date.now().toString().slice(-6);
      const rand = Math.floor(1000 + Math.random() * 9000);
      nextBookingId = `BTMN-${stamp}-${rand}`;
      setBookingId(nextBookingId);
    }
    if (movie && day && time && cinema && seats.length) {
      addTicket({
        bookingId: nextBookingId,
        movie: {
          id: movie.id,
          title: movie.title,
          image: movie.image,
          genre: movie.genre,
        },
        day,
        time,
        cinema: {
          id: cinema.id,
          name: cinema.name,
          location: cinema.location,
        },
        seats,
        createdAt: Date.now(),
      });
    }
    router.push("/movie/ticket");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.card}>
          <View style={styles.movieRow}>
            {movie?.image ? (
              <Image source={{ uri: movie.image }} style={styles.poster} />
            ) : (
              <View style={styles.posterPlaceholder} />
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{movie?.title ?? "-"}</Text>
              <Text style={styles.genre}>{movie?.genre ?? "-"}</Text>
              <Text style={styles.duration}>{movie?.duration ?? "-"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Info label="Cinema" value={cinema?.name ?? "-"} />
            <Info label="Date" value={dateLabel} />
            <Info label="Time" value={time ?? "-"} />
            <Info label="Seats" value={seatLabel} />
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>${total}</Text>
          </View>
        </View>

        <Text style={styles.section}>Payment Method</Text>

        {cards.map((card) => {
          const isActive =
            paymentMethod.type === "card" && paymentMethod.cardId === card.id;
          return (
            <PaymentOption
              key={card.id}
              active={isActive}
              title={`${card.brand} Card`}
              subtitle={maskCardNumber(card.number)}
              onPress={() =>
                setPaymentMethod({ type: "card", cardId: card.id })
              }
            />
          );
        })}

        <PaymentOption
          active={paymentMethod.type === "wallet" || !selectedCard}
          title="Digital Wallet"
          subtitle="Apple Pay / Google Pay"
          onPress={() => setPaymentMethod({ type: "wallet" })}
        />
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>
            CONFIRM PAYMENT · ${total}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function PaymentOption({
  title,
  subtitle,
  active,
  onPress,
}: {
  title: string;
  subtitle: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.payment, active && styles.paymentActive]}
    >
      <View style={styles.paymentLeft}>
        <View style={styles.cardIcon} />
        <View>
          <Text style={styles.paymentTitle}>{title}</Text>
          <Text style={styles.paymentSub}>{subtitle}</Text>
        </View>
      </View>

      {active && (
        <View style={styles.check}>
          <Feather name="check" size={14} color="#fff" />
        </View>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1a1a1a",
    padding: 16,
  },

  movieRow: {
    flexDirection: "row",
    gap: 12,
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 10,
  },
  posterPlaceholder: {
    width: 70,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  genre: {
    color: "#E50914",
    marginTop: 4,
  },

  duration: {
    color: "#777",
    marginTop: 4,
  },

  infoRow: {
    marginTop: 16,
    gap: 10,
  },

  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoLabel: {
    color: "#777",
  },

  infoValue: {
    color: "#fff",
  },

  totalRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#111",
    paddingTop: 12,
  },

  totalLabel: {
    color: "#fff",
    fontWeight: "600",
  },

  total: {
    color: "#E50914",
    fontSize: 18,
    fontWeight: "700",
  },

  section: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },

  payment: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#111",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentActive: {
    borderColor: "#E50914",
    backgroundColor: "#0f0505",
  },

  paymentLeft: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  cardIcon: {
    width: 34,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#E50914",
  },

  paymentTitle: {
    color: "#fff",
    fontWeight: "600",
  },

  paymentSub: {
    color: "#777",
    marginTop: 2,
  },

  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E50914",
    alignItems: "center",
    justifyContent: "center",
  },

  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#111",
  },

  confirmBtn: {
    backgroundColor: "#E50914",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },

  confirmText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
