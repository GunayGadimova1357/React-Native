import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.mapWrap}>
        <Image
          source={require("../../assets/images/map.png")}
          style={styles.map}
        />

        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>

        <Pressable style={styles.filterBtn}>
          <Ionicons name="options" size={20} color="#111" />
        </Pressable>
      </View>

      <View style={styles.carCard}>
        <View>
          <Text style={styles.carTitle}>White Audi 7 - Elite State</Text>
          <Text style={styles.carSub}>2 Doors</Text>
        </View>

        <View style={styles.rating}>
          <Ionicons name="star" size={14} color="#fff" />
          <Text style={styles.ratingText}>4.8</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.section}>Overview</Text>

        <View style={styles.row}>
          <DateBox label="Start" value="16 Feb 2022" />
          <DateBox label="End" value="19 Feb 2022" />
        </View>

        <Text style={styles.section}>Pick-up location</Text>

        <View style={styles.locationCard}>
          <Ionicons name="location" size={18} color="#F97316" />
          <Text style={styles.locationText}>Ngangphaf, Selman</Text>
          <Text style={styles.distance}>0.5km</Text>
        </View>

        <Text style={styles.section}>Payment</Text>

        <Pressable style={styles.paymentCard}>
          <FontAwesome5 name="cc-mastercard" size={34} color="#EB001B" />

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.cardTitle}>MasterCard</Text>
            <Text style={styles.cardNumber}>**** **** 4567 5485</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} />
        </Pressable>

        <Pressable style={styles.payBtn}>
          <Text style={styles.payText}>
            Pay <Text style={styles.price}>$1,100</Text>
            <Text style={styles.per}> /day</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function DateBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.dateBox}>
      <Text style={styles.dateLabel}>{label}</Text>
      <Text style={styles.dateValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  mapWrap: {
    height: 260,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 8,
  },
  filterBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 8,
  },

  carCard: {
    backgroundColor: "#FB923C",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    marginTop: -28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  carSub: {
    color: "#FFE4CC",
    marginTop: 4,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "800",
  },

  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    marginTop: -16,
    flex: 1,
  },

  section: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
  },
  dateLabel: {
    color: "#9CA3AF",
    fontWeight: "700",
  },
  dateValue: {
    marginTop: 4,
    fontWeight: "800",
    fontSize: 16,
  },

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
  },
  locationText: {
    flex: 1,
    fontWeight: "800",
  },
  distance: {
    color: "#9CA3AF",
    fontWeight: "700",
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
  },
  cardLogo: {
    width: 40,
    height: 24,
    resizeMode: "contain",
  },
  cardTitle: {
    fontWeight: "800",
  },
  cardNumber: {
    color: "#9CA3AF",
  },

  payBtn: {
    marginTop: "auto",
    height: 64,
    borderRadius: 20,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },
  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  price: {
    fontWeight: "900",
  },
  per: {
    fontSize: 14,
    fontWeight: "700",
  },
});
