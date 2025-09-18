import { Text, SafeAreaView, ActivityIndicator, Pressable, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { TrainerStackParamList } from "../../../navigation/TrainerStack";
import { useFetch } from "../../../hooks/useFetch";

type RoutineDetailsRouteProp = RouteProp<
  TrainerStackParamList,
  "RoutineDetails"
>;
type Nav = NativeStackNavigationProp<TrainerStackParamList, "RoutineDetails">;

type Workout = {
  id: number;
  name: string;
  description?: string;
};

export default function RoutineDetailsScreen() {
  const { params } = useRoute<RoutineDetailsRouteProp>();
  const navigation = useNavigation<Nav>();

  const {
    data: workouts,
    loading,
    error,
    refetch,
  } = useFetch<Workout[]>(`workout-routines/${params.routineId}/workouts`);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
        <Text>Carregando workouts...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Erro ao buscar workouts</Text>
        <Pressable onPress={refetch}>
          <Text style={{ color: "blue" }}>Tentar novamente</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!workouts || workouts.length === 0) {
    return (
      <SafeAreaView>
        <Text>Nenhum workout encontrado para esta rotina.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Workouts da Rotina {params.routineId}</Text>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('WorkoutDetails', { workoutId: item.id })}
          >
            <Text>{item.name}</Text>
            {item.description && (
              <Text>{item.description}</Text>
            )}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
