import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const mockWorkouts = [
  { id: '1', name: 'Treino Cutting' },
  { id: '2', name: 'Treino Bulking' },
  { id: '3', name: 'Treino Funcional' },
];

export default function WorkoutLibrary() {
  const router = useRouter();

  interface WorkoutTemplate {
    id: string;
    name: string;
  }

  const handleNewWorkout = () => {
    router.push("/trainer/workout-library/create-workout"); // rota fictícia por enquanto
  };

  const renderItem = ({ item }: { item: WorkoutTemplate }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => console.log("Editar", item.id)}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Excluir", item.id)}>
          <Text style={[styles.actionText, { color: "red" }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newButton} onPress={handleNewWorkout}>
        <Text style={styles.newButtonText}>+ Novo Treino</Text>
      </TouchableOpacity>

      <FlatList
        data={mockWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  newButton: {
    backgroundColor: "#6C4AB6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  newButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  card: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  actionText: { color: "#6C4AB6", fontWeight: "bold" },
});
