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
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

interface WorkoutRoutine {
  id: string;
  name: string;
}

export default function WorkoutRoutineLibrary() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [routines, setRoutines] = useState<WorkoutRoutine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.6:3000/workout-routines"
      );
      setRoutines(response.data);
    } catch (error: any) {
      console.error(
        "Erro ao buscar rotinas:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchRoutines();
    }
  }, [isFocused]);

  const handleDelete = async (id: string) => {
    Alert.alert("Excluir Rotina", "Deseja realmente excluir esta rotina?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(
              `http://192.168.1.6:3000/workout-routines/${id}`
            );
            setRoutines((prev) => prev.filter((r) => r.id !== id));
          } catch (error) {
            console.error("Erro ao excluir rotina:", error);
          }
        },
      },
    ]);
  };

  const handleNewRoutine = () => {
    router.push("/trainer/workout-library/routines/create");
  };

  const renderItem = ({ item }: { item: WorkoutRoutine }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push(`/trainer/workout-library/routines/${item.id}`)
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
          >
            <Text style={styles.actionDelete}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biblioteca de Treinos</Text>

      <TouchableOpacity style={styles.newButton} onPress={handleNewRoutine}>
        <Text style={styles.newButtonText}>+ Nova Rotina</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFFFFF" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
    textAlign: "center",
  },
  newButton: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  newButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#F4F4F4",
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    // ✅ ADICIONADO: nova view para alinhar nome + excluir
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#222",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
  actionEdit: {
    color: "#555",
    fontWeight: "500",
    fontSize: 14,
  },
  actionDelete: {
    color: "#C00",
    fontWeight: "500",
    fontSize: 14,
  },
});
