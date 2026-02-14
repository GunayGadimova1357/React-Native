import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/useAuthStore";

export default function SignInScreen() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const hydrate = useAuthStore((s) => s.hydrate);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/(tabs)/home");
    }
  }, [hydrated, user, router]);

  const handleSignIn = async () => {
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    await signUp({
      nickname: email.split("@")[0] || "User",
      email,
    });

    router.replace("/(tabs)/home");
  };

  return (
    <LinearGradient
      colors={["#000000", "#140000", "#000000"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        {/* <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Feather name="chevron-left" size={26} color="#fff" />
        </TouchableOpacity> */}

        <Text style={styles.header}>Sign In</Text>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to book your cinematic experience
        </Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          placeholderTextColor="#666"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError(null);
          }}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrap}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#666"
            secureTextEntry={secure}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError(null);
            }}
          />
          <Pressable onPress={() => setSecure(!secure)}>
            <Feather name={secure ? "eye-off" : "eye"} size={20} color="#777" />
          </Pressable>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.forgot}>Forgot Password?</Text>

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socials}>
          {/* <View style={styles.socialBtn}>
            <Text style={styles.socialText}>G</Text>
          </View> */}
          <View style={styles.socialBtn}>
            <Feather name="chrome" size={22} color="#fff" />
          </View>
        </View>

        <Text style={styles.footer}>
          Don&apos;t have an account?{" "}
          <Text
            style={styles.create}
            onPress={() => router.replace("/auth/signup")}
          >
            Create Account
          </Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  safe: {
    flex: 1,
    paddingTop: 16,
  },

  back: {
    position: "absolute",
    top: 75,
    left: 20,
  },

  header: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "600",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },

  subtitle: {
    color: "#999",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 30,
  },

  label: {
    color: "#ccc",
    marginBottom: 6,
    marginTop: 18,
  },

  input: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 16,
    color: "#fff",
  },

  passwordWrap: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    color: "#fff",
  },

  forgot: {
    color: "#777",
    textAlign: "right",
    marginTop: 10,
  },

  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E50914",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#222",
  },

  or: {
    color: "#666",
    marginHorizontal: 10,
  },

  socials: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },

  socialBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  socialText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
  },

  create: {
    color: "#E50914",
    fontWeight: "600",
  },

  error: {
    color: "#D9534F",
    marginTop: 10,
  },
});
