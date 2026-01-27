import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.trim().length > 3 && password.trim().length > 0;

  const onSubmit = async () => {
    if (!canSubmit) return;

    await signIn(email.trim());
    router.replace("/(tabs)");
  };

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.top}>
            <Image
              source={require("../assets/images/coffee.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.brand}>
              <Text style={styles.brandCoffee}>Coffee</Text>
              <Text style={styles.brandShop}>Shop</Text>
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="rgba(243,243,243,0.55)"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="rgba(243,243,243,0.55)"
              style={styles.input}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />

            <Pressable
              onPress={onSubmit}
              disabled={!canSubmit}
              style={({ pressed }) => [
                styles.button,
                !canSubmit && { opacity: 0.5 },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  top: {
    alignItems: "center",
    marginTop: 70,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  brand: {
    fontSize: 38,
    fontWeight: "500",
  },
  brandCoffee: { color: "#8B572A" },
  brandShop: { color: "#F3F3F3" },

  form: {
    marginTop: 60,
    paddingHorizontal: 24,
    gap: 18,
  },

  input: {
    height: 62,
    borderRadius: 16,
    paddingHorizontal: 18,
    color: "#F3F3F3",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  button: {
    marginTop: 20,
    height: 62,
    borderRadius: 16,
    backgroundColor: "#8B572A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#F3F3F3",
    fontSize: 20,
    fontWeight: "500",
  },
});
