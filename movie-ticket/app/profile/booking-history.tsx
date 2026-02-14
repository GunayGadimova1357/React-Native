import Feather from "@expo/vector-icons/Feather";
import { useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTicketsStore } from "../../store/useTicketsStore";

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

const isPastTicket = (month: string, date: string) => {
  const monthIndex = MONTHS[month] ?? 0;
  const day = Number(date);
  const now = new Date();
  const check = new Date(now.getFullYear(), monthIndex, day, 23, 59, 59);
  return check.getTime() < now.getTime();
};

export default function BookingHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tickets = useTicketsStore((s) => s.tickets);
  const hydrated = useTicketsStore((s) => s.hydrated);
  const hydrate = useTicketsStore((s) => s.hydrate);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  const rows = useMemo(
    () =>
      tickets.map((t) => ({
        id: t.bookingId,
        title: t.movie.title,
        date: `${t.day.month} ${t.day.date}`,
        time: t.time,
        status: isPastTicket(t.day.month, t.day.date)
          ? "Completed"
          : "Upcoming",
      })),
    [tickets],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Booking History</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.section}>
          {rows.map((b) => (
            <View key={b.id} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{b.title}</Text>
                <Text style={styles.sub}>
                  {b.date} · {b.time}
                </Text>
                <Text style={styles.id}>{b.id}</Text>
              </View>
              <Text
                style={[
                  styles.status,
                  b.status === "Upcoming" && styles.statusActive,
                ]}
              >
                {b.status}
              </Text>
            </View>
          ))}
          {!rows.length && (
            <Text style={styles.emptyText}>No bookings yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    margin: 20,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1d0b0b",
    backgroundColor: "#0f0505",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: { color: "#fff", fontWeight: "600" },
  sub: { color: "#777", marginTop: 4, fontSize: 12 },
  id: { color: "#444", marginTop: 6, fontSize: 11 },
  status: {
    color: "#777",
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a1718",
  },
  statusActive: {
    color: "#E50914",
    borderColor: "#E50914",
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    paddingVertical: 14,
  },
});
