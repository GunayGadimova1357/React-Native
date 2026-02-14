import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { comingSoon, Movie, nowShowing } from "../../data/movies";
import { useAuthStore } from "../../store/useAuthStore";

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const filteredNow = useMemo(() => {
    if (!normalized) return nowShowing;
    return nowShowing.filter((m) => m.title.toLowerCase().includes(normalized));
  }, [normalized]);

  const filteredSoon = useMemo(() => {
    if (!normalized) return comingSoon;
    return comingSoon.filter((m) => m.title.toLowerCase().includes(normalized));
  }, [normalized]);

  return (
    <LinearGradient
      colors={["#000000", "#120000", "#000000"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Text style={styles.welcome}>WELCOME TO</Text>
            <Text style={styles.logo}>PHANTOM</Text>
          </View>

          <Pressable onPress={() => router.push("/profile")}>
            {user?.avatarUri ? (
              <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
            ) : (
              <View style={styles.profileIcon}>
                <Feather name="user" size={18} color="#E50914" />
              </View>
            )}
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.searchWrap}>
            <Feather name="search" size={18} color="#777" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search movies"
              placeholderTextColor="#666"
              style={styles.searchInput}
            />
            {!!query && (
              <Pressable
                onPress={() => setQuery("")}
                style={styles.clearBtn}
                hitSlop={8}
              >
                <Feather name="x" size={16} color="#777" />
              </Pressable>
            )}
          </View>

          <SectionDivider />
          <SectionHeader
            title="Now Showing"
            action="View All"
            onPress={() => router.push("/movie/list?type=now")}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredNow.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ScrollView>

          <SectionDivider />
          <SectionHeader
            title="Coming Soon"
            action="View All"
            onPress={() => router.push("/movie/list?type=soon")}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredSoon.map((movie) => (
              <MovieCard key={movie.id} movie={movie} comingSoon />
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function SectionDivider() {
  return <View style={styles.redLine} />;
}

function SectionHeader({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onPress ? (
        <Pressable onPress={onPress}>
          <Text style={styles.viewAll}>{action}</Text>
        </Pressable>
      ) : (
        action && <Text style={styles.viewAll}>{action}</Text>
      )}
    </View>
  );
}

function MovieCard({
  movie,
  comingSoon,
}: {
  movie: Movie;
  comingSoon?: boolean;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={styles.movieCard}
      onPress={() =>
        router.push(
          comingSoon ? `/movie/coming-soon/${movie.id}` : `/movie/${movie.id}`,
        )
      }
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Image source={{ uri: movie.image }} style={styles.movieImage} />

      {pressed && (
        <View style={styles.hoverOverlay}>
          <View style={styles.playButton}>
            <Feather name="play" size={22} color="#fff" />
          </View>
        </View>
      )}

      <Text style={styles.movieTitle}>{movie.title}</Text>

      {!comingSoon && movie.rating && (
        <View style={styles.ratingRow}>
          <Feather name="star" size={14} color="#E50914" />
          <Text style={styles.rating}>{movie.rating}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },

  header: {
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  headerCenter: {
    alignItems: "center",
  },

  welcome: {
    color: "#E50914",
    fontSize: 12,
    letterSpacing: 2,
  },

  logo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E50914",
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: {
    paddingTop: 16,
    paddingBottom: 30,
  },

  searchWrap: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#0f0505",
    borderWidth: 1,
    borderColor: "#500606",
    paddingHorizontal: 14,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    color: "#fff",
    flex: 1,
  },
  clearBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  redLine: {
    height: 2,
    width: 32,
    backgroundColor: "#E50914",
    marginLeft: 20,
    marginBottom: 14,
    borderRadius: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  viewAll: {
    color: "#E50914",
  },

  movieCard: {
    width: 180,
    marginLeft: 20,
    marginBottom: 30,
  },

  movieImage: {
    width: "100%",
    height: 260,
    borderRadius: 20,
  },

  hoverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  playButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E50914",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E50914",
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },

  movieTitle: {
    color: "#fff",
    marginTop: 12,
    fontWeight: "600",
    fontSize: 15,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  rating: {
    color: "#E50914",
    marginLeft: 6,
    fontSize: 13,
  },
});
