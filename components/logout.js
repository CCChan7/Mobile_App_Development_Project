import { StyleSheet, View, Text, Button,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Logout extends Component{
  constructor(props)
  {
    super(props);
    
    this.logOut = this.logOut.bind(this)
  }


  componentDidMount()
  {
    this.unsubscribe = this.props.navigation.addListener('focus',() => {this.checkLoggedIn();});
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }

  logOut = async () => 
  {
    console.log("log out")
    return fetch('http://127.0.0.1:3333/api/1.0.0/logout',
    {
      method : 'post',
      headers: { 'X-Authorization' : await AsyncStorage.getItem("whatsthat_session_token")},
    })
    .then(async(response) => 
    {
      if(response.status === 200)
        {
            await AsyncStorage.removeItem("whatsthat_session_token")
            await AsyncStorage.removeItem("whatsthat_user_id")
            this.props.navigation.navigate('Login') 
        }
        else if (response.status === 401)
        {
            console.log("unauthorized")
            await AsyncStorage.removeItem("whatsthat_session_token")
            await AsyncStorage.removeItem("whatsthat_user_id")
            this.props.navigation.navigate('Login') 
        }
        else
        {
            throw "something went wrong"
        }
        
    })
    .catch((error) =>
    {
      console.log(error);
    })
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
            <TouchableOpacity style={styles.buttonContainer} onPress={this.logOut}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Click here to Log Out</Text>
                </View>
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
    backgroundColor: 'red'
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

export default Logout;


