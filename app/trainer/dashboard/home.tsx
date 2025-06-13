import React from "react";
import { View, StyleSheet, ScrollView} from 'react-native'
import TotalStudentsCard from "../cards/TotalStudentsCard";

export default function TrainerDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TotalStudentsCard />
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