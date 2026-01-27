import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { CoffeeCategory } from "../../data/coffee";

type Props = {
  categories: CoffeeCategory[];
  active: CoffeeCategory;
  onChange: (c: CoffeeCategory) => void;
};

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((item) => {
        const isActive = item === active;
        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={[styles.item, isActive && styles.active]}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    gap: 10,
    marginTop: 16,
  },
  item: {
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#8B572A",
  },
  text: {
    color: "#F3F3F3",
    fontSize: 14,
  },
  activeText: {
    color: "#fff",
  },
});
