import React, { useState } from "react";
import { Alert } from 'react-native'
import { useRouter } from "expo-router";

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  obs?: string;
  rest?: string;
};

export default function CreateWorkout() {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: '', reps: '', obs: '', rest: ''}
  ]);

  const router = useRouter();

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', obs: '', rest: ''}])
  }

  const handleChangeExercise = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises)
  }

  const handleSaveWorkout = () => {
    if (!name.trim()) return Alert.alert('Erro', 'Informe o nome do treino')
    if (exercises.some(e => !e.name || e.sets || e.reps)) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios dos exercícios');
    }
  }

  const workout = {
    name,
    exercises: exercises.map(e => ({
      name: e.name,
      set: parseInt(e.sets),
      reps: parseInt(e.reps),
      rest: e.rest,
      obs: e.obs
    }))
  }

  console.log('Treino criado:', workout);
    // Aqui você pode fazer o POST pro backend

  return (
    <>
    
    </>
  )
}