import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeTrainerScreen from "../screens/trainer/HomeTrainerScreen";

export type TrainerTabParamList = {
  HomeTrainer: undefined;
};

const Tab = createBottomTabNavigator<TrainerTabParamList>();

export default function TrainerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTrainer"
        component={HomeTrainerScreen}
        options={{ title: "Home" }}
      />
    </Tab.Navigator>
  )
}