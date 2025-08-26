/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
// import { useD } from 'react-redux/es/hooks/useSelector';
import React, { useEffect } from 'react';
import SplashScreen from './app/Screens/Auth/SplashScreen/SplashScreen';
import { setGetExtendTokenAsync } from "./app/apis/auth/user_signIn/reducer";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const dispatch = useDispatch();
  // const userData = useSelector((state: any) => state);
  console.log("dispatch", dispatch)
  useEffect(() => {
     
    dispatch(setGetExtendTokenAsync())
    return () => {
       
    }
  }, [ ])
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default App;
 