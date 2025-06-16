// app/client/trainer/dashboard/_layout.tsx
import { Tabs } from "expo-router";
import { Text } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function TrainerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6C4AB6",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          tabBarLabel: 'Home'
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
          tabBarLabel: 'Alunos'
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
          tabBarLabel: 'Configurações'
        }}
      />
    </Tabs>
  );
}
