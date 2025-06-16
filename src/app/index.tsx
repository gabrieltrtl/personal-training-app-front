// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo 👋</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/client/ClientLogin')}
      >
        <Text style={styles.buttonText}>SOU ALUNO</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/trainer/TrainerLogin')}
      >
        <Text style={styles.buttonText}>SOU PERSONAL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#6200ee',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

