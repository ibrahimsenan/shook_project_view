import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../Screens/Auth/SplashScreen/SplashScreen';
const Stack = createNativeStackNavigator();


 
export interface IAppProps {
}

 function Routes(): JSX.Element {
  return (
    <NavigationContainer>
    <Stack.Navigator>
     <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default Routes