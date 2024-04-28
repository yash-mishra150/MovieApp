
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import React from 'react';
import HomePage from './screens/HomePage';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomePage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
