import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

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
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
});
