import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const loadUsers = useAuthStore((s) => s.loadUsers);

  useEffect(() => {
    loadUsers();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
