import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Esta é a página inicial</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Sou Aluno</Text>
      </TouchableOpacity>
      <TouchableOpacity
       style={styles.btn}
       onPress={() => navigation.navigate('Trainer')}
      >
        <Text style={styles.btnText}>Sou Personal</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 14, opacity: 0.7, marginBottom: 24 },
  btn: { width: '100%', padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12, alignItems: 'center' },
  btnText: { fontSize: 16, fontWeight: '700' },
});