import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "location" : "location-outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "heart" : "heart-outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "notifications" : "notifications-outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? "person" : "person-outline"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  focused,
  icon,
}: {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.activeIcon]}>
      <Ionicons name={icon} size={22} color={focused ? "#F97316" : "#9CA3AF"} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 78,
    paddingBottom: 16,
    paddingTop: 12,
    borderTopWidth: 0,
    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  activeIcon: {
    backgroundColor: "#FFF1E6",
  },
});
