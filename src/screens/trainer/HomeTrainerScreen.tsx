import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/common/Card';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TrainerStackParamList } from '../../navigation/TrainerStack';
import { TrainerTabParamList } from '../../navigation/TrainerTabs';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<TrainerStackParamList>,
  BottomTabNavigationProp<TrainerTabParamList>
>


export default function HomeTrainerScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Trainer</Text>
      <Text style={styles.muted}>Tela inicial do fluxo do Trainer.</Text>
      <Card
        title='Biblioteca de Workouts'
        subtitle=''
        icon='barbell'
        onPress={() => navigation.navigate('Routines')}

      />
      <Card
        title='Biblioteca de Dietas'
        subtitle=''
        icon='nutrition'
        onPress={() => navigation.navigate('Diets')}

      />
      <Card
        title='Biblioteca de Protocolos'
        subtitle=''
        icon='flask'
        onPress={() => navigation.navigate('Protocols')}
      />
      <Card
        title='Biblioteca de Manipulados'
        subtitle=''
        icon='eyedrop'
        onPress={() => navigation.navigate('Compounds')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700" },
  muted: { fontSize: 14, opacity: 0.7 },
});