import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function CreateWorkout() {
  const [name, setName] = useState("");
  const router = useRouter();
  const { routineId } = useLocalSearchParams();

  const handleCreateWorkout = async () => {
    if (!name.trim()) {
      return Alert.alert("Erro", "Informe o nome do treino.");
    }

    try {
      console.log("routineId vindo da URL:", routineId);
      console.log("typeof routineId:", typeof routineId);
      console.log("Number(routineId):", Number(routineId));
      const payload: any = {
        name,
        trainerId: 4,
        exercises: [],
      };

      if (!isNaN(Number(routineId))) {
        payload.routineId = Number(routineId); // ✅ só envia se for número válido
      }

      const response = await axios.post(
        "http://192.168.1.2:3000/workouts",
        payload
      );

      const workoutId = response.data.id;

      console.log("Workout ID gerado:", workoutId);
      router.push(`/trainer/workout-library/exercises/${workoutId}/create`);
    } catch (error: any) {
      console.error(
        "Erro ao criar treino:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possível criar o treino.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Treino</Text>

      <TextInput
        placeholder="Ex: Treino A - Peito e Tríceps"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateWorkout}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
