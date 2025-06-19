import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Exercise } from 'services/workout/workoutTypes';

type Props = {
  exercises: Exercise[];
}

export default function ExerciseList({ exercises }: Props) {
  if (exercises.length === 0) {
    return (
      <Text style={styles.emptyText}>
        Nenhum exercício adicionado ainda.
      </Text>
    );
  }

  return (
    <View style={styles.listContainer}>
      {exercises.map((ex, index) => (
        <View key={index} style={styles.exercicioBox}>
          <Text style={styles.subTitle}>
            {index + 1}. {ex.name} - {ex.sets}x{ex.reps}
          </Text>
          {ex.obs ? <Text>Obs: {ex.obs}</Text> : null}
          {ex.rest ? <Text>Descanso: {ex.rest}</Text> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 12,
  },
  exercicioBox: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  emptyText: {
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginVertical: 12,
  },
});