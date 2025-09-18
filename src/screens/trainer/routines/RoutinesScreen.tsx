import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../../service/api";
import { FlatList, Pressable } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TrainerStackParamList } from "../../../navigation/TrainerStack";

type Routine = {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
};

type Nav = NativeStackNavigationProp<TrainerStackParamList, "Routines">;

export default function RoutinesScreen() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<Nav>();

  const fetchRoutines = async () => {
    try {
      const res = await api.get<Routine[]>("/workout-routines");
      setRoutines(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Erro ao buscar Workouts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
        <Text>Carregando treinos...</Text>
      </SafeAreaView>
    );
  }

  if (!routines.length) {
    return (
      <SafeAreaView>  
        <Text>Nenhum treino encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={routines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("RoutineDetails", { routineId: item.id })

            }
          >
            <Text>{item.name}</Text>
            {item.description && <Text>{item.description}</Text>}
          </Pressable>
        )}
      />
    </SafeAreaView>
  )
}
