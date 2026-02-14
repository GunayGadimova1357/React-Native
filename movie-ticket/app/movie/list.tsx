import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { comingSoon, nowShowing } from "../../data/movies";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MovieListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams<{ type?: string }>();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("cine_view_mode");
      if (saved === "list" || saved === "grid") {
        setViewMode(saved);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("cine_view_mode", viewMode);
  }, [viewMode]);

  const { title, items } = useMemo(() => {
    if (type === "soon") {
      return { title: "Coming Soon", items: comingSoon };
    }
    return { title: "Now Showing", items: nowShowing };
  }, [type]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>{title}</Text>

        <Pressable
          onPress={() => setViewMode(viewMode === "list" ? "grid" : "list")}
        >
          <Feather
            name={viewMode === "list" ? "grid" : "list"}
            size={20}
            color="#fff"
          />
        </Pressable>
      </View>

      <FlatList
        data={items}
        key={viewMode}
        numColumns={viewMode === "grid" ? 2 : 1}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
        columnWrapperStyle={viewMode === "grid" ? styles.gridRow : undefined}
        renderItem={({ item }) =>
          viewMode === "grid" ? (
            <Pressable
              style={styles.gridCard}
              onPress={() =>
                router.push(
                  type === "soon"
                    ? `/movie/coming-soon/${item.id}`
                    : `/movie/${item.id}`,
                )
              }
            >
              <Image source={{ uri: item.image }} style={styles.gridPoster} />
            </Pressable>
          ) : (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push(
                  type === "soon"
                    ? `/movie/coming-soon/${item.id}`
                    : `/movie/${item.id}`,
                )
              }
            >
              <Image source={{ uri: item.image }} style={styles.poster} />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.genre}>{item.genre ?? "-"}</Text>
                {item.duration && (
                  <Text style={styles.meta}>{item.duration}</Text>
                )}
              </View>

              <Feather name="chevron-right" size={18} color="#5c1a1a" />
            </Pressable>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a0c0c",
    backgroundColor: "#0f0505",
    marginBottom: 12,
  },

  poster: {
    width: 60,
    height: 84,
    borderRadius: 10,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  genre: {
    color: "#E50914",
    marginTop: 4,
  },

  meta: {
    color: "#777",
    marginTop: 6,
  },

  gridRow: {
    gap: 14,
    marginBottom: 14,
  },

  gridCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2a0c0c",
    backgroundColor: "#120606",
    padding: 8,
    overflow: "hidden",
  },

  gridPoster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
