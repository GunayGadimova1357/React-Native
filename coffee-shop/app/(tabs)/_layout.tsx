import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const ACTIVE = "#8B572A";
const INACTIVE = "#F3F3F3";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 78,
          backgroundColor: "rgba(0,0,0,0.35)",
          borderTopWidth: 0,
          position: "absolute",
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={26}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={26}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={26}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
