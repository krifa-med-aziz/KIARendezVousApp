import { Tabs } from "expo-router";
import { Calendar, Car, Home, User } from "lucide-react-native";

export default function MainTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#93001B",
        tabBarInactiveTintColor: "#71717A",
        tabBarStyle: {
          borderTopColor: "#F4F4F5",
          backgroundColor: "#FFFFFF",
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ color }) => (
            <Home size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicles"
        options={{
          title: "VEHICLES",
          tabBarIcon: ({ color }) => (
            <Car size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "BOOKINGS",
          tabBarIcon: ({ color }) => (
            <Calendar size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "PROFILE",
          tabBarIcon: ({ color }) => (
            <User size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}
