import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryTabs from "../../components/Home/CategoryTabs";
import HomeHeader from "../../components/Home/HomeHeader";
import ProductGrid from "../../components/Home/ProductGrid";
import SearchInput from "../../components/Home/SearchInput";
import SpecialCard from "../../components/Home/SpecialCard";

import { CATEGORIES, CoffeeCategory, PRODUCTS } from "../../data/coffee";

export default function HomeScreen() {
  const [active, setActive] = useState<CoffeeCategory>("Capuccino");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = p.category === active;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [active, search]);

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeHeader />

          <SearchInput value={search} onChange={setSearch} />

          <CategoryTabs
            categories={CATEGORIES}
            active={active}
            onChange={setActive}
          />

          <ProductGrid products={filteredProducts} />

          <SpecialCard />

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
});
