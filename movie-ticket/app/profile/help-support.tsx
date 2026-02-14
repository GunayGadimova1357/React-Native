import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HELP = [
  { id: "1", title: "FAQ", sub: "Popular questions" },
  { id: "2", title: "Contact Support", sub: "We reply within 24h" },
  { id: "3", title: "Report a Problem", sub: "Let us know what's wrong" },
];

export default function HelpSupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.section}>
        {HELP.map((item) => (
          <Pressable key={item.id} style={styles.row}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#555" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  section: { margin: 20, gap: 12 },
  row: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1d0b0b",
    backgroundColor: "#0f0505",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { color: "#fff", fontWeight: "600" },
  sub: { color: "#777", marginTop: 4, fontSize: 12 },
});
