// app/trainer/dashboard/diet-library/DietLibraryScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const mockDiets = [
  { id: '1', name: 'Dieta Cutting' },
  { id: '2', name: 'Dieta Bulking' },
  { id: '3', name: 'Dieta Cetogênica' },
];

interface DietTemplate {
  id: string;
  name: string;
}

export default function DietLibraryScreen() {
  const router = useRouter();

  const handleNewDiet = () => {
    router.push('/trainer/dashboard/diet-library/create'); // rota fictícia por enquanto
  };

  const renderItem = ({ item }: { item: DietTemplate }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => console.log('Editar', item.id)}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Excluir', item.id)}>
          <Text style={[styles.actionText, { color: 'red' }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newButton} onPress={handleNewDiet}>
        <Text style={styles.newButtonText}>+ Nova Dieta</Text>
      </TouchableOpacity>

      <FlatList
        data={mockDiets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  newButton: {
    backgroundColor: '#6C4AB6',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  newButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionText: { color: '#6C4AB6', fontWeight: 'bold' },
});
