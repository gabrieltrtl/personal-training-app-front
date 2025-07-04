import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";

// 🟩 Adicionado: import da lib de drag and drop
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

interface Workout {
  id: string;
  name: string;
  exercises: number;
}

export default function ViewWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const router = useRouter();
  const { routineId } = useLocalSearchParams();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.2:3000/workouts/routine/${routineId}`
        );

        // 🟡 Alterado: ordenar por ordem de criação (ID crescente)
        const sorted = res.data.sort(
          (a: any, b: any) => Number(a.id) - Number(b.id)
        );

        setWorkouts(sorted);
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
      }
    };

    if (routineId) {
      fetchWorkouts();
    }
  }, [routineId]);

  const handleAddWorkout = () => {
    router.push(`/trainer/workout-library/workouts/${routineId}/create`);
  };

  const handleFinishRoutine = () => {
    if (workouts.length === 0) {
      return Alert.alert("Erro", "Adicione pelo menos um treino.");
    }
    Alert.alert("Sucesso", "Rotina finalizada com sucesso!");
    router.push("/trainer/workout-library");
  };

  // 🟩 Adicionado: componente para renderizar item com suporte a drag
  const renderItem = ({ item, drag }: RenderItemParams<Workout>) => (
    <TouchableOpacity
      style={styles.card}
      onLongPress={drag} // 🟩 Adicionado suporte ao drag
      onPress={() =>
        router.push(`/trainer/workout-library/exercises/${item.id}`)
      }
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>
        {Array.isArray(item.exercises)
          ? `${item.exercises.length} exercício(s)`
          : `${item.exercises} exercício(s)`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treinos da Rotina</Text>

      {/* 🟩 Substituído FlatList por DraggableFlatList */}
      <DraggableFlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()} // 🟩
        onDragEnd={({ data }) => setWorkouts(data)} // 🟩
        renderItem={renderItem} // 🟩
        contentContainerStyle={{ paddingBottom: 100 }} // 🟩
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
        <Text style={styles.addButtonText}>+ Adicionar Treino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.finishButton}
        onPress={handleFinishRoutine}
      >
        <Text style={styles.finishButtonText}>Finalizar Rotina</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardSubtitle: { color: "#777", marginTop: 4 },
  addButton: {
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: { color: "#444", fontWeight: "bold" },
  finishButton: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  finishButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
