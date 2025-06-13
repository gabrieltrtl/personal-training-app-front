import { ScrollView, View, StyleSheet } from 'react-native';
import WorkoutCard from '../../../src/components/client/cards/WorkoutCard';
import DietCard from '../../../src/components/client/cards/DietCard';
import ErgogenicsCard from '../../../src/components/client/cards/ErgogenicsCard';
import ManipuladosCard from '../../../src/components/client/cards/ManipuladosCard';

export default function AlunoDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        <WorkoutCard />
        <DietCard />
        <ErgogenicsCard />
        <ManipuladosCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
