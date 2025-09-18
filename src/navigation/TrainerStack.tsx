import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrainerTabs from "./TrainerTabs";
import DietsScreen from "../screens/trainer/diets/DietsScreen";
import DietDetailsScreen from "../screens/trainer/diets/DietDetailsScreen";
import MealDetailsScreen from "../screens/trainer/diets/MealDetailsScreen";
import ProtocolsScreen from "../screens/trainer/protocols/ProtocolsScreen";
import CompoundsScreen from "../screens/trainer/compounds/CompoundsScreen";
import RoutinesScreen from "../screens/trainer/routines/RoutinesScreen";
import RoutineDetailsScreen from "../screens/trainer/routines/RoutineDetailsScreen";
import WorkoutDetailsScreen from "../screens/trainer/workouts/WorkoutDetailsScreen";
import CreateFoodScreen from "../screens/trainer/foods/CreateFoodScreen";

export type TrainerStackParamList = {
  TrainerTabs: undefined;
  Diets: undefined;
  DietDetails: { dietId: number };
  MealDetails: { mealId: number };
  CreateFood: undefined;
  Routines: undefined;
  RoutineDetails: { routineId: number };
  WorkoutDetails: { workoutId: number };
  Protocols: undefined;
  Compounds: undefined;
};

const Stack = createNativeStackNavigator<TrainerStackParamList>();

export default function TrainerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrainerTabs"
        component={TrainerTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Diets"
        component={DietsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DietDetails" component={DietDetailsScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      <Stack.Screen name="CreateFood" component={CreateFoodScreen} /> 
      <Stack.Screen
        name="Routines"
        component={RoutinesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="RoutineDetails" component={RoutineDetailsScreen} />
      <Stack.Screen
        name="WorkoutDetails"
        component={WorkoutDetailsScreen}
        options={{ title: "Workout" }}
      />
      <Stack.Screen
        name="Protocols"
        component={ProtocolsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Compounds"
        component={CompoundsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
