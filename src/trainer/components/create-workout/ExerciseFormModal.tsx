import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  obs?: string;
  rest?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
};

export default function ExerciseFormModal({ visible, onClose, onSave}: Props) {
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    sets: "",
    reps: "",
    obs: "",
    rest: "",
  });

  const handleSave = () => {
    if (!exercise.name || !exercise.sets || !exercise.reps) {
      return alert("Preencha os campos obrigatórios.");
    }

    onSave(exercise);
    setExercise({ name: "", sets: "", reps: "", obs: "", rest: "" });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.title}>Novo Exercício</Text>

          <TextInput
            placeholder="Nome"
            placeholderTextColor="#CCC"
            style={styles.input}
            value={exercise.name}
            onChangeText={(text) => setExercise({ ...exercise, name: text })}
          />
          <TextInput
            placeholder="Séries"
            placeholderTextColor="#CCC"
            keyboardType="numeric"
            style={styles.input}
            value={exercise.sets}
            onChangeText={(text) => setExercise({ ...exercise, sets: text })}
          />
          <TextInput
            placeholder="Repetições"
            placeholderTextColor="#CCC"
            keyboardType="numeric"
            style={styles.input}
            value={exercise.reps}
            onChangeText={(text) => setExercise({ ...exercise, reps: text })}
          />
          <TextInput
            placeholder="Descanso (Opcional)"
            placeholderTextColor="#CCC"
            style={styles.input}
            value={exercise.rest}
            onChangeText={(text) => setExercise({ ...exercise, rest: text })}
          />
          <TextInput
            placeholder="Observações (Opcional)"
            placeholderTextColor="#CCC"
            style={styles.input}
            value={exercise.obs}
            onChangeText={(text) => setExercise({ ...exercise, obs: text })}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 16,
    paddingBottom: 60,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
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
  cancelButton: {
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  cancelButtonText: {
    color: "#444",
    fontWeight: "bold",
  },
});