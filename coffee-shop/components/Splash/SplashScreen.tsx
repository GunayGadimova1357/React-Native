import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function SplashScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (!isHydrated) return;
    const t = setTimeout(() => {
      if (user) router.replace("/(tabs)");
      else router.replace("/welcome");
    }, 900);

    return () => clearTimeout(t);
  }, [isHydrated, user, router]);

  return (
    <LinearGradient colors={["#E7C19B", "#F1E2DA"]} style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/coffee.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          <Text style={styles.coffee}>Coffee</Text>
          <Text style={styles.shop}>Shop</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
  },
  coffee: {
    color: "#6B4E3D",
  },
  shop: {
    color: "#C48A5A",
  },
});
