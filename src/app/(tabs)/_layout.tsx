import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

const tabs = {
  dashboard: { label: "Accueil", icon: "view-dashboard-outline" },
  students: { label: "Élèves", icon: "account-group-outline" },
  messages: { label: "Messages", icon: "message-text-outline" },
  settings: { label: "Réglages", icon: "cog-outline" },
} as const;

export default function TabsLayout() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <View className="flex-1 items-center justify-center bg-[#f7faf8]"><ActivityIndicator color="#13786c" /></View>;
  if (!user) return <Redirect href="/login" />;
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#13786c",
        tabBarInactiveTintColor: "#8a9a97",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e7eeeb",
          height: 82,
          paddingBottom: 14,
          paddingTop: 8,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            color={color}
            name={tabs[route.name as keyof typeof tabs]?.icon ?? "circle-outline"}
            size={size}
          />
        ),
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: tabs.dashboard.label }} />
      <Tabs.Screen name="students" options={{ title: user.role === "PARENT" ? "Enfants" : tabs.students.label }} />
      <Tabs.Screen name="messages" options={{ title: tabs.messages.label, tabBarBadge: 2 }} />
      <Tabs.Screen name="settings" options={{ title: tabs.settings.label }} />
    </Tabs>
  );
}