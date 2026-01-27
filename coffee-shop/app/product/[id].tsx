import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CoffeeSize, PRODUCTS } from "../../data/coffee";
import { useCartStore } from "../../store/useCartStore";
import { useFavoritesStore } from "../../store/useFavorites";

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);

  const [size, setSize] = useState<CoffeeSize>("M");
  const [qty, setQty] = useState(1);

  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  const add = useCartStore((s) => s.add);

  if (!product) {
    return null;
  }

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>

          <Text style={styles.title}>{product.title}</Text>

          <Pressable onPress={() => toggle(product)}>
            <Ionicons
              name={isFavorite(product.id) ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite(product.id) ? "#8B572A" : "#fff"}
            />
          </Pressable>
        </View>

        <Image source={product.image} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.section}>Descriptions</Text>

          <Text style={styles.desc}>{product.description}</Text>

          <View style={styles.sizes}>
            {(["S", "M", "L"] as const).map((s) => (
              <Pressable
                key={s}
                onPress={() => setSize(s)}
                style={[styles.sizeBtn, size === s && styles.sizeActive]}
              >
                <Text style={styles.sizeText}>{s}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.qty}>
            <Pressable onPress={() => setQty(Math.max(1, qty - 1))}>
              <Ionicons name="remove" size={18} color="#fff" />
            </Pressable>

            <Text style={styles.qtyText}>
              {qty.toString().padStart(2, "0")}
            </Text>

            <Pressable onPress={() => setQty(qty + 1)}>
              <Ionicons name="add" size={18} color="#fff" />
            </Pressable>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => add(product, size, qty)}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },

  image: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
    marginTop: 12,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  section: {
    marginTop: 16,
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
  },

  desc: {
    color: "#E5E7EB",
    fontSize: 14,
    lineHeight: 20,
  },

  sizes: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
  },
  sizeBtn: {
    width: 44,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  sizeActive: {
    backgroundColor: "#8B572A",
  },
  sizeText: {
    color: "#fff",
    fontSize: 14,
  },

  qty: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  qtyText: {
    color: "#fff",
    fontSize: 16,
  },

  button: {
    marginTop: 26,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#8B572A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
