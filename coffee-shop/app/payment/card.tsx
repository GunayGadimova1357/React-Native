import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardInfo, loadCard, saveCard } from "../../services/cardStorage";
import { useCartStore } from "../../store/useCartStore";
import {
    formatCardNumber,
    formatCVV,
    formatExpiry,
} from "../../utils/cardFormat";

export default function CardPaymentScreen() {
  const router = useRouter();
  const total = useCartStore((s) => s.totalPrice)();

  const [card, setCard] = useState<CardInfo>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    loadCard().then((data) => {
      if (data) setCard(data);
    });
  }, []);

  const update = (key: keyof CardInfo, value: string) => {
    const next = { ...card, [key]: value };
    setCard(next);
    saveCard(next);
  };

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
          </Pressable>
          <Text style={styles.title}>Payment</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.form}>
          <Label text="Card Number" />
          <Input
            value={card.number}
            placeholder="0000 0000 0000 0000"
            keyboardType="number-pad"
            onChangeText={(v: string) => update("number", formatCardNumber(v))}
            maxLength={19}
          />

          <Label text="Card Holder Name" />
          <Input
            value={card.name}
            placeholder="Abdur Rohim Mia"
            onChangeText={(v: string) => update("name", v)}
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Label text="Expiry Date" />
              <Input
                value={card.expiry}
                placeholder="MM/YY"
                keyboardType="number-pad"
                onChangeText={(v: string) => update("expiry", formatExpiry(v))}
                maxLength={5}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Label text="CVV" />
              <Input
                value={card.cvv}
                placeholder="CVV"
                keyboardType="number-pad"
                secureTextEntry
                onChangeText={(v: string) => update("cvv", formatCVV(v))}
                maxLength={3}
              />
            </View>
          </View>
        </View>

        <Text style={styles.info}>
          Your order has been accepted. You can edit payment data before paying.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/payment/confirmation")}
        >
          <Text style={styles.buttonText}>Pay ${total.toFixed(2)}</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

function Input(props: any) {
  return (
    <TextInput {...props} style={styles.input} placeholderTextColor="#9A9A9A" />
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { color: "#fff", fontSize: 20 },
  title: { color: "#fff", fontSize: 20 },

  form: {
    marginTop: 20,
    paddingHorizontal: 18,
    gap: 14,
  },

  label: {
    color: "#CFCFCF",
    fontSize: 14,
  },

  input: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 24,
    textAlign: "center",
    color: "#EAEAEA",
    opacity: 0.8,
  },

  button: {
    marginHorizontal: 18,
    marginTop: "auto",
    marginBottom: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#8B572A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
