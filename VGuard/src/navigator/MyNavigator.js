import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectWorkStationPage from "../screens/SelectWorkStationPage";
import SubStationPage from "../screens/SubStationPage";
import UpdateCountPage from "../screens/UpdateCountPage";
import OpenTask from "../screens/opentask";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={OpenTask} />
          <Stack.Screen name="LandScreen" component={SubStationPage} />
          <Stack.Screen name="UpdateCount" component={UpdateCountPage} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
export default MyNavigator;