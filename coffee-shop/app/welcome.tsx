import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={require("../assets/images/coffee-full.png")}
          style={styles.coffee}
          resizeMode="contain"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Enjoy quality brew{"\n"}with the finest of flavours
          </Text>

          <Text style={styles.subtitle}>
            The best gain, the finest roast, the{"\n"}powerful flavor.
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  coffee: {
    position: "absolute",
    width: 510,
    height: 340,
    top: 200,
    left: "50%",
    transform: [{ translateX: -255 }, { scale: 1.1 }],
    opacity: 1,
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  title: {
    fontWeight: "400",
    fontSize: 28,
    lineHeight: 28,
    color: "#F3F3F3",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    color: "#F3F3F3",
    opacity: 0.85,
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#8B572A",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
