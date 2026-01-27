import { useProfileStore } from "@/store/useProfileStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeHeader() {
  const router = useRouter();
  const avatar = useProfileStore((s) => s.avatar);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable>
          <Ionicons name="menu" size={26} color="#F3F3F3" />
        </Pressable>

        <Text style={styles.title}>
          <Text style={styles.coffee}>Coffee</Text>
          <Text style={styles.shop}>Shop</Text>
        </Text>

        <Pressable onPress={() => router.push("/profile")}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require("../../assets/images/avatar.png")
            }
            style={styles.avatar}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
  },
  coffee: { color: "#8B572A" },
  shop: { color: "#F3F3F3" },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});
