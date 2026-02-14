import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookingStore } from "../../store/useBookingStore";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = 8;

const OCCUPIED = ["B3", "C4", "D4", "E5", "F4"];

export default function SelectSeats() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const selected = useBookingStore((state) => state.seats);
  const toggleSeat = useBookingStore((state) => state.toggleSeat);
  const pricePerSeat = useBookingStore((state) => state.pricePerSeat);

  const handleToggle = (id: string) => {
    if (OCCUPIED.includes(id)) return;
    toggleSeat(id);
  };

  const total = selected.length * pricePerSeat;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Select Seats</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.screenWrap}>
        <View style={styles.screenLine} />
        <Text style={styles.screenText}>SCREEN</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 220 }}
      >
        <View style={styles.grid}>
          {ROWS.map((row) => (
            <View key={row} style={styles.row}>
              <Text style={styles.rowLabel}>{row}</Text>

              {Array.from({ length: COLS }).map((_, i) => {
                const seatId = `${row}${i + 1}`;
                const isOccupied = OCCUPIED.includes(seatId);
                const isSelected = selected.includes(seatId);

                return (
                  <Pressable
                    key={seatId}
                    style={[
                      styles.seat,
                      isOccupied && styles.seatOccupied,
                      isSelected && styles.seatSelected,
                    ]}
                    onPress={() => handleToggle(seatId)}
                  />
                );
              })}

              <Text style={styles.rowLabel}>{row}</Text>
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <Legend color="#2b2b2b" label="Available" />
          <Legend color="#E50914" label="Selected" />
          <Legend color="#111" label="Occupied" />
        </View>
      </ScrollView>

      <View style={[styles.summary, { paddingBottom: insets.bottom + 90 }]}>
        <View>
          <Text style={styles.summaryLabel}>Selected Seats</Text>
          <Text style={styles.summarySeats}>
            {selected.length ? selected.join(", ") : "-"}
          </Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.total}>${total}</Text>
        </View>
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={[styles.continueBtn, !selected.length && { opacity: 0.4 }]}
          disabled={!selected.length}
          onPress={() => router.push("/movie/checkout")}
        >
          <Text style={styles.continueText}>CONTINUE TO PAYMENT</Text>
        </Pressable>
      </View>
    </View>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
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

  screenWrap: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 40,
  },

  screenLine: {
    width: "70%",
    height: 4,
    borderRadius: 4,
    backgroundColor: "#E50914",
    marginBottom: 12,
  },

  screenText: {
    color: "#666",
    fontSize: 12,
    letterSpacing: 2,
  },

  grid: {
    alignItems: "center",
    gap: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rowLabel: {
    color: "#555",
    width: 14,
    textAlign: "center",
    fontSize: 12,
  },

  seat: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#2b2b2b",
  },

  seatSelected: {
    backgroundColor: "#E50914",
  },

  seatOccupied: {
    backgroundColor: "#111",
  },

  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 30,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },

  legendText: {
    color: "#777",
    fontSize: 12,
  },

  summary: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#111",
    paddingTop: 12,
    backgroundColor: "#000",
  },

  summaryLabel: {
    color: "#777",
    fontSize: 12,
  },

  summarySeats: {
    color: "#fff",
    marginTop: 4,
  },

  total: {
    color: "#E50914",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "right",
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

  continueBtn: {
    backgroundColor: "#E50914",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  continueText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});
