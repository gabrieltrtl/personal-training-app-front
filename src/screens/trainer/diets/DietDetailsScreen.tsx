import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TrainerStackParamList } from "../../../navigation/TrainerStack";
import { useFetch } from "../../../hooks/useFetch";

type DietDetailsRouteProp = RouteProp<TrainerStackParamList, "DietDetails">;
type Nav = NativeStackNavigationProp<TrainerStackParamList, "MealDetails">;

type Meal = {
  id: number;
  name: string;
};

const DietDetailsScreen = () => {
  const { params } = useRoute<DietDetailsRouteProp>();
  const navigation = useNavigation<Nav>();

  const {
    data: meals,
    loading,
    error,
    refetch,
  } = useFetch<Meal[]>(`/diets/${params.dietId}/meals`);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.muted}>Carregando refeições...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.muted}>Erro ao carregar refeições</Text>
        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.muted}>
          Nenhuma refeição encontrada para esta dieta.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Refeições da dieta {params.dietId}</Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.listItem}
            onPress={() =>
              navigation.navigate("MealDetails", { mealId: item.id })
            }
          >
            <Text style={styles.listItemText}>{item.name}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default DietDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemText: {
    fontSize: 16,
    color: "#111",
  },
  muted: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#6C63FF",
    borderRadius: 6,
    marginTop: 12,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
