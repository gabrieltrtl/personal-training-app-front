import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import { useRouter } from "expo-router";
import ExerciseList from '../../../../trainer/components/create-workout/ExerciseList';
import ExerciseFormModal from '../../../../trainer/components/create-workout/ExerciseFormModal';
import { Exercise } from "services/workout/workoutTypes";

export default function AddWorkoutToRoutine() {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  
}
