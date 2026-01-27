import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "../../store/useCartStore";

export default function ConfirmationScreen() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clear);

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <View style={{ width: 40 }} />
          <Text style={styles.headerTitle}>Confirmation</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons name="checkmark" size={90} color="#F3F3F3" />
          </View>

          <Text style={styles.success}>Your order has been accepted</Text>

          <Text style={styles.desc}>Freshly brewed with love{"\n"}</Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => {
            clearCart();
            router.replace("/(tabs)");
          }}
        >
          <Text style={styles.buttonText}>Thank You</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#F3F3F3",
    fontSize: 20,
    fontWeight: "500",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrap: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#8B572A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  success: {
    color: "#F3F3F3",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },

  desc: {
    color: "#EAEAEA",
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 22,
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#8B572A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
