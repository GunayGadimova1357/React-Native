import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCardStore } from "../../store/useCardStore";
import { maskCardNumber } from "../../utils/cardFormat";

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cards = useCardStore((s) => s.cards);
  const paymentMethod = useCardStore((s) => s.paymentMethod);
  const setPaymentMethod = useCardStore((s) => s.setPaymentMethod);
  const removeCard = useCardStore((s) => s.removeCard);
  const hydrated = useCardStore((s) => s.hydrated);
  const hydrate = useCardStore((s) => s.hydrate);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.section}>
          {cards.map((card) => {
            const isPrimary =
              paymentMethod.type === "card" && paymentMethod.cardId === card.id;
            return (
              <Pressable
                key={card.id}
                style={styles.card}
                onPress={() => router.push(`/profile/add-card?id=${card.id}`)}
              >
                <View style={styles.cardIcon}>
                  <Feather name="credit-card" size={18} color="#E50914" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    {card.brand} · {maskCardNumber(card.number)}
                  </Text>
                  <Text style={styles.cardSub}>Expires {card.expiry}</Text>
                </View>
                <View style={styles.cardActions}>
                  {isPrimary ? (
                    <Text style={styles.primary}>Primary</Text>
                  ) : (
                    <Pressable
                      onPress={() =>
                        setPaymentMethod({ type: "card", cardId: card.id })
                      }
                      style={styles.useBtn}
                    >
                      <Text style={styles.useText}>Use</Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() => removeCard(card.id)}
                    style={styles.actionBtn}
                  >
                    <Feather name="trash-2" size={16} color="#E50914" />
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
          {!cards.length && (
            <Text style={styles.emptyText}>No cards added yet.</Text>
          )}
        </View>

        <Pressable
          style={styles.addBtn}
          onPress={() => router.push("/profile/add-card")}
        >
          <Feather name="plus" size={16} color="#fff" />
          <Text style={styles.addText}>Add New Card</Text>
        </Pressable>
      </ScrollView>
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
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  section: {
    margin: 20,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1d0b0b",
    backgroundColor: "#0f0505",
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#1b0b0b",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { color: "#fff", fontWeight: "600" },
  cardSub: { color: "#777", marginTop: 4, fontSize: 12 },
  primary: {
    color: "#E50914",
    fontWeight: "600",
    fontSize: 12,
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2b0b0b",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#140909",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  useBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2b0b0b",
    backgroundColor: "#140909",
  },
  useText: {
    color: "#E50914",
    fontSize: 12,
    fontWeight: "600",
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2b0b0b",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#140909",
  },
  emptyText: {
    color: "#777",
    textAlign: "center",
    paddingVertical: 12,
  },

  addBtn: {
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#E50914",
    paddingVertical: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  addText: { color: "#fff", fontWeight: "600" },
});
