import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cinemas, showDays } from "../../data/showtimes";
import { useBookingStore } from "../../store/useBookingStore";

export default function SelectCinemaTime() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const selectedDay = useBookingStore((state) => state.day);
  const selectedTime = useBookingStore((state) => state.time);
  const selectedCinema = useBookingStore((state) => state.cinema);
  const selectDay = useBookingStore((state) => state.selectDay);
  const selectTime = useBookingStore((state) => state.selectTime);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>Select Cinema & Time</Text>

        <View style={{ width: 22 }} />
      </View>

      <View style={styles.daysWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        >
          {showDays.map((d) => {
            const active = selectedDay?.id === d.id;

            return (
              <Pressable
                key={d.id}
                style={[styles.dayCard, active && styles.dayCardActive]}
                onPress={() => selectDay(d)}
              >
                <Text style={styles.dayText}>{d.day}</Text>
                <Text style={styles.dayDate}>{d.date}</Text>
                <Text style={styles.dayMonth}>{d.month}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 160,
        }}
      >
        {cinemas.map((cinema) => (
          <View key={cinema.id} style={styles.cinemaCard}>
            <View style={styles.cinemaHeader}>
              <View>
                <Text style={styles.cinemaName}>{cinema.name}</Text>

                <View style={styles.cinemaLocation}>
                  <Feather name="map-pin" size={12} color="#E50914" />
                  <Text style={styles.locationText}>{cinema.location}</Text>
                </View>
              </View>

            <Pressable
              style={styles.distance}
              onPress={() =>
                router.push(
                  `/movie/cinema-map?id=${cinema.id}`,
                )
              }
            >
              <Feather name="navigation" size={12} color="#E50914" />
              <Text style={styles.distanceText}>{cinema.distance}</Text>
            </Pressable>
            </View>

            <View style={styles.timesWrap}>
              {cinema.times.map((time) => {
                const active =
                  selectedTime === time && selectedCinema?.id === cinema.id;

                return (
                  <Pressable
                    key={time}
                    style={[styles.timeChip, active && styles.timeChipActive]}
                    onPress={() =>
                      selectTime(time, {
                        id: cinema.id,
                        name: cinema.name,
                        location: cinema.location,
                        distance: cinema.distance,
                      })
                    }
                  >
                    <Text
                      style={[styles.timeText, active && styles.timeTextActive]}
                    >
                      {time}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={[
            styles.selectBtn,
            (!selectedTime || !selectedCinema) && { opacity: 0.5 },
          ]}
          disabled={!selectedTime || !selectedCinema}
          onPress={() => router.push("/movie/seats")}
        >
          <Text style={styles.selectText}>SELECT SEATS</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    backgroundColor: "#000",
    zIndex: 10,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  daysWrapper: {
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },

  daysRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },

  dayCard: {
    width: 70,
    height: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#5a0307",
    justifyContent: "center",
    alignItems: "center",
  },

  dayCardActive: {
    backgroundColor: "#E50914",
    borderColor: "#E50914",
  },

  dayText: { color: "#aaa", fontSize: 12 },
  dayDate: { color: "#fff", fontSize: 22, fontWeight: "700" },
  dayMonth: { color: "#aaa", fontSize: 12 },

  cinemaCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2b0204",
    padding: 16,
  },

  cinemaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  cinemaName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  cinemaLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  locationText: {
    color: "#aaa",
    fontSize: 12,
  },

  distance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  distanceText: {
    color: "#E50914",
    fontSize: 12,
  },

  timesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  timeChip: {
    borderWidth: 1,
    borderColor: "#2b0204",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  timeChipActive: {
    backgroundColor: "#E50914",
    borderColor: "#E50914",
  },

  timeText: {
    color: "#aaa",
    fontSize: 12,
  },

  timeTextActive: {
    color: "#fff",
    fontWeight: "600",
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

  selectBtn: {
    backgroundColor: "#E50914",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  selectText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 2,
  },
});
