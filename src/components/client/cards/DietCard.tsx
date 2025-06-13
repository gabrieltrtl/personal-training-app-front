import { router } from 'expo-router';
import GenericCard from '../../common/GenericCard'

export default function DietCard() {
  const handlePress = () => {
    router.push('/client/dashboard/diet');
  };

  return (
    <GenericCard
      title="Dieta"
      onPress={() => console.log('clicou')}
    />
  );
}

