import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/useAuthStore";
import { useBookingStore } from "../../store/useBookingStore";

const MENU = [
  {
    title: "Payment Methods",
    subtitle: "Manage cards & wallets",
    icon: "credit-card",
    href: "/profile/payment-methods",
  },
  {
    title: "Booking History",
    subtitle: "View all bookings",
    icon: "book-open",
    href: "/profile/booking-history",
  },
  {
    title: "Notifications",
    subtitle: "Alerts & updates",
    icon: "bell",
    href: "/profile/notifications",
  },
  {
    title: "Privacy & Security",
    subtitle: "Account settings",
    icon: "lock",
    href: "/profile/privacy-security",
  },
  {
    title: "Help & Support",
    subtitle: "Get assistance",
    icon: "help-circle",
    href: "/profile/help-support",
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const clearBooking = useBookingStore((s) => s.clearSelection);
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname ?? "JD");
  const initials = (user?.nickname ?? "JD").slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await logout();
    clearBooking();
    router.replace("/auth/signin");
  };

  useEffect(() => {
    if (!editing) {
      setNickname(user?.nickname ?? "JD");
    }
  }, [user?.nickname, editing]);

  const handleSaveNickname = async () => {
    const next = nickname.trim() || "Guest";
    setNickname(next);
    await updateProfile({ nickname: next });
    setEditing(false);
  };

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow photo access to update avatar.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      await updateProfile({ avatarUri: result.assets[0]?.uri });
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow camera access to update avatar.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      await updateProfile({ avatarUri: result.assets[0]?.uri });
    }
  };

  const handleAvatarPress = () => {
    Alert.alert("Update Avatar", "Choose a source", [
      { text: "Camera", onPress: takePhoto },
      { text: "Photo Library", onPress: pickFromLibrary },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.profileCard}>
          <Pressable style={styles.avatar} onPress={handleAvatarPress}>
            {user?.avatarUri ? (
              <Image source={{ uri: user.avatarUri }} style={styles.avatarImg} />
            ) : (
              <LinearGradient
                colors={["#E50914", "#7a0b10"]}
                style={styles.avatarInner}
              >
                <Text style={styles.avatarText}>{initials}</Text>
              </LinearGradient>
            )}
          </Pressable>

          <View style={{ flex: 1 }}>
            {editing ? (
              <View style={styles.editRow}>
                <TextInput
                  value={nickname}
                  onChangeText={setNickname}
                  style={styles.nicknameInput}
                  placeholder="Nickname"
                  placeholderTextColor="#777"
                />
                <Pressable onPress={handleSaveNickname}>
                  <Feather name="check" size={18} color="#E50914" />
                </Pressable>
              </View>
            ) : (
              <View style={styles.nameRow}>
                <Text style={styles.name}>{user?.nickname ?? "John Doe"}</Text>
                <Pressable onPress={() => setEditing(true)}>
                  <Feather name="edit-2" size={16} color="#777" />
                </Pressable>
              </View>
            )}
            <View style={styles.stats}>
              <Stat label="Movies" value="24" />
              <View style={styles.statDivider} />
              <Stat label="Cinemas" value="8" />
              <View style={styles.statDivider} />
              <Stat label="This Month" value="3" />
            </View>
          </View>
        </View>

        <LinearGradient
          colors={["#E50914", "#b20b14", "#7a0b10"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.membership}
        >
          <View>
            <Text style={styles.membershipLabel}>MEMBERSHIP</Text>
            <Text style={styles.membershipTitle}>Premium Gold</Text>
            <Text style={styles.membershipSub}>Points Balance</Text>
            <Text style={styles.membershipPoints}>1,240</Text>
          </View>
          <View style={styles.membershipRight}>
            <Feather name="film" size={28} color="#fff" />
            <Text style={styles.membershipValid}>Valid until Dec 2026</Text>
          </View>
        </LinearGradient>

        <View style={styles.menu}>
          {MENU.map((item) => (
            <Pressable
              key={item.title}
              onPress={() => router.push(item.href as any)}
              style={styles.menuItem}
            >
              <View style={styles.menuIcon}>
                <Feather name={item.icon as any} size={18} color="#E50914" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSub}>{item.subtitle}</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#555" />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logout} onPress={handleLogout}>
          <Feather name="log-out" size={18} color="#E50914" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  profileCard: {
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1d0b0b",
    padding: 16,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    backgroundColor: "#0f0505",
    shadowColor: "#E50914",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nicknameInput: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#1b0b0b",
    paddingHorizontal: 12,
    color: "#fff",
  },

  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#E50914",
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 26,
    backgroundColor: "#1b0b0b",
  },

  membership: {
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membershipLabel: {
    color: "#fff",
    fontSize: 10,
    letterSpacing: 1.2,
  },
  membershipTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },
  membershipSub: {
    color: "#ffe6e6",
    marginTop: 10,
    fontSize: 12,
  },
  membershipPoints: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4,
  },
  membershipRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  membershipValid: {
    color: "#ffe6e6",
    fontSize: 11,
  },

  menu: {
    marginTop: 20,
    gap: 12,
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#0f0505",
    borderWidth: 1,
    borderColor: "#1d0b0b",
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#1b0b0b",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    color: "#fff",
    fontWeight: "600",
  },
  menuSub: {
    color: "#777",
    marginTop: 4,
    fontSize: 12,
  },

  logout: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2b0b0b",
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    color: "#E50914",
    fontWeight: "600",
  },
});
