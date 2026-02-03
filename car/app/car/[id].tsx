import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CarDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <Image
            source={require("../../assets/images/cars/tesla-red.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Red Toyota - Elite State</Text>
            <Ionicons name="heart-outline" size={22} color="#111" />
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.review}>[140+ Review]</Text>
          </View>

          <View style={styles.renterRow}>
            <View style={styles.renterInfo}>
              <Image
                source={require("../../assets/images/avatar.jpg")}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>John Downson</Text>
                <Text style={styles.role}>Renter</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <ActionIcon name="chatbubble-ellipses" />
              <ActionIcon name="call" />
            </View>
          </View>

          <Text style={styles.section}>Car Info</Text>

          <View style={styles.infoGrid}>
            <InfoItem icon="people" text="2 Passangers" />
            <InfoItem icon="car" text="2 Doors" />
            <InfoItem icon="snow" text="Air conditioning" />
            <InfoItem icon="flame" text="Fuel: Full to Full" />
            <InfoItem icon="settings" text="Manual" />
          </View>

          <Text style={styles.section}>Car Specs</Text>

          <View style={styles.specsRow}>
            <Spec title="Max Power" value="720" />
            <Spec title="0-60 mph" value="5.4" />
            <Spec title="Top Speed" value="180" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Text style={styles.price}>
          $1,100 <Text style={styles.per}>/day</Text>
        </Text>

        <Pressable
          style={styles.bookBtn}
          onPress={() => router.push("/booking")}
        >
          <Text style={styles.bookText}>Booking Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function ActionIcon({ name }: { name: any }) {
  return (
    <View style={styles.actionBtn}>
      <Ionicons name={name} size={18} color="#F97316" />
    </View>
  );
}

function InfoItem({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={18} color="#F97316" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function Spec({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.spec}>
      <Text style={styles.specTitle}>{title}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },

  imageWrap: {
    height: 260,
    backgroundColor: "#EEE",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%" },

  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 6,
  },

  dots: {
    position: "absolute",
    bottom: 14,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#D1D5DB" },
  dotActive: { backgroundColor: "#F97316" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 20,
    marginTop: -20,
  },

  titleRow: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 20, fontWeight: "800", color: "#111" },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  rating: { fontWeight: "800" },
  review: { color: "#6B7280", fontWeight: "700" },

  renterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  renterInfo: { flexDirection: "row", gap: 10 },
  avatar: { width: 44, height: 44, borderRadius: 14 },
  name: { fontWeight: "800" },
  role: { color: "#9CA3AF" },

  actions: { flexDirection: "row", gap: 10 },
  actionBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },

  section: { marginTop: 16, fontSize: 18, fontWeight: "800" },

  infoGrid: { marginTop: 12, gap: 10 },
  infoItem: { flexDirection: "row", gap: 10, alignItems: "center" },
  infoText: { fontWeight: "700" },

  specsRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  spec: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
  },
  specTitle: { color: "#6B7280", fontWeight: "700" },
  specValue: { fontSize: 18, fontWeight: "900", marginTop: 6 },

  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  price: { fontSize: 20, fontWeight: "900" },
  per: { fontSize: 14, color: "#6B7280" },

  bookBtn: {
    backgroundColor: "#F97316",
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 18,
  },
  bookText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
