import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CoffeeProduct } from "../../data/coffee";
import { useCartStore } from "../../store/useCartStore";
import { useFavoritesStore } from "../../store/useFavorites";

type Props = {
  products: CoffeeProduct[];
};

export default function ProductGrid({ products }: Props) {
  const router = useRouter();
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const add = useCartStore((s) => s.add);

  return (
    <View style={styles.grid}>
      {products.map((item) => (
        <Pressable
          key={item.id}
          style={styles.card}
          onPress={() => router.push(`/product/${item.id}`)}
        >
          <Image source={item.image} style={styles.image} />
          <Text style={styles.price}>${item.prices.M.toFixed(2)}</Text>

          <Pressable onPress={() => toggle(item)} style={styles.favorite}>
            <Ionicons
              name={isFavorite(item.id) ? "heart" : "heart-outline"}
              size={18}
              color={isFavorite(item.id) ? "#8B572A" : "#fff"}
            />
          </Pressable>
          <Pressable onPress={() => add(item, "M", 1)} style={styles.addBtn}>
            <Ionicons name="add" size={18} color="#8B572A" />
          </Pressable>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 18,
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 190,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 14,
    padding: 12,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 110,
    resizeMode: "contain",
  },
  price: {
    color: "#F3F3F3",
    fontSize: 16,
  },
  add: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  addBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(139,87,42,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
});
