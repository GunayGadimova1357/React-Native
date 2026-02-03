import { useRouter } from "expo-router";
import React from "react";
import {
    ImageBackground,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/images/onboarding-bg.jpg")}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>
            Find and rent{"\n"}car in easy{"\n"}steps.
          </Text>

          <View style={styles.bottom}>
            <Pressable
              onPress={() => router.push("/home")}
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.9 },
              ]}
            >
              <Text style={styles.buttonText}>Let’s Go!</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },

  bg: { flex: 1 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  title: {
    marginTop: 40,
    left: 20,
    fontSize: 48,
    lineHeight: 60,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 36,
  },

  button: {
    height: 68,
    borderRadius: 18,
    backgroundColor: "#F28A57",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "300",
  },
});
