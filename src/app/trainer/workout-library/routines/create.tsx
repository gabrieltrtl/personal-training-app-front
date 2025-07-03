import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function CreateWorkoutRoutineStep1() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNext = async () => {
    if (!name.trim()) {
      return Alert.alert("Erro", "Informe o nome da rotina");
    }

    try {
      const response = await axios.post("http://192.168.1.2:3000/workout-routines", {
        name,
        trainerId: 4, // 🔧 Substituir depois com ID dinâmico do treinador autenticado
      });

      const routineId = response.data.id;

      // Vai para próxima etapa passando o ID da rotina recém-criada

      router.push(`/trainer/workout-library/routines/${routineId}`);
    } catch (error: any) {
      console.error("Erro ao criar rotina:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível criar a rotina.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Rotina</Text>

      <TextInput
        placeholder="Nome da Rotina"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, alignSelf: "center" },
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
