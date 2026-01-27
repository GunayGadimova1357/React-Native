import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
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

import * as ImagePicker from "expo-image-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { loadCard, saveCard, type CardInfo } from "../services/cardStorage";

import { formatCardNumber, formatCVV, formatExpiry } from "../utils/cardFormat";

const schema = z.object({
  number: z
    .string()
    .min(12, "Too short")
    .max(25, "Too long")
    .regex(/^[0-9 ]+$/, "Only numbers"),
  name: z.string().min(2, "Too short"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvv: z.string().regex(/^\d{3}$/, "3 digits"),
  image: z.string().optional(),
});

type Form = z.infer<typeof schema>;

export default function CardInfoScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvv: "",
      image: undefined,
    },
  });

  useEffect(() => {
    (async () => {
      const saved = await loadCard();
      if (!saved) return;

      setValue("number", saved.number ?? "");
      setValue("name", saved.name ?? "");
      setValue("expiry", saved.expiry ?? "");
      setValue("cvv", saved.cvv ?? "");
      if (saved.image) setValue("image", saved.image);
    })();
  }, [setValue]);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!res.canceled) {
      setValue("image", res.assets[0].uri, {
        shouldValidate: true,
      });
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;

    const res = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!res.canceled) {
      setValue("image", res.assets[0].uri, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: Form) => {
    const payload: CardInfo = {
      number: data.number.trim(),
      name: data.name.trim(),
      expiry: data.expiry.trim(),
      cvv: data.cvv.trim(),
      image: data.image,
    };

    await saveCard(payload);
    router.back();
  };

  const numberPreview = watch("number") || "•••• •••• •••• ••••";
  const namePreview = (watch("name") || "CARD HOLDER").toUpperCase();
  const expiryPreview = watch("expiry") || "MM/YY";
  const imageUri = watch("image");

  return (
    <LinearGradient colors={["#192438", "#313139"]} style={styles.container}>
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
              <Text style={styles.headerTitle}>Card Information</Text>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.cardPreview}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardBrand}>COFFEE</Text>
                <Ionicons name="card-outline" size={22} color="#F3F3F3" />
              </View>

              <Text style={styles.cardNumberPreview}>{numberPreview}</Text>

              <View style={styles.cardRow}>
                <Text style={styles.cardNamePreview}>{namePreview}</Text>
                <Text style={styles.cardExpiryPreview}>{expiryPreview}</Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 18 }}>
              <Text style={styles.sectionTitle}>Card Photo</Text>

              <View style={styles.photoRow}>
                <Pressable onPress={pickImage} style={styles.imagePicker}>
                  {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
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
              <FormInput label="Card Number" error={errors.number?.message}>
                <Controller
                  control={control}
                  name="number"
                  render={({ field: { value, onChange } }) => (
                    <TextInput
                      value={value}
                      onChangeText={(text) => onChange(formatCardNumber(text))}
                      keyboardType="number-pad"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      style={styles.input}
                    />
                  )}
                />
              </FormInput>

              <FormInput label="Card Holder Name" error={errors.name?.message}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Your name"
                      placeholderTextColor="#7A7A7A"
                      style={styles.input}
                      autoCapitalize="words"
                    />
                  )}
                />
              </FormInput>

              <View style={styles.twoCols}>
                <View style={{ flex: 1 }}>
                  <FormInput
                    label="Expiry (MM/YY)"
                    error={errors.expiry?.message}
                  >
                    <Controller
                      control={control}
                      name="expiry"
                      render={({ field: { value, onChange } }) => (
                        <TextInput
                          value={value}
                          onChangeText={(text) => onChange(formatExpiry(text))}
                          keyboardType="number-pad"
                          maxLength={5}
                          placeholder="MM/YY"
                          style={styles.input}
                        />
                      )}
                    />
                  </FormInput>
                </View>

                <View style={{ width: 12 }} />

                <View style={{ flex: 1 }}>
                  <FormInput label="CVV" error={errors.cvv?.message}>
                    <Controller
                      control={control}
                      name="cvv"
                      render={({ field: { value, onChange } }) => (
                        <TextInput
                          value={value}
                          onChangeText={(text) => onChange(formatCVV(text))}
                          keyboardType="number-pad"
                          maxLength={3}
                          secureTextEntry
                          placeholder="CVV"
                          style={styles.input}
                        />
                      )}
                    />
                  </FormInput>
                </View>
              </View>

              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
                style={[styles.saveBtn, !isValid && { opacity: 0.5 }]}
              >
                <Text style={styles.saveText}>Save</Text>
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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#8B572A",
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
    backgroundColor: "#8B572A",
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
