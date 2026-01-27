import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#9CA3AF" style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search coffee..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginTop: 16,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#F3F3F3",
    fontSize: 14,
  },
});
