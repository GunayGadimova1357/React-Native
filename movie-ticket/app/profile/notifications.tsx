import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotificationsStore } from "../../store/useNotificationsStore";

const SETTINGS = [
  {
    id: "ticketUpdates",
    title: "Ticket Updates",
    sub: "Booking confirmations",
  },
  {
    id: "promotions",
    title: "Promotions",
    sub: "New offers & rewards",
  },
  {
    id: "reminders",
    title: "Reminders",
    sub: "Showtime reminders",
  },
] as const;

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const prefs = useNotificationsStore((s) => s.prefs);
  const toggle = useNotificationsStore((s) => s.toggle);
  const hydrated = useNotificationsStore((s) => s.hydrated);
  const hydrate = useNotificationsStore((s) => s.hydrate);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.section}>
        {SETTINGS.map((s) => {
          const on = prefs[s.id];
          return (
            <Pressable
              key={s.id}
              style={styles.row}
              onPress={() => toggle(s.id)}
            >
              <View>
                <Text style={styles.title}>{s.title}</Text>
                <Text style={styles.sub}>{s.sub}</Text>
              </View>
              <AnimatedSwitch value={on} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function AnimatedSwitch({ value }: { value: boolean }) {
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, progress]);

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#2c2c2e", "#910000"],
  });

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <Animated.View style={[styles.toggle, { backgroundColor }]}>
      <Animated.View
        style={[
          styles.toggleDot,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </Animated.View>
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
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  section: { margin: 20, gap: 12 },
  row: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1d0b0b",
    backgroundColor: "#0f0505",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { color: "#fff", fontWeight: "600" },
  sub: { color: "#777", marginTop: 4, fontSize: 12 },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2c2c2e",
    padding: 2,
    justifyContent: "center",
  },
  toggleDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
