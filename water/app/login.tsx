import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <LinearGradient colors={["#A9CBE8", "#5D94C7"]} style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />
          <Pressable
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.icon}
          >
            <Feather name="lock" size={20} color="#333" />
          </Pressable>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/personal")}
        >
          <Text style={styles.primaryText}>LOG IN</Text>
        </Pressable>

        <Text style={styles.linkText}>Forgot Password?</Text>

        <Text style={styles.smallText}>
          Don’t have an account?{" "}
          <Text style={styles.signUp} onPress={() => router.push("/register")}>
            Sign Up
          </Text>
        </Text>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or log in with</Text>
          <View style={styles.line} />
        </View>

        <Pressable style={[styles.socialBtn, { backgroundColor: "#25D366" }]}>
          <Text style={styles.socialText}>Whatsapp</Text>
        </Pressable>

        <Pressable style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}>
          <Text style={styles.socialText}>Facebook</Text>
        </Pressable>

        <Pressable style={[styles.socialBtn, { backgroundColor: "#FFFFFF" }]}>
          <Text style={[styles.socialText, { color: "#333" }]}>Google</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  form: {
    gap: 18,
  },

  inputWrap: {
    backgroundColor: "#E5E5E5",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#00B0FF",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
  },

  icon: {
    paddingLeft: 10,
  },

  primaryButton: {
    backgroundColor: "#00B0FF",
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 10,
  },

  primaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  linkText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
  },

  smallText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
  },

  signUp: {
    color: "#00E5FF",
    fontWeight: "bold",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#fff",
  },

  orText: {
    marginHorizontal: 10,
    color: "#fff",
  },

  socialBtn: {
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: "center",
  },

  socialText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
