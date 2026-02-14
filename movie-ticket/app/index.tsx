import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { useAuthStore } from "../store/useAuthStore";

export default function SplashScreen() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const hydrate = useAuthStore((s) => s.hydrate);

  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    hydrate();

    Animated.timing(fade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setReady(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [hydrate, fade]);

  useEffect(() => {
    if (!ready || !hydrated) return;

    if (user) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/auth/signup");
    }
  }, [ready, hydrated, user, router]);

  return (
    <LinearGradient
      colors={["#0B0000", "#2B0000", "#000000"]}
      style={styles.container}
    >
      <Animated.View style={{ opacity: fade, alignItems: "center" }}>
        <View style={styles.logoBox}>
          <Feather name="film" size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>PHANTOM</Text>
      </Animated.View>

      <View style={styles.loader}>
        <DotIndicator color="#E50914" size={10} count={3} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoBox: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: "#E50914",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    letterSpacing: 4,
    fontWeight: "300",
  },

  loader: {
    position: "absolute",
    bottom: 80,
  },
});
