
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import React from 'react';
import HomePage from './screens/HomePage';
import MovieScreen from './screens/MovieScreen';
import PersonScreen from './screens/PersonScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomePage} />
            <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
            <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
            <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
