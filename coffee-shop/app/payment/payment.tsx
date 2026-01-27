import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>
          <Text style={styles.title}>Payment Method</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
        </View>

        <View style={styles.list}>
          <PaymentCard icon="cc-visa" color="#1A5DAE" />
          <PaymentCard icon="cc-mastercard" color="#EB001B" />
          <PaymentCard icon="apple-pay" color="#000" />
          <PaymentCard icon="google-pay" color="#4285F4" />
        </View>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/payment/card")}
        >
          <Text style={styles.buttonText}>Add your card</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
function PaymentCard({ icon, color }: { icon: any; color: string }) {
  return (
    <Pressable style={styles.card}>
      <FontAwesome5 name={icon} size={48} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { color: "#fff", fontSize: 20 },
  title: { color: "#fff", fontSize: 20 },

  section: {
    marginTop: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.9,
  },
  addCard: {
    color: "#8B572A",
    fontSize: 14,
  },

  list: {
    marginTop: 20,
    paddingHorizontal: 18,
    gap: 14,
  },

  card: {
    height: 90,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    marginHorizontal: 18,
    marginTop: "auto",
    marginBottom: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#8B572A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
