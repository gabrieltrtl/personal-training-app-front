import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Exercise } from 'services/workout/workoutTypes';

type Props = {
  exercises: Exercise[];
}

export default function ExerciseList({ exercises }: Props) {

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