import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/useAuthStore";
import { useBookingStore } from "../../store/useBookingStore";
import { useTicketsStore } from "../../store/useTicketsStore";
import { useSavedStore } from "../../store/useSavedStore";
import { useCardStore } from "../../store/useCardStore";
import { useNotifyStore } from "../../store/useNotifyStore";
import { useNotificationsStore } from "../../store/useNotificationsStore";

const ITEMS = [
  { id: "1", title: "Change Password", sub: "Update your password" },
  { id: "2", title: "Two-Factor Auth", sub: "Add extra security" },
  { id: "3", title: "Manage Devices", sub: "Signed-in devices" },
];

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const deleteAccount = useAuthStore((s) => s.deleteAccount);
  const clearBooking = useBookingStore((s) => s.clearSelection);
  const clearTickets = useTicketsStore((s) => s.clearTickets);
  const clearSaved = useSavedStore((s) => s.clear);
  const clearCards = useCardStore((s) => s.clear);
  const clearNotify = useNotifyStore((s) => s.clear);
  const clearNotifications = useNotificationsStore((s) => s.clear);

  const handleDelete = () => {
    Alert.alert(
      "Delete account?",
      "This will remove your account data from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteAccount();
            clearBooking();
            clearTickets();
            clearSaved();
            clearCards();
            clearNotify();
            clearNotifications();
            await AsyncStorage.multiRemove([
              "cine_auth_user",
              "cine_booking_v1",
              "cine_tickets_v1",
              "cine_saved_v1",
              "cine_cards_v1",
              "cine_notify_v1",
              "cine_notifications_v1",
            ]);
            router.replace("/auth/signup");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.section}>
        {ITEMS.map((item) => (
          <Pressable key={item.id} style={styles.row}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#555" />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.deleteBtn} onPress={handleDelete}>
        <Feather name="trash-2" size={18} color="#E50914" />
        <Text style={styles.deleteText}>Delete Account</Text>
      </Pressable>
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
  deleteBtn: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2b0b0b",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  deleteText: { color: "#E50914", fontWeight: "600" },
});
