import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '@/trainer/components/buttons/btn';

export default function TrainerLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const setTokenDev = async () => {
      if (__DEV__) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoia2Fzc2lvQHRyYWluZXIuY29tIiwicm9sZSI6InRyYWluZXIiLCJpYXQiOjE3NTIyMzQ4NjYsImV4cCI6MTc1MjMyMTI2Nn0.lEWRTNlescApO86iofAQo85AYwJF0NXpAlr8IUVpK9k';
        await AsyncStorage.setItem('token', token);
        console.log('Token dev inserido', token);
        router.replace('/trainer/home'); // ou qualquer rota interna
      }
    };
    setTokenDev();
  }, []);

  const handleLogin = () => {
    if (email === '' && senha === '') {
      Alert.alert('Login realizado!', 'Bem-vindo, personal!');
      router.push('/trainer/home');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas ou você não é um personal.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login do Personal</Text>
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />
     <Btn title="Entrar" onPress={handleLogin} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
   input: {
    backgroundColor: '#fff',
    padding: 15,
    width:"100%",
    elevation:2,
    marginBottom: 12,
    borderRadius: 5,
  },
});
