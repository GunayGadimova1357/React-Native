import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProductGrid from "../../components/Home/ProductGrid";
import { useFavoritesStore } from "../../store/useFavorites";

export default function FavoritesScreen() {
  const router = useRouter();
  const items = useFavoritesStore((s) => s.items);

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>
          <Text style={styles.title}>Favorite</Text>
          <View style={{ width: 40 }} />
        </View>

        {items.length === 0 ? (
          <Text style={styles.empty}>No favorites yet</Text>
        ) : (
          <ProductGrid products={items} />
        )}
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
  back: {
    color: "#F3F3F3",
    fontSize: 20,
  },
  title: {
    color: "#F3F3F3",
    fontSize: 20,
    fontWeight: "500",
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#F3F3F3",
    opacity: 0.7,
  },
});
