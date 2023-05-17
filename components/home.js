import { StyleSheet, View, Text, Button,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component{
  constructor(props)
  {
    super(props);
  }

   componentDidMount()
   {
     this.unsubscribe = this.props.navigation.addListener('focus',() => {this.checkLoggedIn();});
   }

   componentWillUnmount()
   {
     this.unsubscribe();
   }
  

   checkLoggedIn = async () =>
   {
     const value = await AsyncStorage.getItem("whatsthat_session_token");
     if (value == null)
     {
       this.props.navigation.navigate('Login')
     }
   }

  render(){
    return(
        <View style={styles.container}>
          <Text style={styles.text}>Home Screen</Text>
          <Text> Welcome </Text>
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