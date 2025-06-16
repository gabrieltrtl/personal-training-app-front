import React from "react";
import GenericCard from '../../../common/GenericCard';
import { useRouter } from "expo-router";


export default function TotalStudentsCard() {
  const total = 42;
  const router = useRouter();

  const handlePress: () => void = () => {
    router.push('/trainer/dashboard/students');
  };
  
  
  return (
   <GenericCard
      title="Total de Alunos na Base"
      subtitle={`${total} alunos cadastrados`}
      onPress={handlePress}
    />
  )
}