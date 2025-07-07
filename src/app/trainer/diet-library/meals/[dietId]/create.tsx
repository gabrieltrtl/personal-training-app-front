import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function CreateMealScreen() {
  const { dietId } = useLocalSearchParams();
  const router = useRouter();
  const [mealName, setMealName] = useState('');

  const handleCreateMeal = async () => {
    if(!mealName.trim()) {
      return Alert.alert('Erro', 'Informe o nome da refeição.');
    }

    try {
      const response = await axios.post('http://192.168.1.6:3000/meals', {
        name: mealName,
        dietId: Number(dietId),
      });


      const mealId = response.data.id;
      router.replace(`/trainer/diet-library/meals/${mealId}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar a refeição.');
    }
  };

  return (
    <View>
      
    </View>
  )
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