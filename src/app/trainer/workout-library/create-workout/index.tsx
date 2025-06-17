import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  obs?: string;
  rest?: string;
};

export default function CreateWorkout() {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: '', reps: '', obs: '', rest: ''}
  ]);

  const router = useRouter();

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', obs: '', rest: ''}])
  }

  const handleChangeExercise = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises)
  }

  const handleSaveWorkout = () => {
    if (!name.trim()) return Alert.alert('Erro', 'Informe o nome do treino')
    if (exercises.some(e => !e.name || !e.sets || !e.reps)) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios dos exercícios');
    }
  }

  const workout = {
    name,
    exercises: exercises.map(e => ({
      name: e.name,
      set: parseInt(e.sets),
      reps: parseInt(e.reps),
      rest: e.rest,
      obs: e.obs
    }))
  }

  console.log('Treino criado:', workout);
    // Aqui você pode fazer o POST pro backend

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Treino</Text>

      <TextInput 
        placeholder="Nome do Treino"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {exercises.map((exercise, index) => (
        <View key={index} style={styles.exercicioBox}>
          <Text style={styles.subTitle}>Exercício {index + 1}</Text>
          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={exercise.name}
            onChangeText={(text) => { handleChangeExercise(index, 'name', text)}}
          />
          <TextInput
            placeholder="Séries"
            style={styles.input}
            keyboardType="numeric"
            value={exercise.sets}
            onChangeText={(text) => handleChangeExercise(index, 'sets', text)}
          />
          <TextInput
            placeholder="Repetições"
            style={styles.input}
            keyboardType="numeric"
            value={exercise.reps}
            onChangeText={(text) => handleChangeExercise(index, 'reps', text)}
          />
          <TextInput
            placeholder="Observações (Opcional)"
            style={styles.input}
            value={exercise.obs}
            onChangeText={(text) => handleChangeExercise(index, 'obs', text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleSaveWorkout}>
        <Text style={styles.addButtonText}>+ Adicionar Exercício</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.saveButtonText}>Salvar Treino</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  subTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 8
  },
  exercicioBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  addButton: {
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  addButtonText: {
    color: '#444',
    fontWeight: 'bold'
  },
  saveButton: {
    backgroundColor: '#6C4AB6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});