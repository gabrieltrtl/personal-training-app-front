import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";

interface Food {
  id: number;
  name: string;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: number;
}

interface AddFoodModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectFood: (food: Food, amount: number) => void;
  onCreateFood: () => void;
}

export default function AddFoodModal({
  visible,
  onClose,
  onSelectFood,
  onCreateFood,
}: AddFoodModalProps) {
  const { data: foods, loading, error } = useFetch<Food[]>("/foods/my");

  const [selectedFood, setSelectedFood] = useState<Food | null>(null); // ✅ guarda o alimento escolhido
  const [amount, setAmount] = useState(""); // ✅ input de quantidade

  const handleConfirm = () => {
    if (selectedFood) {
      const value = Number(amount) || selectedFood.portion;
      onSelectFood(selectedFood, value);
      setSelectedFood(null); // reseta
      setAmount("");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Meus Alimentos</Text>

        {/* Se ainda não escolheu alimento → lista */}
        {!selectedFood ? (
          <>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text>Erro ao carregar alimentos.</Text>}

            <FlatList
              data={foods || []}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.foodItem}
                  onPress={() => setSelectedFood(item)}
                >
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodMacros}>
                    {`${item.carbs}C ${item.protein}P ${item.fat}G / ${item.portion}${item.unit}`}
                  </Text>
                </Pressable>
              )}
              ListEmptyComponent={
                !loading ? <Text>Nenhum alimento cadastrado.</Text> : null
              }
            />

            <Pressable style={styles.createButton} onPress={onCreateFood}>
              <Text style={styles.createButtonText}>+ Criar novo alimento</Text>
            </Pressable>
          </>
        ) : (
          // Se já escolheu alimento → pede quantidade
          <View style={styles.amountContainer}>
            <Text style={styles.foodName}>
              {`Selecionado: ${selectedFood.name}`}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={`Quantidade em ${selectedFood.unit}`}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </Pressable>
            <Pressable
              style={styles.backButton}
              onPress={() => setSelectedFood(null)}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
          </View>
        )}

        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  foodItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  foodName: { fontSize: 16, fontWeight: "600", color: "#111" },
  foodMacros: { fontSize: 13, color: "#666", marginTop: 2 },
  createButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#6C63FF",
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  amountContainer: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  confirmButtonText: { color: "#fff", fontWeight: "600" },
  backButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: { color: "#111" },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: { fontSize: 14, color: "#111" },
});
