import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

import * as EmailValidator from 'email-validator';

export default class Signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            first_name:"",
            last_name:"",
            email: "",
            password: "",
            error: "", 
            submitted: false
        }

        this.signUpButton = this.signUpButton.bind(this)
    }

    signUpButton(){
        this.setState({submitted: true})
        this.setState({error: ""})

        if(!(this.state.first_name && this.state.last_name)){
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
          }
        
        return fetch('http://127.0.0.1:3333/api/1.0.0/user',
        {
          method : 'post',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(this.state)
        })
        .then((response) => {
      
        if(response.status === 201)
        {
            return response.json();
                    
        }
        else if (response.status === 200)
        {
            throw "Email already exists or Password is not strong enough"
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
            .then((responseJson) => {
                console.log("user created : " , responseJson);
                this.props.navigation.navigate('Login')
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
                <View style={styles.first_name}>
                        <Text>First Name:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter First Name"
                            onChangeText={first_name => this.setState({first_name})}
                            defaultValue={this.state.first_name}
                        />

                        <>
                            {this.state.submitted && !this.state.first_name &&
                                <Text style={styles.error}>*First name is required</Text>
                            }
                        </>
                    </View>
                    <View style={styles.last_name}>
                        <Text>Last Name:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter Last Name"
                            onChangeText={last_name => this.setState({last_name})}
                            defaultValue={this.state.last_name}
                        />

                        <>
                            {this.state.submitted && !this.state.last_name &&
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
                        <TouchableOpacity onPress={this.signUpButton}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>

                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.signup}>Return to Log in page?</Text>
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
    first_name:
    {
        marginBottom: 5,
        padding: 20
    },
    last_name:
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
      padding: 10
    },
    button: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 5,
        margin: 10
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




