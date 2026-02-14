import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useSavedStore } from "../../store/useSavedStore";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { nowShowing } from "../../data/movies";
import { useBookingStore } from "../../store/useBookingStore";

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const startBooking = useBookingStore((state) => state.startBooking);

  const movie = nowShowing.find((m) => m.id === id);
  const isSaved = useSavedStore((s) => s.isSaved(id));
  const toggleSaved = useSavedStore((s) => s.toggle);
  const savedHydrated = useSavedStore((s) => s.hydrated);
  const hydrateSaved = useSavedStore((s) => s.hydrate);

  useEffect(() => {
    if (!savedHydrated) hydrateSaved();
  }, [savedHydrated, hydrateSaved]);

  if (!movie) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.posterWrap}>
          <Image source={{ uri: movie.image }} style={styles.poster} />

          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
            style={styles.posterGradient}
          />

          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={22} color="#fff" />
            </Pressable>

            <Pressable
              onPress={() =>
                toggleSaved({
                  id: movie.id,
                  title: movie.title,
                  image: movie.image,
                  rating: movie.rating,
                  genre: movie.genre,
                  duration: movie.duration,
                  year: movie.year,
                  age: movie.age,
                  synopsis: movie.synopsis,
                })
              }
            >
              <Feather
                name="heart"
                size={22}
                color={isSaved ? "#E50914" : "#fff"}
              />
            </Pressable>
          </View>

          <View style={styles.playButton}>
            <Feather name="play" size={26} color="#fff" />
          </View>

          <View style={styles.posterInfo}>
            <Text style={styles.title}>{movie.title}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Meta icon="star" text={String(movie.rating)} />
            <Meta icon="clock" text={movie.duration} />
            <Meta icon="calendar" text={String(movie.year)} />
            <Meta icon="user" text={movie.age} />
          </View>

          <View style={styles.divider} />

          <Text style={styles.section}>Synopsis</Text>
          <Text style={styles.synopsis}>{movie.synopsis}</Text>
        </View>
      </ScrollView>

      <View style={[styles.bookWrap, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.bookBtn}
          onPress={() => {
            startBooking({
              id: movie.id,
              title: movie.title,
              image: movie.image,
              genre: movie.genre,
              duration: movie.duration,
              rating: movie.rating,
              year: movie.year,
              age: movie.age,
            });
            router.push("/movie/select-time");
          }}
        >
          <Text style={styles.bookText}>BOOK TICKETS</Text>
        </Pressable>
      </View>
    </View>
  );
}
function Meta({ icon, text }: { icon: any; text?: string }) {
  if (!text) return null;

  return (
    <View style={styles.metaItem}>
      <Feather name={icon} size={14} color="#E50914" />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  posterWrap: {
    height: 520,
  },

  poster: {
    width: "100%",
    height: "100%",
  },

  posterGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },

  playButton: {
    position: "absolute",
    top: "42%",
    left: "42%",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E50914",
    justifyContent: "center",
    alignItems: "center",
  },

  posterInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  content: {
    padding: 20,
  },

  metaRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  metaText: {
    color: "#aaa",
  },

  divider: {
    height: 1,
    backgroundColor: "#111",
    marginVertical: 16,
  },

  section: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },

  synopsis: {
    color: "#aaa",
    lineHeight: 22,
  },

  /* BOOK */
  bookWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#111",
  },

  bookBtn: {
    backgroundColor: "#E50914",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  bookText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 2,
  },
});
