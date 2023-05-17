import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './components/login';
import HomeScreen from './components/home';
import Profile from './components/profile.js';
import Chats from './components/chats'
import Contact from './components/contact';
import Signup from './components/signup';
import LogoutScreen from './components/logout';
import BlockedScreen from './components/blocked';

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
               else if (route.name === 'Chats')
               {
                 iconName = focused 
                 ? 'chatbubbles'
                 : 'chatbubbles-outline';
               }
               else if (route.name === 'Profile')
               {
                 iconName = focused 
                 ? 'person'
                 : 'person-outline';
               }
               else if (route.name === 'Contact')
               {
                 iconName = focused 
                 ? 'body'
                 : 'body-outline';
               }
               else if (route.name === 'Blocked')
               {
                 iconName = focused 
                 ? 'remove-circle'
                 : 'remove-circle-outline';
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
           <Tab.Screen name="Chats" component={Chats} />
   		    <Tab.Screen name="Profile" component={Profile} />
   	  	  <Tab.Screen name="Contact" component={Contact} />
           <Tab.Screen name="Blocked" component={BlockedScreen} />
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

