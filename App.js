import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './components/login';
import HomeScreen from './components/home';
import About from './components/about';
import Contacts from './components/contact';
import Signup from './components/signup';
import LogoutScreen from './components/logout';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNav = () => {
     return (
          <Tab.Navigator
           screenOptions={({ route }) => ({
             tabBarIcon: ({ focused, color, size }) => {
               let iconName;
  
               if (route.name === 'Home Screen') 
               {
                 iconName = focused
                   ? 'home'
                   : 'home-outline';
               } 
               else if (route.name === 'About')
               {
                 iconName = focused 
                 ? 'happy'
                 : 'happy-outline';
               }
               else if (route.name === 'Contacts')
               {
                 iconName = focused 
                 ? 'body'
                 : 'body-outline';
               }
               else if (route.name === 'Log Out')
               {
                 iconName = focused 
                 ? 'ios-list'
                 : 'ios-list-outline';
               }
               return <Ionicons name={iconName} size={size} color={color} />;
             },
             tabBarActiveTintColor: 'green',
             tabBarInactiveTintColor: 'gray',
           })}>
           <Tab.Screen name="Home Screen" component={HomeScreen} />
   		    <Tab.Screen name="About" component={About} />
   	  	  <Tab.Screen name="Contacts" component={Contacts} />
          <Tab.Screen name='Log Out' component={LogoutScreen} />
         </Tab.Navigator>
     );
   }
   
const AuthenticationStack = () => {
  return (
       <Stack.Navigator initialRouteName="LoginScreen"  screenOptions={{headerShown : false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name = "Home" component ={HomeNav}/>
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
       <AuthenticationStack/>
    </NavigationContainer>
  );
}

