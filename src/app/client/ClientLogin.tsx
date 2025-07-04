import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import Btn from '@/trainer/components/buttons/btn';

export default function ClientLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email === '' && senha === '') {
      Alert.alert('Bem-vindo!', 'Login do aluno bem-sucedido!');
      router.push('/client/home');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas ou você não é aluno.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login do Aluno</Text>
      <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />

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
