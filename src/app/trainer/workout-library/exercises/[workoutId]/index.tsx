import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { Exercise } from "services/workout/workoutTypes";
import Btn from "@/trainer/components/buttons/btn";
import DraggableFlatList, {
  DraggableFlatListProps,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

export default function ViewExercises() {
  const { workoutId } = useLocalSearchParams();

  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.2:3000/workouts/${workoutId}`
        );
        setExercises(res.data.exercises || []);
      } catch (err) {
        console.error("Erro ao buscar exercícios:", err);
      }
    };

    if (workoutId) {
      fetchExercises();
    }
  }, [workoutId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercícios do Treino</Text>

      <DraggableFlatList
        data={exercises}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        onDragEnd={({ data }) => setExercises(data)}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum exercício adicionado.</Text>
        }
        renderItem={({ item, drag, isActive }) => (
          <TouchableOpacity
            style={[styles.card, isActive && { backgroundColor: "#e0e0e0" }]}
            onLongPress={drag}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>
              {item.sets}x{item.reps} - Descanso: {item.rest || "N/A"}
            </Text>
            {item.obs && <Text style={styles.obs}>Obs: {item.obs}</Text>}
          </TouchableOpacity>
        )}
      />
      <Btn
        title="Adicionar Exercício"
        onPress={() =>
          router.push(`/trainer/workout-library/exercises/${workoutId}/create`)
        }
      ></Btn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyText: { textAlign: "center", marginTop: 40, color: "#888" },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { marginTop: 4, color: "#555" },
  obs: { marginTop: 4, fontStyle: "italic", color: "#777" },
});
