import Feather from "@expo/vector-icons/Feather";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cinemas } from "../../data/showtimes";

export default function CinemaMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cinema = cinemas.find((c) => c.id === id);

  if (!cinema) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Cinema Location</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.mapWrap}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          customMapStyle={DARK_MAP_STYLE}
          initialRegion={{
            latitude: cinema.lat,
            longitude: cinema.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{ latitude: cinema.lat, longitude: cinema.lng }}
            title={cinema.name}
            description={cinema.location}
            pinColor="#E50914"
          />
        </MapView>

        <View style={styles.infoCard}>
          <Text style={styles.name}>{cinema.name}</Text>
          <Text style={styles.location}>{cinema.location}</Text>
          <Text style={styles.coords}>
            {cinema.lat.toFixed(4)}, {cinema.lng.toFixed(4)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  mapWrap: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2a0c0c",
    backgroundColor: "#0f0505",
    overflow: "hidden",
  },
  infoCard: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderWidth: 1,
    borderColor: "#2a0c0c",
  },
  coords: { color: "#999", fontSize: 12, marginTop: 4 },
  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
  location: { color: "#E50914", fontSize: 12, marginTop: 2 },
});

const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0b0b0b" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8e8e8e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b0b0b" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#2a2a2a" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b6b6b" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1b1b1b" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#121212" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7a7a7a" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0f1a1f" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4f6b75" }],
  },
];
