import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function AddExercise() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [obs, setObs] = useState("");

  const handleSave = () => {
    if (!name.trim() || !sets || !reps) {
      return Alert.alert("Erro", "Preencha os campos obrigatórios.");
    }

    const exercise = {
      name,
      sets: Number(sets),
      reps: Number(reps),
      rest,
      obs,
    };

    console.log("Exercício Salvo:", exercise);

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Exercício</Text>

      <TextInput
        placeholder="Nome do Exercício"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Séries (sets)"
        style={styles.input}
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
      />
      <TextInput
        placeholder="Repetições (reps)"
        style={styles.input}
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />
      <TextInput
        placeholder="Descanso"
        style={styles.input}
        value={rest}
        onChangeText={setRest}
      />
      <TextInput
        placeholder="Observações"
        style={styles.input}
        value={obs}
        onChangeText={setObs}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Exercício</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 80,
  },
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
    padding: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#111",
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
});
