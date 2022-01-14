import React from "react";
import { ContextManager } from '../components/ContextManager';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectWorkStationPage from "../screens/SelectWorkStationPage";
import SubStationPage from "../screens/SubStationPage";
import UpdateCountPage from "../screens/UpdateCountPag";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
    <ContextManager.Provider value="null">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={SelectWorkStationPage} />
          <Stack.Screen name="LandScreen" component={SubStationPage} />
          <Stack.Screen name="UpdateCount" component={UpdateCountPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextManager.Provider>
  )
}
export default MyNavigator;