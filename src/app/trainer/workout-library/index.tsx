import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { deleteWorkout } from "../../../../services/workout/workoutService";

export default function WorkoutLibrary() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [workouts, setWorkouts] = useState<WorkoutTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  interface WorkoutTemplate {
    id: string;
    name: string;
  }

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://192.168.1.2:3000/workouts");
      setWorkouts(response.data);
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchWorkouts();
    }
  }, [isFocused]);

  const handleNewWorkout = () => {
    router.push("/trainer/workout-library/create-workout"); // rota fictícia por enquanto
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkout(id);
      setWorkouts((prev) => prev.filter((w) => w.id.toString() !== id));
    } catch (error) {
      console.error("Erro ao excluir treino:", error);
    }
  };

  const renderItem = ({ item }: { item: WorkoutTemplate }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() =>
            router.push(`/trainer/workout-library/update-workout/${item.id}`)
          }
        >
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Confirmar exclusão",
              "Deseja realmente excluir este treino?",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Excluir",
                  style: "destructive",
                  onPress: () => handleDelete(item.id.toString()), // aqui vai a função
                },
              ]
            )
          }
        >
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
        data={workouts}
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
