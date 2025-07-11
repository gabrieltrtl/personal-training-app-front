import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateMealScreen() {
  const { dietId } = useLocalSearchParams();
  const router = useRouter();
  const [mealName, setMealName] = useState('');

  const handleCreateMeal = async () => {
    console.log('dietId recebido:', dietId); 
    if (!mealName.trim()) {
      return Alert.alert('Erro', 'Informe o nome da refeição.');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token); // 👈 token salvo após login

      if (!token) {
        return Alert.alert('Erro', 'Usuário não autenticado.');
      }

      const response = await axios.post(
        'http://192.168.1.6:3000/meal', // mantido singular, conforme seu controller
        {
          name: mealName,
          dietId: Number(dietId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 token enviado corretamente
          },
        }
      );

      const mealId = response.data.id;
      router.push(`/trainer/diet-library/meals/${dietId}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar a refeição.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Refeição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Café da Manhã"
        value={mealName}
        onChangeText={setMealName}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateMeal}>
        <Text style={styles.buttonText}>Criar Refeição</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6C4AB6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});