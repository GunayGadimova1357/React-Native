import { useRouter } from "expo-router";
import React from "react";
import {
    ImageBackground,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/water.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.titleText}>Welcome To</Text>
          <Text style={styles.titleText}>Water Meter</Text>
        </View>

        <View style={styles.middleSection}>
          <Text style={styles.cursiveSubtitle}>Drink water</Text>
          <Text style={styles.cursiveSubtitle}>Stay healthy</Text>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.accountText}>
            Already have an account?{" "}
            <Text
              style={styles.signInLink}
              onPress={() => router.push("/login")}
            >
              Sign in
            </Text>
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.signUpButton,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },

  topSection: {
    marginTop: 200,
    alignItems: "center",
  },

  titleText: {
    fontSize: 42,
    color: "#5A7D8F",
    fontWeight: "400",
    textAlign: "center",
  },

  middleSection: {
    alignItems: "center",
  },

  cursiveSubtitle: {
    fontSize: 32,
    color: "#4FC3F7",
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: Platform.select({
      ios: "Snell Roundhand",
      android: "serif",
    }),
  },

  bottomSection: {
    marginBottom: 60,
    alignItems: "center",
  },

  accountText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 25,
    fontWeight: "500",
  },

  signInLink: {
    color: "#00B0FF",
    fontWeight: "bold",
  },

  signUpButton: {
    backgroundColor: "#4FC3F7",
    width: "75%",
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1.2,
  },
});
