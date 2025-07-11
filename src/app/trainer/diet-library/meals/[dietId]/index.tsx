import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

interface FoodItem {
  food: string;
  amount: string;
}

interface Meal {
  id: string;
  name: string;
  items: FoodItem[];
}

export default function MealListScreen() {
  const router = useRouter();
  const { dietId } = useLocalSearchParams();
  const [dietName, setDietName] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const fetchMeals = async () => {
    try {
      const response = await axios.get(`http://192.168.1.6:3000/diets/${dietId}`);
      setMeals(response.data.meal);
      setDietName(response.data.name);
    } catch (err: any) {
      console.error('❌ Erro ao buscar refeições:', err.response?.data || err.message || err);
      Alert.alert('Erro', 'Não foi possível carregar as refeições.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dietId) {
      fetchMeals();
    }
  }, [dietId]);

  const handleAddMeal = () => {
    console.log('Adicionar nova refeição para dieta:', dietId);
    if (dietId) {
      router.push(`/trainer/diet-library/meals/${dietId}/create`);
    }
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        console.log('ID da dieta clicada:', item.id);
        router.push(`/trainer/diet-library/meals/${item.id}`);
      }}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    console.log('Parâmetros recebidos:', params);
  }, []);

  return (
    <View style={styles.container}>
      {dietName && <Text style={styles.dietTitle}>{dietName}</Text>}
      <TouchableOpacity style={styles.newButton} onPress={handleAddMeal}>
        <Text style={styles.newButtonText}>+ Adicionar Refeição</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#6C4AB6" />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
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
    backgroundColor: '#F1F1F1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  dietTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
});
