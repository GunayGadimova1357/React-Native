import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [activity, setActivity] = useState<"low" | "moderate" | "high">("low");

  return (
    <LinearGradient colors={["#A9CBE8", "#5D94C7"]} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Let’s start by creating your profile</Text>

          {[
            "Name",
            "Age",
            "Gender",
            "Country",
            "Height (m)",
            "Weight (kg)",
          ].map((placeholder, index) => (
            <View key={index} style={styles.inputWrap}>
              <TextInput
                placeholder={placeholder}
                placeholderTextColor="#666"
                style={styles.input}
              />
            </View>
          ))}

          <Text style={styles.sectionTitle}>Physical activity level:</Text>

          <View style={styles.radioGroup}>
            {[
              { label: "Low", value: "low" },
              { label: "Moderate", value: "moderate" },
              { label: "High", value: "high" },
            ].map((item) => (
              <Pressable
                key={item.value}
                style={styles.radioRow}
                onPress={() =>
                  setActivity(item.value as "low" | "moderate" | "high")
                }
              >
                <View
                  style={[
                    styles.radioOuter,
                    activity === item.value && styles.radioOuterActive,
                  ]}
                >
                  {activity === item.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safe: {
    flex: 1,
    paddingHorizontal: 30,
  },

  content: {
    paddingTop: 20,
    paddingBottom: 40,
    gap: 18,
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    color: "#555",
    marginBottom: 20,
  },

  inputWrap: {
    backgroundColor: "#E5E5E5",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#00B0FF",
    paddingHorizontal: 20,
  },

  input: {
    height: 55,
    fontSize: 16,
  },

  sectionTitle: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },

  radioGroup: {
    marginTop: 10,
    gap: 12,
    alignItems: "center",
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },

  radioOuterActive: {
    borderColor: "#00B0FF",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00B0FF",
  },

  radioLabel: {
    color: "#fff",
    fontSize: 16,
  },

  primaryButton: {
    backgroundColor: "#00B0FF",
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
