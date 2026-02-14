import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCardStore } from "../../store/useCardStore";
import {
  formatCardNumber,
  formatCVV,
  formatExpiry,
} from "../../utils/cardFormat";

export default function AddCardScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const addCard = useCardStore((s) => s.addCard);
  const updateCard = useCardStore((s) => s.updateCard);
  const cards = useCardStore((s) => s.cards);
  const hydrated = useCardStore((s) => s.hydrated);
  const hydrate = useCardStore((s) => s.hydrate);
  const editingCard = cards.find((c) => c.id === id);

  const [brand, setBrand] = useState<"Visa" | "Mastercard">("Visa");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setErrors({});
  }, [number, name, expiry, cvv]);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  useEffect(() => {
    if (!editingCard) return;
    setBrand(editingCard.brand);
    setNumber(editingCard.number);
    setName(editingCard.name);
    setExpiry(editingCard.expiry);
    setCvv(editingCard.cvv);
    setImage(editingCard.image);
  }, [editingCard]);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;
    const res = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (number.replace(/\D/g, "").length < 12) next.number = "Too short";
    if (name.trim().length < 2) next.name = "Too short";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) next.expiry = "MM/YY";
    if (!/^\d{3}$/.test(cvv)) next.cvv = "3 digits";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;
    const payload = {
      brand,
      number: number.trim(),
      name: name.trim(),
      expiry: expiry.trim(),
      cvv: cvv.trim(),
      image,
    };
    if (editingCard) {
      updateCard(editingCard.id, payload);
    } else {
      addCard(payload);
    }
    router.back();
  };

  const numberPreview = number || "•••• •••• •••• ••••";
  const namePreview = (name || "CARD HOLDER").toUpperCase();
  const expiryPreview = expiry || "MM/YY";

  return (
    <LinearGradient colors={["#0b0b0b", "#140909"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} color="#F3F3F3" />
              </Pressable>
              <Text style={styles.headerTitle}>
                {editingCard ? "Edit Card" : "Add New Card"}
              </Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.cardPreview}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardBrand}>CINEPASS</Text>
                <Ionicons name="card-outline" size={22} color="#F3F3F3" />
              </View>
              <Text style={styles.cardNumberPreview}>{numberPreview}</Text>
              <View style={styles.cardRow}>
                <Text style={styles.cardNamePreview}>{namePreview}</Text>
                <Text style={styles.cardExpiryPreview}>{expiryPreview}</Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 18 }}>
              <Text style={styles.sectionTitle}>Card Brand</Text>
              <View style={styles.brandRow}>
                {(["Visa", "Mastercard"] as const).map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => setBrand(item)}
                    style={[
                      styles.brandChip,
                      brand === item && styles.brandChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.brandText,
                        brand === item && styles.brandTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.sectionTitle}>Card Photo</Text>
              <View style={styles.photoRow}>
                <Pressable onPress={pickImage} style={styles.imagePicker}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                  ) : (
                    <Ionicons name="image-outline" size={26} color="#F3F3F3" />
                  )}
                  <Text style={styles.photoHint}>Gallery</Text>
                </Pressable>

                <Pressable onPress={takePhoto} style={styles.imagePicker}>
                  <Ionicons name="camera-outline" size={26} color="#F3F3F3" />
                  <Text style={styles.photoHint}>Camera</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.form}>
              <FormInput label="Card Number" error={errors.number}>
                <TextInput
                  value={number}
                  onChangeText={(text) => setNumber(formatCardNumber(text))}
                  keyboardType="number-pad"
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#7A7A7A"
                  style={styles.input}
                />
              </FormInput>

              <FormInput label="Card Holder Name" error={errors.name}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name"
                  placeholderTextColor="#7A7A7A"
                  style={styles.input}
                  autoCapitalize="words"
                />
              </FormInput>

              <View style={styles.twoCols}>
                <View style={{ flex: 1 }}>
                  <FormInput label="Expiry (MM/YY)" error={errors.expiry}>
                    <TextInput
                      value={expiry}
                      onChangeText={(text) => setExpiry(formatExpiry(text))}
                      keyboardType="number-pad"
                      maxLength={5}
                      placeholder="MM/YY"
                      placeholderTextColor="#7A7A7A"
                      style={styles.input}
                    />
                  </FormInput>
                </View>

                <View style={{ width: 12 }} />

                <View style={{ flex: 1 }}>
                  <FormInput label="CVV" error={errors.cvv}>
                    <TextInput
                      value={cvv}
                      onChangeText={(text) => setCvv(formatCVV(text))}
                      keyboardType="number-pad"
                      maxLength={3}
                      secureTextEntry
                      placeholder="CVV"
                      placeholderTextColor="#7A7A7A"
                      style={styles.input}
                    />
                  </FormInput>
                </View>
              </View>

              <Pressable onPress={onSubmit} style={styles.saveBtn}>
                <Text style={styles.saveText}>
                  {editingCard ? "Update" : "Save"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function FormInput({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, error && { borderColor: "#D9534F" }]}>
        {children}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#F3F3F3",
    fontSize: 20,
    fontWeight: "500",
  },

  cardPreview: {
    height: 180,
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 18,
    justifyContent: "space-between",
    backgroundColor: "#1E2A3A",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBrand: {
    color: "#E50914",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
  },
  cardNumberPreview: {
    color: "#fff",
    fontSize: 22,
    letterSpacing: 2,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNamePreview: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.9,
  },
  cardExpiryPreview: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.9,
  },

  sectionTitle: {
    color: "#F3F3F3",
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.9,
  },
  brandRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  brandChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2b0b0b",
    backgroundColor: "#140909",
  },
  brandChipActive: {
    borderColor: "#E50914",
    backgroundColor: "#1d0b0b",
  },
  brandText: {
    color: "#777",
    fontWeight: "600",
  },
  brandTextActive: {
    color: "#fff",
  },

  photoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  imagePicker: {
    flex: 1,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#1E2A3A",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  image: {
    width: 62,
    height: 62,
    borderRadius: 14,
  },
  photoHint: {
    color: "#F3F3F3",
    fontSize: 12,
    opacity: 0.85,
  },

  form: {
    paddingHorizontal: 18,
    paddingTop: 4,
  },

  label: {
    color: "#F3F3F3",
    fontSize: 14,
    marginBottom: 6,
    opacity: 0.9,
  },

  inputWrapper: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1E2A3A",
    paddingHorizontal: 14,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },

  input: {
    color: "#fff",
    fontSize: 16,
  },

  error: {
    color: "#D9534F",
    fontSize: 12,
    marginTop: 5,
  },

  twoCols: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  saveBtn: {
    height: 56,
    borderRadius: 16,
    marginTop: 10,
    backgroundColor: "#E50914",
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
