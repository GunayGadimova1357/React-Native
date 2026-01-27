import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../store/useAuthStore";
import { useProfileStore } from "../../store/useProfileStore";

const MENU = [
  { title: "Card Information", icon: "receipt-outline", route: "/card-info" },
  { title: "Payment Method", icon: "card-outline", route: "/payment/payment" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const signOut = useAuthStore((s) => s.signOut);

  const { name, avatar, hydrate, setName, setAvatar } = useProfileStore();

  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    setTempName(name);
  }, [name]);

  const pickAvatar = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!res.canceled) {
      setAvatar(res.assets[0].uri);
    }
  };

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.profileBlock}>
          <Pressable onPress={pickAvatar}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : require("../../assets/images/avatar.png")
              }
              style={styles.avatar}
            />
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </Pressable>

          {editing ? (
            <TextInput
              value={tempName}
              onChangeText={setTempName}
              autoFocus
              onBlur={() => {
                setName(tempName.trim() || "User");
                setEditing(false);
              }}
              style={styles.nameInput}
            />
          ) : (
            <Pressable onPress={() => setEditing(true)}>
              <Text style={styles.name}>{name}</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.menu}>
          {MENU.map((item) => (
            <Pressable
              key={item.title}
              style={styles.row}
              onPress={() => router.back}
            >
              <View style={styles.left}>
                <Ionicons name={item.icon as any} size={22} color="#8B572A" />
                <Text style={styles.rowText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#F3F3F3" />
            </Pressable>
          ))}

          <Pressable
            onPress={async () => {
              await signOut();
              router.replace("/welcome");
            }}
            style={[styles.row, styles.logoutRow]}
          >
            <View style={styles.left}>
              <Ionicons name="log-out-outline" size={22} color="#8B572A" />
              <Text style={styles.rowText}>Logout</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#F3F3F3",
    fontSize: 20,
    fontWeight: "500",
  },

  profileBlock: {
    marginTop: 24,
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#8B572A",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    color: "#F3F3F3",
    fontSize: 22,
    fontWeight: "400",
  },

  nameInput: {
    color: "#F3F3F3",
    fontSize: 22,
    borderBottomWidth: 1,
    borderColor: "#8B572A",
    paddingHorizontal: 6,
  },

  menu: {
    marginTop: 32,
    paddingHorizontal: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  logoutRow: {
    marginTop: 10,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  rowText: {
    color: "#F3F3F3",
    fontSize: 20,
    fontWeight: "400",
  },
});
