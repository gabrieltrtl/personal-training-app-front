import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from '../screens/WelcomeScreen';
import TrainerStack from './TrainerStack';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  Trainer: undefined;
  Student: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen 
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ title: 'Escolha seu perfil' }}
      />
      <Stack.Screen
        name="Trainer"
        component={TrainerStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
