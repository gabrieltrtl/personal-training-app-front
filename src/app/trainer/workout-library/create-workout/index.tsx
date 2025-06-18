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

type Workout = {
  name: string;
  sets: string;
  reps: string;
  obs?: string;
  rest?: string;
};

export default function CreateWorkout() {
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState<Workout[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState<Workout>({
    name: "",
    sets: "",
    reps: "",
    obs: "",
    rest: "",
  });

  const router = useRouter();

  const handleSaveExercise = () => {
    if (!newExercise.name || !newExercise.sets || !newExercise.reps) {
      return Alert.alert("Erro", "Preencha os campos obrigatórios");
    }

    setExercises([...exercises, newExercise]); // [ADICIONADO]
    setNewExercise({ name: "", sets: "", reps: "", obs: "", rest: "" }); // [ADICIONADO]
    setShowModal(false); // [ADICIONADO]
  };

  // const handleAddExercise = () => {
  //   setExercises([
  //     ...exercises,
  //     { name: "", sets: "", reps: "", obs: "", rest: "" },
  //   ]);
  // };

  const handleChangeExercise = (
    index: number,
    field: keyof Workout,
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
        sets: parseInt(e.sets),
        reps: parseInt(e.reps),
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

      {exercises.map((ex, index) => (
        <View key={index} style={styles.exercicioBox}>
          <Text style={styles.subTitle}>
            {index + 1}. {ex.name} - {ex.sets}x{ex.reps}
          </Text>
          {ex.obs ? <Text>Obs: {ex.obs}</Text> : null}
          {ex.rest ? <Text>Descanso: {ex.rest}</Text> : null}
        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.addButtonText}>+ Adicionar Exercício</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.saveButtonText}>Salvar Treino</Text>
      </TouchableOpacity>

      {/* Modal com SafeAreaView para corrigir área segura do iPhone */}
      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          {/* ✅ [ADICIONADO] Respeita notch */}
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>Novo Exercício</Text>

            <TextInput
              placeholder="Nome"
              placeholderTextColor={'#CCC'}
              style={styles.input}
              value={newExercise.name}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, name: text })
              }
            />
            <TextInput
              placeholder="Séries"
              placeholderTextColor={'#CCC'}
              style={styles.input}
              keyboardType="numeric"
              value={newExercise.sets}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, sets: text })
              }
            />
            <TextInput
              placeholder="Repetições"
              placeholderTextColor={'#CCC'}
              style={styles.input}
              keyboardType="numeric"
              value={newExercise.reps}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, reps: text })
              }
            />
            <TextInput
              placeholder="Descanso (Opcional)"
              placeholderTextColor={'#CCC'}
              style={styles.input}
              value={newExercise.rest}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, rest: text })
              }
            />
            <TextInput
              placeholder="Observações (Opcional)"
              placeholderTextColor={'#CCC'}
              style={styles.input}
              value={newExercise.obs}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, obs: text })
              }
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveExercise}
            >
              <Text style={styles.saveButtonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addButton, { marginTop: 12 }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.addButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        {/* ✅ [ADICIONADO] Fecha o SafeAreaView */}
      </Modal>
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

