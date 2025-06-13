import { router } from 'expo-router';
import GenericCard from '../../common/GenericCard'

export default function WorkoutCard() {
  const handlePress = () => {
    router.push('/client/dashboard/workout');
  };

  return (
      <GenericCard
        title="Treino"
        onPress={() => console.log('clicou')}
      />
    );
}



