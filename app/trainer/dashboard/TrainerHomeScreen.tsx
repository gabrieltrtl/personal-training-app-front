import React from "react";
import { StyleSheet, ScrollView} from 'react-native'
import TotalStudentsCard from "../cards/TotalStudentsCard";
import ActiveStudentsCard from "../cards/ActiveStudentsCard";
import DietLibraryCard from "../cards/DietLibraryCard";

export default function TrainerDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TotalStudentsCard />
      <ActiveStudentsCard />
      <DietLibraryCard />
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