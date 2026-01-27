import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryTabs from "../components/Home/CategoryTabs";
import ProductGrid from "../components/Home/ProductGrid";
import { CATEGORIES, CoffeeCategory, PRODUCTS } from "../data/coffee";

export default function CategoriesScreen() {
  const router = useRouter();
  const [active, setActive] = useState<CoffeeCategory>("Capuccino");

  const filtered = PRODUCTS.filter((p) => p.category === active);

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </Pressable>
          <Text style={styles.title}>Categories</Text>
          <View style={{ width: 40 }} />
        </View>

        <Text style={styles.section}>Cold Coffee</Text>

        <CategoryTabs
          categories={CATEGORIES}
          active={active}
          onChange={setActive}
        />

        <ProductGrid products={filtered} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

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
  section: {
    marginTop: 8,
    marginLeft: 18,
    color: "#F3F3F3",
    fontSize: 18,
  },
});
