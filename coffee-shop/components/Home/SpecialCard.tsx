import { Image, StyleSheet, Text, View } from "react-native";
import { SPECIAL } from "../../data/coffee";

export default function SpecialCard() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.small}>{SPECIAL.label}</Text>
        <Text style={styles.title}>{SPECIAL.title}</Text>
        <Text style={styles.price}>${SPECIAL.price.M.toFixed(2)}</Text>
      </View>
      <Image source={SPECIAL.image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginTop: 26,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  small: {
    color: "#F3F3F3",
    opacity: 0.7,
    fontSize: 14,
  },
  title: {
    color: "#F3F3F3",
    fontSize: 20,
    marginTop: 6,
  },
  price: {
    color: "#F3F3F3",
    fontSize: 18,
    marginTop: 6,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
});
