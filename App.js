import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './components/login';
import HomeScreen from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Signup from './components/signup';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

