import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

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
            placeholder="Email address"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Company"
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

        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#666"
            secureTextEntry={!confirmVisible}
            style={styles.input}
          />
          <Pressable
            onPress={() => setConfirmVisible(!confirmVisible)}
            style={styles.icon}
          >
            <Feather name="lock" size={20} color="#333" />
          </Pressable>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/personal")}
        >
          <Text style={styles.primaryText}>REGISTER</Text>
        </Pressable>

        <Text style={styles.smallText}>
          Already have an account?{" "}
          <Text style={styles.signIn} onPress={() => router.push("/login")}>
            Sign in
          </Text>
        </Text>
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

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },

  primaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  smallText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    marginTop: 15,
  },

  signIn: {
    color: "#00E5FF",
    fontWeight: "bold",
  },
});
