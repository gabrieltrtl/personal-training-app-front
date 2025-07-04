// app/_layout.tsx
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // ✨ import obrigatório para gestos

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* 🧠 necessário para reconhecer gestos como drag-and-drop */}
      <Stack
        screenOptions={{
          headerShown: false, // 🙈 escondendo o header padrão
        }}
      />
    </GestureHandlerRootView>
  );
}
