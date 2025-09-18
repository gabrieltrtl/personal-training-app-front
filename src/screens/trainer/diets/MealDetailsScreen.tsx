import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { useFetch } from "../../../hooks/useFetch";
import { useState } from "react";
import AddFoodModal from "./AddFoodModal";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TrainerStackParamList } from "../../../navigation/TrainerStack";
import api from "../../../service/api";

interface Food {
  id: number;
  name: string;
  unit?: string;
  carbs?: number;
  protein?: number;
  fat?: number;
}

interface MealFood {
  id: number;
  amount: string;
  food: Food;
}

interface Meal {
  id: number;
  name: string;
  mealFoods: MealFood[];
}

type MealDetailRouteProp = RouteProp<
  { MealDetails: { mealId: number } },
  "MealDetails"
>;

type Nav = NativeStackNavigationProp<TrainerStackParamList>;

const MealDetailsScreen = () => {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<MealDetailRouteProp>();
  const { mealId } = params;

  console.log("MealId vindo da rota:", mealId);

  const {
    data: meal,
    loading,
    error,
    refetch,
  } = useFetch<Meal>(`/meal/${mealId}`);

  console.log("URL chamada:", `/meal/${mealId}`);

  const [showModal, setShowModal] = useState(false);

  const handleSelectFood = async (food: Food, amount: number) => {
    try {
      await api.post("/meal-food", {
        mealId,
        foodId: food.id,
        amount,
      });
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error("Erro ao associar alimento:", err);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.muted}>Carregando refeição...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.muted}>
          Erro ao carregar os detalhes da refeição.
        </Text>
        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!meal) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.muted}>Nenhuma refeição encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{meal.name}</Text>

      <FlatList
        data={meal.mealFoods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodName}>{item.food.name}</Text>
            <Text style={styles.foodAmount}>{item.amount}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.muted}>Nenhum alimento adicionado.</Text>
        }
      />

      <Pressable style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Alimento</Text>
      </Pressable>

      {/* Modal */}
      <AddFoodModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelectFood={handleSelectFood}
        onCreateFood={() => {
          console.log("ir para criar alimento");
          setShowModal(false);
          navigation.navigate("CreateFood");
        }}
      />
    </SafeAreaView>
  );
};

export default MealDetailsScreen;

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
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  foodName: {
    fontSize: 16,
    color: "#111",
  },
  foodAmount: {
    fontSize: 14,
    color: "#666",
  },
  muted: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  retryButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#6C63FF",
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
