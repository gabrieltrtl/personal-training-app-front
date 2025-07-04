import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

interface Meal {
  id: string;
  name: string;
}

export default function MealListScreen() {
  const router = useRouter();
  const { dietId } = useLocalSearchParams();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    try {
      const response = await axios.get(`http://192.168.1.2:3000/diets/${dietId}`);
      setMeals(response.data.meals);
    } catch (err) {
      console.error('Erro ao buscar refeições:', err);
      Alert.alert('Erro', 'Não foi possível carregar as refeições.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);
}
