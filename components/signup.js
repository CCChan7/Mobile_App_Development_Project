import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

import * as EmailValidator from 'email-validator';
import { method } from 'lodash';

export default class Signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName:"",
            lastName:"",
            email: "",
            password: "",
            error: "", 
            submitted: false
        }

        this._onPressButton = this._onPressButton.bind(this)
    }

    _onPressButton(){
        this.setState({submitted: true})
        this.setState({error: ""})

        if(!(this.state.firstName && this.state.lastName)){
            this.setState({error: "Must enter first name and second name"})
            return;
        }

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
            isLoading: true,
            signupData: [],
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          }
        }
        // getData(){
        //   return fetch('http://127.0.0.1:3333/api/1.0.0/user')
        //   method : 'POST',
        //   headers: { 'Content-Type': 'application/json'},
        //   body: JSON.stringify({
        //   first_name: this.state.first_name,
        //   last_name: this.state.last_name,
        //   email: this.state.email,
        //   password: this.state.password

        //     .then((response) => response.json())
        //     .then((responseJson) => {
      
        //       this.setState({
        //         isLoading: false,
        //         signupData: responseJson,
        //       });
      
        //     })
        //     .catch((error) =>{
        //       console.log(error);
        //     });
        // }
        // componentDidMount(){
        //   this.getData();


    }

    render(){
        return (
            <View style={styles.flexContainer}>

                <View style={styles.viewOne}>
                <View style={styles.firstName}>
                        <Text>First Name:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter First Name"
                            onChangeText={firstName => this.setState({firstName})}
                            defaultValue={this.state.firstName}
                        />

                        <>
                            {this.state.submitted && !this.state.firstName &&
                                <Text style={styles.error}>*First name is required</Text>
                            }
                        </>
                    </View>
                    <View style={styles.lastName}>
                        <Text>Last Name:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter Last Name"
                            onChangeText={lastName => this.setState({lastName})}
                            defaultValue={this.state.lastName}
                        />

                        <>
                            {this.state.submitted && !this.state.lastName &&
                                <Text style={styles.error}>*Last name is required</Text>
                            }
                        </>
                    </View>
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
            
                    <View style={styles.signinbtn}>
                        <TouchableOpacity onPress={this._onPressButton}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign in</Text>
                                <ActivityIndicator/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>
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
    firstName:
    {
        marginBottom: 5,
        padding: 20
    },
    lastName:
    {
        marginBottom: 5,
        padding: 20
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
    signinbtn:
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
        height: 600,
        backgroundColor: 'lightblue'
    }
  });




