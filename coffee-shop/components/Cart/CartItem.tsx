import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem as Item } from "../../store/useCartStore";

type Props = {
  item: Item;
  onPlus: () => void;
  onMinus: () => void;
};

export default function CartItem({ item, onPlus, onMinus }: Props) {
  const { product, qty } = item;

  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.center}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>
          ${(item.product.prices[item.size] * item.qty).toFixed(2)}
        </Text>
      </View>

      <View style={styles.qty}>
        <Pressable onPress={onMinus}>
          <Ionicons name="remove" size={18} color="#fff" />
        </Pressable>

        <Text style={styles.qtyText}>{qty.toString().padStart(2, "0")}</Text>

        <Pressable onPress={onPlus}>
          <Ionicons name="add" size={18} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  qty: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyText: {
    color: "#fff",
    fontSize: 14,
  },
});
