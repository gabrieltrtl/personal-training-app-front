import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  Pressable,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../../service/api";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TrainerStackParamList } from "../../../navigation/TrainerStack";

type Nav = NativeStackNavigationProp<TrainerStackParamList, "CreateFood">;

export default function CreateFoodScreen() {
  const navigation = useNavigation<Nav>();

  const [name, setName] = useState("");
  const [portion, setPortion] = useState("100");
  const [unit, setUnit] = useState("g");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [calories, setCalories] = useState("");

  const calculatedCalories = useMemo(() => {
    const proteinNum = Number(protein) || 0;
    const carbsNum = Number(carbs) || 0;
    const fatsNum = Number(fat) || 0;

    return carbsNum * 4 + proteinNum * 4 + fatsNum * 9;
  }, [protein, carbs, fat]);

  const handleCreateFood = async () => {
    if (!name || !portion || !protein || !carbs || !fat || !unit) {
      Alert.alert("Erro", "Preencha os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/foods", {
        name,
        unit,
        portion: Number(portion),
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fat: Number(fat) || 0,
        calories: calculatedCalories,
      });

      Alert.alert("Sucesso", "Alimento cadastrado com sucesso!");
      navigation.goBack(); // volta para MealDetails ou para onde você chamou
    } catch (error) {
      console.error("Erro ao criar alimento", error);
      Alert.alert("Erro", "Não foi possível criar o alimento");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Cadastrar Alimento</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Peito de Frango"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 2, marginRight: 8 }]}
          placeholder="Ex: 100"
          keyboardType="numeric"
          value={portion}
          onChangeText={setPortion}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="g"
          value={unit}
          onChangeText={setUnit}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Carbs (g)"
        keyboardType="numeric"
        value={carbs}
        onChangeText={setCarbs}
      />
      <TextInput
        style={styles.input}
        placeholder="Protein (g)"
        keyboardType="numeric"
        value={protein}
        onChangeText={setProtein}
      />
      <TextInput
        style={styles.input}
        placeholder="Fat (g)"
        keyboardType="numeric"
        value={fat}
        onChangeText={setFat}
      />

      <Text style={styles.previewCalories}>
        {`Calorias Estimadas: ${calculatedCalories} Kcal`}
      </Text>

      <Pressable style={styles.saveButton} onPress={handleCreateFood}>
        <Text style={styles.saveButtonText}>+ Salvar Alimento</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#111",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#111",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  previewCalories: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginTop: 4,
    marginBottom: 16,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
