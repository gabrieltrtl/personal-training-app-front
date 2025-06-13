import React from "react";
import GenericCard from "../../../src/components/common/GenericCard";
import { useRouter } from "expo-router";


export default function TotalStudentsCard() {
  const total = 42;
  const router = useRouter();

  const handlePress: () => void = () => {
    router.push('/trainer/dashboard/students');
  };
  
  
  return (
   <GenericCard
      title="Total de Alunos"
      subtitle={`${total} alunos cadastrados`}
      onPress={handlePress}
    />
  )
}