import { ScrollView, View, StyleSheet } from 'react-native';
import WorkoutCard from '../../../client/components/cards/WorkoutCard'
import DietCard from '../../../client/components/cards/DietCard';
import ErgogenicsCard from '../../../client/components/cards/ErgogenicsCard';
import ManipuladosCard from '../../../client/components/cards/ManipuladosCard'

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
