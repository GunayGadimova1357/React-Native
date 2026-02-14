import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
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

export default function TicketScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const movie = useBookingStore((state) => state.movie);
  const day = useBookingStore((state) => state.day);
  const time = useBookingStore((state) => state.time);
  const cinema = useBookingStore((state) => state.cinema);
  const seats = useBookingStore((state) => state.seats);
  const bookingId = useBookingStore((state) => state.bookingId);

  const firstSeat = seats[0] ?? "";
  const rowLabel = firstSeat ? firstSeat[0] : "-";
  const seatLabel = firstSeat ? firstSeat.slice(1) : "-";
  const seatCount = seats.length;
  const seatList = seats.join(", ");
  const dateLabel = day ? `${day.month} ${day.date}, ${day.day}` : "-";

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.push("/home")}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Digital Ticket</Text>
        <Pressable>
          <Feather name="share-2" size={20} color="#fff" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.ticket}>
          <View style={styles.ticketTop}>
            {movie?.image ? (
              <Image source={{ uri: movie.image }} style={styles.poster} />
            ) : (
              <View style={styles.posterPlaceholder} />
            )}

            <View style={{ flex: 1 }}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>NOW SHOWING</Text>
              </View>
              <Text style={styles.title}>{movie?.title ?? "-"}</Text>
              <Text style={styles.subTitle}>{movie?.genre ?? "-"}</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <InfoBlock label="DATE" value={dateLabel} />
            <InfoBlock label="TIME" value={time ?? "-"} />
            <InfoBlock label="CINEMA" value={cinema?.name ?? "-"} />
            <InfoBlock label="HALL" value="Hall 04 · IMAX" />
          </View>

          <View style={styles.cutLine} />

          {seatCount <= 1 ? (
            <View style={styles.seatRow}>
              <SeatBox label="ROW" value={rowLabel} />
              <SeatBox label="SEAT" value={seatLabel} />
            </View>
          ) : (
            <View style={styles.seatSummary}>
              <View style={styles.seatCountBox}>
                <Text style={styles.seatLabel}>SEATS</Text>
                <Text style={styles.seatValue}>{seatCount}</Text>
              </View>
              <View style={styles.seatListBox}>
                <Text style={styles.seatLabel}>YOUR SEATS</Text>
                <Text style={styles.seatList}>{seatList}</Text>
              </View>
            </View>
          )}

          <View style={styles.qrWrap}>
            <View style={styles.qrBox}>
              <View style={styles.qrInner}>
                <View style={styles.qrDot} />
              </View>
            </View>
            <Text style={styles.bookingLabel}>BOOKING ID</Text>
            <Text style={styles.bookingId}>{bookingId ?? "-"}</Text>
          </View>
        </View>

        <Text style={styles.hint}>
          Scan this code at the theater entrance. High screen brightness is
          recommended for faster entry.
        </Text>
      </ScrollView>
    </View>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function SeatBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.seatBox}>
      <Text style={styles.seatLabel}>{label}</Text>
      <Text style={styles.seatValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1111",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  ticket: {
    margin: 20,
    borderRadius: 24,
    backgroundColor: "#1b0f10",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },

  ticketTop: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },

  poster: {
    width: 70,
    height: 90,
    borderRadius: 12,
  },
  posterPlaceholder: {
    width: 70,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#2a1718",
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#2b0b0c",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 8,
  },

  badgeText: {
    color: "#E50914",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  subTitle: {
    color: "#b7a3a3",
    marginTop: 4,
  },

  infoGrid: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },

  infoBlock: {
    width: "47%",
  },

  infoLabel: {
    color: "#9b8585",
    fontSize: 11,
    letterSpacing: 1,
  },

  infoValue: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "600",
  },

  cutLine: {
    height: 1,
    backgroundColor: "#2a1718",
    marginVertical: 18,
  },

  seatRow: {
    flexDirection: "row",
    gap: 14,
  },

  seatBox: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#241314",
    padding: 16,
  },
  seatSummary: {
    flexDirection: "row",
    gap: 12,
  },
  seatCountBox: {
    width: 92,
    borderRadius: 14,
    backgroundColor: "#241314",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  seatListBox: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#241314",
    padding: 16,
    justifyContent: "center",
  },

  seatLabel: {
    color: "#b7a3a3",
    fontSize: 11,
    letterSpacing: 2,
  },

  seatValue: {
    color: "#E50914",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 6,
  },
  seatList: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "600",
  },

  qrWrap: {
    alignItems: "center",
    marginTop: 18,
  },

  qrBox: {
    width: 190,
    height: 190,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  qrInner: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: "#0b0707",
    alignItems: "center",
    justifyContent: "center",
  },

  qrDot: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#1c1c1c",
  },

  bookingLabel: {
    color: "#9b8585",
    letterSpacing: 2,
    fontSize: 10,
    marginTop: 12,
  },

  bookingId: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginTop: 6,
  },

  hint: {
    color: "#9b8585",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});
