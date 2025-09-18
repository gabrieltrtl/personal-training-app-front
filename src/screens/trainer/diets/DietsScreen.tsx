import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TrainerStackParamList } from "../../../navigation/TrainerStack";
import api from "../../../service/api";
import { useFetch } from "../../../hooks/useFetch";

type Diet = {
  id: number;
  name: string;
};

type Nav = NativeStackNavigationProp<TrainerStackParamList, "DietDetails">;

const DietsScreen = () => {
  const navigation = useNavigation<Nav>();

  const { data: diets, loading, error, refetch } = useFetch<Diet[]>("/diets");

  if (loading) {
  return (
    <SafeAreaView style={styles.errorContainer}>
      <ActivityIndicator size="large" color="#6C63FF" />
      <Text style={styles.errorText}>Carregando dietas...</Text>
    </SafeAreaView>
  );
}

if (error) {
  return (
    <SafeAreaView style={styles.errorContainer}>
      <Text style={styles.errorText}>Erro ao carregar dietas</Text>
      <Pressable style={styles.retryButton} onPress={refetch}>
        <Text style={styles.retryButtonText}>Tentar novamente</Text>
      </Pressable>
    </SafeAreaView>
  );
}

if (!diets || diets.length === 0) {
  return (
    <SafeAreaView style={styles.errorContainer}>
      <Text style={styles.emptyText}>Nenhuma dieta encontrada.</Text>
    </SafeAreaView>
  );
}

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Biblioteca de Dietas</Text>
    <FlatList
      data={diets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          style={styles.listItem}
          onPress={() => navigation.navigate("DietDetails", { dietId: item.id })}
        >
          <Text style={styles.listItemText}>{item.name}</Text>
        </Pressable>
      )}
    />
  </SafeAreaView>
);

};

export default DietsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // fundo clean
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111", // texto principal
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee", // separador sutil
  },
  listItemText: {
    fontSize: 16,
    color: "#111",
  },
  emptyText: {
    fontSize: 14,
    color: "#666", // muted
    textAlign: "center",
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#6C63FF", // cor primária
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
