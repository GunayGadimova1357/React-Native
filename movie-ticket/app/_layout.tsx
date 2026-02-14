import { Stack } from "expo-router";
import { useEffect } from "react";
import { LogBox } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'A props object containing a "key" prop is being spread into JSX',
      "React keys must be passed directly to JSX without using spread",
    ]);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
