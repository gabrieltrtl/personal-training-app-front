import { Stack } from 'expo-router';

export default function TrainerLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'Área do Personal',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#fff',
      }}
      
    />
  );
}
