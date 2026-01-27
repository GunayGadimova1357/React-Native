import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import CartItem from "../../components/Cart/CartItem";
import { useCartStore } from "../../store/useCartStore";

export default function CartScreen() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const price = totalPrice();
  const discount = price * 0.05;
  const total = price - discount;

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>

          <Text style={styles.title}>My cart</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {items.length === 0 && (
            <Text style={styles.empty}>Your cart is empty</Text>
          )}

          {items.map((item) => (
            <CartItem
              key={`${item.product.id}-${item.size}`}
              item={item}
              onPlus={() => increase(item.product.id, item.size)}
              onMinus={() => decrease(item.product.id, item.size)}
            />
          ))}

          {items.length > 0 && (
            <View style={styles.summary}>
              <Row label="Price" value={`$${price.toFixed(2)}`} />
              <Row label="Discount" value="5%" />
              <Row label="Total" value={`$${total.toFixed(2)}`} />
            </View>
          )}
        </ScrollView>

        {items.length > 0 && (
          <View style={styles.payContainer}>
            <Pressable
              style={styles.button}
              onPress={() => router.push("/payment/payment")}
            >
              <Text style={styles.buttonText}>Pay now</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{label}</Text>
      <Text style={styles.rowText}>{value}</Text>
    </View>
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
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: { color: "#F3F3F3", fontSize: 20 },
  title: { color: "#F3F3F3", fontSize: 20, fontWeight: "500" },

  content: {
    paddingBottom: 24,
  },

  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#aaa",
    fontSize: 16,
  },

  summary: {
    marginTop: 24,
    paddingHorizontal: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowText: { color: "#F3F3F3", fontSize: 15 },
  payContainer: {
    paddingHorizontal: 18,
    paddingBottom: 60,
    backgroundColor: "transparent",
  },

  button: {
    marginHorizontal: 18,
    marginBottom: 12,
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
