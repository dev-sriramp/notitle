import React from "react";
import { ContextManager } from '../components/ContextManager';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, } from 'native-base';
import SelectWorkStationPage from "../screens/SelectWorkStationPage";
import SubStationPage from "../screens/SubStationPage";
import UpdateCountPage from "../screens/UpdateCountPage";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
    <>
     <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
    <ContextManager.Provider value="null">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={SelectWorkStationPage} />
          <Stack.Screen name="LandScreen" component={SubStationPage} />
          <Stack.Screen name="UpdateCount" component={UpdateCountPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextManager.Provider></>
  )
}
export default MyNavigator;