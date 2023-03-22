import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as EmailValidator from 'email-validator';

export default class LoginScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "", 
            submitted: false
        }

        this._onPressButton = this._onPressButton.bind(this)
    }

    _onPressButton = async () => {
        this.setState({submitted: true})
        this.setState({error: ""})

        if(!(this.state.email && this.state.password)){
            this.setState({error: "Must enter email and password"})
            return;
        }

        if(!EmailValidator.validate(this.state.email)){
            this.setState({error: "Must enter valid email"})
            return;
        }

        const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if(!PASSWORD_REGEX.test(this.state.password)){
            this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long)"})
            return;
        }


        console.log("Button clicked: " + this.state.email + " " + this.state.password)
        console.log("Validated and ready to send to the API")

        this.state ={
            email: this.state.email,
            password: this.state.password
          }
        
        return fetch('http://127.0.0.1:3333/api/1.0.0/login',
        {
          method : 'post',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(this.state)
        })
        .then((response) => {
      
        if(response.status === 200)
        {
            return response.json();
                    
        }
        else if (response.status === 400)
        {
            throw "Account already exists or Syntax is incorrect"
        }
        else
        {
            throw "something went wrong"
        }
      
            })
            .then(async (responseJson) => {
                console.log(responseJson);
                await AsyncStorage.setItem("whatsthat_user_id",responseJson.id);
                await AsyncStorage.setItem("whatsthat_session_token",responseJson.token);
                this.props.navigation.navigate('Home')
            })
            .catch((error) =>
            {
              console.log(error);
            });
        }

    render(){
        return (
            <View style={styles.flexContainer}>

                <View style={styles.viewOne}>
                    <View style={styles.email}>
                        <Text>Email:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter email"
                            onChangeText={email => this.setState({email})}
                            defaultValue={this.state.email}
                        />

                        <>
                            {this.state.submitted && !this.state.email &&
                                <Text style={styles.error}>*Email is required</Text>
                            }
                        </>
                    </View>
            
                    <View style={styles.password}>
                        <Text>Password:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%",backgroundColor: "white"}}
                            placeholder="Enter password"
                            onChangeText={password => this.setState({password})}
                            defaultValue={this.state.password}
                            secureTextEntry
                        />

                        <>
                            {this.state.submitted && !this.state.password &&
                                <Text style={styles.error}>*Password is required</Text>
                            }
                        </>
                    </View>
            
                    <View style={styles.loginbtn}>
                        <TouchableOpacity onPress={this._onPressButton} >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>
            
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.signup}>Need an account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    flexContainer: 
    {
        flex: 1,
        backgroundColor: '#A020F0',
        flexDirection: 'center', // can be column (default), row, row-reverse, column-reverse
        justifyContent: 'center', // can be flex-start (default), flex-end, center, space-between, space-around, space-evenly
        alignItems: 'center' //can be stretch (default), flex-start, flex-end, center, baseline
    },
    email:
    {
      marginBottom: 5,
      padding: 20
    },
    password:
    {
      marginBottom: 10,
      padding: 20
    },
    loginbtn:
    {
        padding: 20
    },
    signup:
    {
      justifyContent: "center",
      textDecorationLine: "underline",
      padding: 20
    },
    button: 
    {
      marginBottom: 30,
      backgroundColor: '#2196F3'
    },
    buttonText:
    {
      textAlign: 'center',
      padding: 20,
      color: 'white'
    },
    error:
    {
        color: "red",
        fontWeight: '900'
    },
    viewOne:
    {
        width: 350,
        height: 450,
        backgroundColor: 'lightblue'
    }
  });




