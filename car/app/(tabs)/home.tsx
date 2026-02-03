import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const BRANDS = [
  {
    id: "audi",
    name: "Audi",
    logo: require("../../assets/images/brands/audi.png"),
  },
  {
    id: "bmw",
    name: "BMW",
    logo: require("../../assets/images/brands/bmw.png"),
  },
  {
    id: "ford",
    name: "Ford",
    logo: require("../../assets/images/brands/ford.png"),
  },
  {
    id: "porsche",
    name: "Porsche",
    logo: require("../../assets/images/brands/porsche.png"),
  },
];

const CARS = [
  {
    id: "1",
    title: "white Audi 7 - Elite State",
    rating: "4.8",
    reviews: "140+ Review",
    price: "$1,200",
    per: "/day",
    image: require("../../assets/images/cars/audi-white.png"),
  },
  {
    id: "2",
    title: "Red Tesla - Plaid",
    rating: "4.5",
    reviews: "130+ Review",
    price: "$980",
    per: "/day",
    image: require("../../assets/images/cars/tesla-red.png"),
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.locationWrap}>
            <View style={styles.pinBox}>
              <Ionicons name="location" size={18} color="#F59E0B" />
            </View>

            <View style={{ gap: 2 }}>
              <Text style={styles.locationLabel}>Your location</Text>
              <Pressable style={styles.locationLine}>
                <Text style={styles.locationValue}>Ngangphaf,Selman</Text>
                <Ionicons name="chevron-down" size={16} color="#111827" />
              </Pressable>
            </View>
          </View>

          <Pressable>
            <Image
              source={require("../../assets/images/avatar.jpg")}
              style={styles.avatar}
            />
          </Pressable>
        </View>

        <Text style={styles.title}>Find your favourite{"\n"}vechicle.</Text>

        <View style={styles.searchCard}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search vechicle"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <FlatList
          data={BRANDS}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brandsList}
          renderItem={({ item }) => (
            <Pressable style={styles.brandCard}>
              <Image
                source={item.logo}
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <Text style={styles.brandName}>{item.name}</Text>
            </Pressable>
          )}
        />

        <View style={[styles.sectionHeader, { marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>Available Near You</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <FlatList
          data={CARS}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carsList}
          renderItem={({ item }) => (
            <Pressable
              style={styles.carCard}
              onPress={() => router.push(`/car/${item.id}`)}
            >
              <View style={styles.carImageWrap}>
                <Image
                  source={item.image}
                  style={styles.carImage}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.carTitle} numberOfLines={2}>
                {item.title}
              </Text>

              <View style={styles.metaRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.metaText}>
                  {item.rating}[{item.reviews}]
                </Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.per}>{item.per}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },

  locationWrap: { flexDirection: "row", alignItems: "center", gap: 12 },
  pinBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  locationLabel: { fontSize: 12, color: "#6B7280" },
  locationLine: { flexDirection: "row", alignItems: "center", gap: 6 },
  locationValue: { fontSize: 16, fontWeight: "700", color: "#111827" },

  avatar: { width: 44, height: 44, borderRadius: 14 },

  title: {
    marginTop: 22,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "700",
    color: "#111827",
  },

  searchCard: {
    marginTop: 18,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: "#111827" },

  sectionHeader: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#111827" },
  seeAll: { fontSize: 14, fontWeight: "700", color: "#F97316" },

  brandsList: { paddingVertical: 14, gap: 12 },
  brandCard: {
    width: 86,
    height: 86,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  brandLogo: { width: 46, height: 28 },
  brandName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#EF4444",
  },

  carsList: { paddingVertical: 12, gap: 14 },
  carCard: {
    width: 260,
    borderRadius: 22,
    backgroundColor: "#fff",
    padding: 14,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  carImageWrap: {
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  carImage: { width: "92%", height: "92%" },

  carTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  metaText: { fontSize: 13, fontWeight: "700", color: "#6B7280" },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: 10,
  },
  price: { fontSize: 18, fontWeight: "900", color: "#111827" },
  per: { fontSize: 13, fontWeight: "700", color: "#6B7280" },
});
