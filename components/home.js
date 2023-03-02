import { StyleSheet, View, Text, Button,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

class HomeScreen extends Component{
  static navigationOptions = {
    header: null
  };

  render(){
    return(
        <View style={styles.container}>
          <Text style={styles.text}>Home Screen</Text>
		  <TouchableOpacity
		    style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('About')}>
			<Text style={styles.buttonText}>Go to About Me</Text>
		  </TouchableOpacity>
		  <TouchableOpacity
		    style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('Contact')}>
			<Text style={styles.buttonText}>Go to my Contact</Text>
		  </TouchableOpacity>
		  
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default HomeScreen;


// import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import LoginScreen from './components/login';
// import HomeScreen from './components/home';
// import About from './components/about';
// import Contact from './components/contact';
// import Signup from './components/signup';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// export default function Home() {
//   return (
//     <NavigationContainer>
//        <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home Screen') 
//             {
//               iconName = focused
//                 ? 'home'
//                 : 'home-outline';
//             } 
//             else if (route.name === 'About')
//             {
//               iconName = focused 
//               ? 'happy'
//               : 'happy-outline';
//             }
//             else if (route.name === 'Contact')
//             {
//               iconName = focused 
//               ? 'body'
//               : 'body-outline';
//             }
//             else if (route.name === 'Log in')
//             {
//               iconName = focused 
//               ? 'ios-list'
//               : 'ios-list-outline';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'green',
//           tabBarInactiveTintColor: 'gray',
//         })}>
//         <Tab.Screen name="Home Screen" component={HomeScreen} />
// 		    <Tab.Screen name="About" component={About} />
// 	  	  <Tab.Screen name="Contact" component={Contact} />
//         <Tab.Screen name="Log in" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={Signup} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

