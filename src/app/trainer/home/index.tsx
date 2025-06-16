import React from "react";
import { StyleSheet, ScrollView} from 'react-native'
import TotalStudentsCard from '../../../trainer/components/cards/TotalStudentsCard';
import ActiveStudentsCard from '../../../trainer/components/cards/ActiveStudentsCard'
import DietLibraryCard from '../../../trainer/components/cards/DietLibraryCard';
import WorkoutLibraryCard from '../../../trainer/components/cards/WorkoutLibraryCard'
import CompoundLibraryCard from '../../../trainer/components/cards/CompoundLibraryCard'
import ErgogenicLibraryCard from '../../../trainer/components/cards/ErgogenicLibraryCard'


export default function TrainerDashboard() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TotalStudentsCard />
      <ActiveStudentsCard />
      <DietLibraryCard />
      <WorkoutLibraryCard />
      <CompoundLibraryCard />
      <ErgogenicLibraryCard />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },

})