import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookingStore } from "../../store/useBookingStore";
import { SavedMovie, useSavedStore } from "../../store/useSavedStore";

const formatAdded = (addedAt: number) => {
  const diffMs = Date.now() - addedAt;
  const days = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return `Added ${days} day${days > 1 ? "s" : ""} ago`;
};

export default function SavedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const items = useSavedStore((s) => s.items);
  const hydrated = useSavedStore((s) => s.hydrated);
  const hydrate = useSavedStore((s) => s.hydrate);
  const remove = useSavedStore((s) => s.remove);
  const startBooking = useBookingStore((s) => s.startBooking);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.addedAt - a.addedAt),
    [items],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View>
          <Text style={styles.headerTitle}>Favourites</Text>
          <Text style={styles.headerSub}>{items.length} movies saved</Text>
        </View>
        <Pressable
          style={styles.addBtn}
          onPress={() => router.push("/movie/list?type=now")}
        >
          <Feather name="plus" size={18} color="#E50914" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.list}>
          {sorted.map((movie) => (
            <SavedCard
              key={movie.id}
              movie={movie}
              onRemove={() => remove(movie.id)}
              onBook={() => {
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
            />
          ))}
          {!sorted.length && (
            <Text style={styles.emptyText}>No saved movies yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function SavedCard({
  movie,
  onRemove,
  onBook,
}: {
  movie: SavedMovie;
  onRemove: () => void;
  onBook: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.posterWrap}>
        <Image source={{ uri: movie.image }} style={styles.poster} />
        {movie.rating && (
          <View style={styles.rating}>
            <Feather name="star" size={12} color="#E50914" />
            <Text style={styles.ratingText}>{movie.rating}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.genre}>{movie.genre ?? "-"}</Text>
        <View style={styles.meta}>
          <Feather name="clock" size={14} color="#777" />
          <Text style={styles.duration}>{movie.duration ?? "-"}</Text>
        </View>
        <Text style={styles.added}>{formatAdded(movie.addedAt)}</Text>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.bookBtn,
              pressed && styles.bookBtnPressed,
            ]}
            onPress={onBook}
          >
            <Text style={styles.bookText}>Book Now</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.deleteBtn,
              pressed && styles.deleteBtnPressed,
            ]}
            onPress={onRemove}
          >
            <Feather name="trash-2" size={18} color="#E50914" />
          </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
  headerSub: {
    color: "#E50914",
    marginTop: 4,
  },
  addBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  list: {
    marginTop: 20,
    gap: 16,
    marginHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2a0c0c",
    backgroundColor: "#0f0505",
  },
  posterWrap: {
    width: 90,
    height: 120,
    borderRadius: 14,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  rating: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardBody: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  genre: {
    color: "#E50914",
    marginTop: 6,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  duration: {
    color: "#777",
  },
  added: {
    color: "#555",
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 14,
  },
  bookBtn: {
    flex: 1,
    backgroundColor: "#E50914",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  bookBtnPressed: {
    backgroundColor: "#b70710",
  },
  bookText: {
    color: "#fff",
    fontWeight: "700",
  },
  deleteBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2b0b0b",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#140909",
  },
  deleteBtnPressed: {
    borderColor: "#E50914",
    backgroundColor: "#1f0c0c",
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
  },
});
