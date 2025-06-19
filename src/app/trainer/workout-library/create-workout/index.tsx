// create-workout.tsx
// create-workout screen
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  SafeAreaView,
} from "react-native";
import { saveWorkout } from "../../../../../services/workout/workoutService";
import ExerciseFormModal from "../../../../trainer/components/create-workout/ExerciseFormModal";
import ExerciseList from "@/trainer/components/create-workout/ExerciseList";
import { Exercise } from "services/workout/workoutTypes";

export default function CreateWorkout() {
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleChangeExercise = (
    index: number,
    field: keyof Exercise,
    value: string
  ) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSaveWorkout = async () => {
    if (!name.trim()) return Alert.alert("Erro", "Informe o nome do treino");
    if (exercises.length === 0) {
      return Alert.alert("Erro", "Adicione pelo menos um exercício");
    }

    const workout = {
      name,
      trainerId: 1,
      exercises: exercises.map((e) => ({
        name: e.name,
        sets: e.sets,
        reps: e.reps,
        rest: e.rest,
        obs: e.obs,
      })),
    };

    try {
      await saveWorkout(workout);
      Alert.alert("Sucesso", "Treino salvo com sucesso!");
      router.back(); // redireciona pra tela anterior
    } catch (error: any) {
      console.error(
        "Erro ao salvar treino:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Falha ao salvar treino.");
    }

    console.log("Treino criado:", workout);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Treino</Text>

      <TextInput
        placeholder="Nome do Treino"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <ExerciseList exercises={exercises} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.addButtonText}>+ Adicionar Exercício</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.saveButtonText}>Salvar Treino</Text>
      </TouchableOpacity>
      
      <ExerciseFormModal 
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={(exercise) => setExercises([...exercises, exercise])}
      />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  exercicioBox: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#444",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#6C4AB6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContent: { // ✅ [ADICIONADO] Corrige erro do ScrollView no Modal
    padding: 16,
    paddingBottom: 60,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
});

