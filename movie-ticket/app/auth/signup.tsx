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

export default function SignUpScreen() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const hydrate = useAuthStore((s) => s.hydrate);

  const [nickname, setNickname] = useState("");
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

  const handleSignUp = async () => {
    setError(null);
    if (!nickname.trim()) {
      setError("Enter a nickname.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must include a number and an uppercase letter.");
      return;
    }

    await signUp({ nickname, email });
    router.replace("/(tabs)/home");
  };

  return (
    <LinearGradient
      colors={["#0B0000", "#140000", "#000"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        {/* <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Feather name="chevron-left" size={26} color="#fff" />
        </TouchableOpacity> */}

        <Text style={styles.logo}>Phantom</Text>

        <Text style={styles.title}>Join the Premiere</Text>
        <Text style={styles.subtitle}>
          Create an account to start your cinematic journey.
        </Text>

        <Text style={styles.label}>Nickname</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a nickname"
          placeholderTextColor="#666"
          value={nickname}
          onChangeText={setNickname}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          placeholderTextColor="#666"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrap}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••"
            placeholderTextColor="#666"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setSecure(!secure)}>
            <Feather name={secure ? "eye-off" : "eye"} size={20} color="#777" />
          </Pressable>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socials}>
          {/* <View style={styles.socialBtn}>
            <Feather name="apple" size={22} color="#fff" />
          </View> */}
          <View style={styles.socialBtn}>
            <Feather name="chrome" size={22} color="#fff" />
          </View>
        </View>

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text
            style={styles.signIn}
            onPress={() => router.replace("/auth/signin")}
          >
            Sign In
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

  logo: {
    color: "#E50914",
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

  footer: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
  },

  signIn: {
    color: "#E50914",
    fontWeight: "600",
  },

  error: {
    color: "#D9534F",
    marginTop: 10,
  },
});
