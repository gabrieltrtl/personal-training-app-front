import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert,  } from 'react-native';
import { getWorkoutById, updateWorkout } from 'services/workout/workoutService';
import { Exercise } from 'services/workout/workoutTypes';
import ExerciseFormModal from '../../../../trainer/components/create-workout/ExerciseFormModal'

export default function EditWorkout()  {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    try {
      const data = await getWorkoutById(id);
      setName(data.name);
      setExercises(Array.isArray(data.exercises) ? data.exercises : []);
    } catch (error) {
      Alert.alert('Erro','Falha ao carregar treino.');
    }
  };

  const handleSaveWorkout = async () => {
    if (!name.trim()) return Alert.alert('Erro', 'Informe o nome do treino');
    if (exercises.some(e => !e.name || !e.sets || !e.reps)) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios dos exercícios');
    }

    try {
      await updateWorkout(id, { name, exercises });
      Alert.alert('Sucesso', 'Treino atualizado com sucesso!');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar treino.');
    }
  };

  const handleEditExercise = (index: number) => {
    setEditingExerciseIndex(index);
    setModalVisible(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome do Treino</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome do treino"
      />

      <Text style={styles.label}>Exercícios</Text>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseItem}>
          <Text>{exercise.name} - {exercise.sets}x{exercise.reps}</Text>
          <TouchableOpacity onPress={() => handleEditExercise(index)}>
            <Text style={styles.editButton}>Editar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Adicionar Exercício</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSaveWorkout} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <ExerciseFormModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingExerciseIndex(null);
        }}
        onSave={(newExercise) => {
          if (editingExerciseIndex !== null) {
            setExercises(prev => {
              const updated = [...prev];
              updated[editingExerciseIndex] = newExercise;
              return updated;
            });
          } else {
            setExercises(prev => [...prev, newExercise]);
          }
          setModalVisible(false);
          setEditingExerciseIndex(null);
        }}
        initialData={editingExerciseIndex !== null ? exercises[editingExerciseIndex] : null}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  exerciseItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
  },
  editButton: {
    color: '#007bff',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 6,
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
