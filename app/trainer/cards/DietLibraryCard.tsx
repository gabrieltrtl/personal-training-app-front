// src/components/trainer/cards/DietLibraryCard.tsx
import React from 'react';
import GenericCard from '../../common/GenericCard'
import { useRouter } from 'expo-router';

export default function DietLibraryCard() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/trainer/dashboard/diet-library');
  };

  return (
    <GenericCard
      title="Biblioteca de Dietas"
      subtitle="Templates de dietas criados"
      onPress={handlePress}
    />
  );
}
