import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { TrainerStackParamList } from "../../../navigation/TrainerStack";
import { useFetch } from "../../../hooks/useFetch";

type WorkoutDetailsRouteProp = RouteProp<
  TrainerStackParamList,
  "WorkoutDetails"
>;

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  rest?: string;
  obs?: string;
};

export default function WorkoutDetailsScreen() {
  const { params } = useRoute<WorkoutDetailsRouteProp>();

  // Generic Hook
  const {
    data: exercises,
    loading,
    error,
    refetch,
  } = useFetch<Exercise[]>(`/exercises/workout/${params.workoutId}`);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
        <Text>Carregando exercícios...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Erro ao carregar exercícios</Text>
        <Pressable>
          <Text>Tentar novamente</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!exercises || exercises.length === 0) {
    return (
      <SafeAreaView>
        <Text>Nenhum exercício encontrado para este workout.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Exercícios do workout {params.workoutId}</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>
              {item.sets} séries x {item.reps} reps
            </Text>
            {item.rest && <Text>Descanso: {item.rest}</Text>}
            {item.obs && <Text>Obs: {item.obs}</Text>}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
