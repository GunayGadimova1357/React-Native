import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingScreen() {
  const router = useRouter();

  const [withDriver, setWithDriver] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const onDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (day.dateString < startDate) {
      setStartDate(day.dateString);
    } else {
      setEndDate(day.dateString);
    }
  };

  const markedDates: any = {};

  if (startDate) {
    markedDates[startDate] = {
      startingDay: true,
      color: "#FDBA74",
      textColor: "#fff",
    };
  }

  if (startDate && endDate) {
    let current = new Date(startDate);
    const last = new Date(endDate);

    while (current <= last) {
      const date = current.toISOString().split("T")[0];
      markedDates[date] = {
        color: "#FDBA74",
        textColor: "#fff",
        ...(date === startDate && { startingDay: true }),
        ...(date === endDate && { endingDay: true }),
      };
      current.setDate(current.getDate() + 1);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Date & Time</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.driverCard}>
        <View>
          <Text style={styles.driverTitle}>Booking with driver</Text>
          <Text style={styles.driverDesc}>
            Don’t have a driver? book with the driver.
          </Text>
        </View>
        <Switch
          value={withDriver}
          onValueChange={setWithDriver}
          trackColor={{ true: "#FDBA74" }}
          thumbColor={withDriver ? "#F97316" : "#E5E7EB"}
        />
      </View>

      <View style={styles.calendar}>
        <Calendar
          markingType="period"
          onDayPress={onDayPress}
          markedDates={markedDates}
          style={{ borderRadius: 18 }}
          theme={{
            backgroundColor: "#fff",
            calendarBackground: "#fff",
            textSectionTitleColor: "#9CA3AF",
            todayTextColor: "#F97316",
            dayTextColor: "#111827",
            textDisabledColor: "#D1D5DB",
            arrowColor: "#111827",
            monthTextColor: "#111827",
            textMonthFontWeight: "800",
            textDayFontWeight: "600",
            textDayHeaderFontWeight: "700",
          }}
        />
      </View>
      <View style={styles.timeRow}>
        <TimeBox label="Pick-up time" value="10:00" />
        <TimeBox label="Return time" value="17:00" />
      </View>
      <View style={styles.bottom}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/payment")}
        >
          <Text style={styles.buttonText}>Booking</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.timeWrap}>
      <Text style={styles.timeLabel}>{label}</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{value}</Text>
        <Ionicons name="chevron-down" size={18} color="#111" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 12,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
  },

  driverCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  driverTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  driverDesc: {
    marginTop: 4,
    color: "#6B7280",
  },

  calendar: {
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  timeWrap: {
    width: "48%",
  },
  timeLabel: {
    fontWeight: "700",
    marginBottom: 8,
  },
  timeBox: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  bottom: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },

  button: {
    height: 64,
    borderRadius: 20,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
});
