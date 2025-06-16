import React from "react";
import GenericCard from '../../../common/GenericCard';
import { useRouter } from "expo-router";

export default function ActiveStudentsCard() {
  // Número fixo para teste
  const totalActive = 35;

  const router = useRouter();

  const handlePress: () => void = () => {
    // Pode reutilizar a mesma rota de students, ou criar uma aba específica filtrando ativos
    router.push('/trainer/dashboard/students');
  };

  return (
    <GenericCard
      title="Alunos Ativos"
      subtitle={`${totalActive} Alunos Ativos`}
      onPress={handlePress}
    />
  )
}