// src/components/trainer/cards/DietLibraryCard.tsx
import React from 'react';
import GenericCard from '../../../common/GenericCard';
import { useRouter } from 'expo-router';

export default function DietLibraryCard() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/trainer/compound-library');
  };

  return (
    <GenericCard
      title="Seus Templates"
      subtitle="Templates de dietas criados"
      onPress={handlePress}
      img="icone1"
    />
  );
}
