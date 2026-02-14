import Feather from "@expo/vector-icons/Feather";
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
import { TicketItem, useTicketsStore } from "../../store/useTicketsStore";

const MONTHS: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

const formatDate = (ticket: TicketItem) =>
  `${ticket.day.month} ${ticket.day.date}`;

const isPastTicket = (ticket: TicketItem) => {
  const monthIndex = MONTHS[ticket.day.month] ?? 0;
  const day = Number(ticket.day.date);
  const now = new Date();
  const date = new Date(now.getFullYear(), monthIndex, day, 23, 59, 59);
  return date.getTime() < now.getTime();
};

export default function TicketsScreen() {
  const insets = useSafeAreaInsets();
  const tickets = useTicketsStore((s) => s.tickets);
  const hydrated = useTicketsStore((s) => s.hydrated);
  const hydrate = useTicketsStore((s) => s.hydrate);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  const { upcoming, past } = useMemo(() => {
    const upcomingList: TicketItem[] = [];
    const pastList: TicketItem[] = [];
    tickets.forEach((t) => {
      if (isPastTicket(t)) pastList.push(t);
      else upcomingList.push(t);
    });
    return { upcoming: upcomingList, past: pastList };
  }, [tickets]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <Text style={styles.sectionCount}>{upcoming.length} tickets</Text>
        </View>

        <View style={styles.list}>
          {upcoming.map((ticket) => (
            <TicketCard key={ticket.bookingId} ticket={ticket} active />
          ))}
          {!upcoming.length && (
            <Text style={styles.emptyText}>No upcoming tickets yet.</Text>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Past</Text>
          <Text style={styles.sectionCount}>{past.length} ticket</Text>
        </View>

        <View style={styles.list}>
          {past.map((ticket) => (
            <TicketCard key={ticket.bookingId} ticket={ticket} active={false} />
          ))}
          {!past.length && (
            <Text style={styles.emptyText}>No past tickets yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function TicketCard({
  ticket,
  active,
}: {
  ticket: TicketItem;
  active: boolean;
}) {
  const dateLabel = `${formatDate(ticket)} • ${ticket.time}`;
  const seats = ticket.seats.join(", ");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        !active && styles.cardPast,
        pressed && styles.cardPressed,
      ]}
    >
      <Image source={{ uri: ticket.movie.image }} style={styles.poster} />
      <View style={{ flex: 1 }}>
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle}>{ticket.movie.title}</Text>
          <View style={[styles.status, !active && styles.statusPast]}>
            <Text style={[styles.statusText, !active && styles.statusTextPast]}>
              {active ? "ACTIVE" : "EXPIRED"}
            </Text>
          </View>
        </View>
        <Text style={styles.cinema}>{ticket.cinema.name}</Text>
        <Text style={styles.date}>{dateLabel}</Text>
        <Text style={styles.seats}>Seats: {seats}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#5c1a1a" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
    marginTop: 6,
  },
  sectionHeader: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  sectionCount: {
    color: "#E50914",
    fontSize: 14,
  },
  list: {
    marginTop: 14,
    gap: 16,
    marginHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2a0c0c",
    backgroundColor: "#0f0505",
  },
  cardPressed: {
    borderColor: "#E50914",
    shadowColor: "#E50914",
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    transform: [{ scale: 0.99 }],
  },
  cardPast: {
    opacity: 0.7,
  },
  poster: {
    width: 70,
    height: 90,
    borderRadius: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  status: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#5c1a1a",
    backgroundColor: "#1a0a0a",
  },
  statusPast: {
    borderColor: "#2a2a2a",
    backgroundColor: "#0b0b0b",
  },
  statusText: {
    color: "#E50914",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  statusTextPast: {
    color: "#777",
  },
  cinema: {
    color: "#7b6f6f",
    marginTop: 4,
  },
  date: {
    color: "#E50914",
    marginTop: 6,
    fontWeight: "600",
  },
  seats: {
    color: "#7b6f6f",
    marginTop: 6,
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    paddingVertical: 14,
  },
});
