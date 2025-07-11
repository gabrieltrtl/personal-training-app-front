// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import Btn from '@/trainer/components/buttons/btn';


export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <LottieView source={require('../../assets/imagens/AnimationLogin.json')}  autoPlay loop style={{ width: 200, height: 200 }}/>

      <Text style={styles.title}>Bem-vindo 👋</Text>
  
      <Btn title="SOU ALUNO" onPress={() => router.push("/client/ClientLogin")} />
      <Btn title="SOU PERSONAL" onPress={() => router.push('/trainer/TrainerLogin')} />

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
    fontWeight: 300,
  },
});

