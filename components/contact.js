import { StyleSheet, View, Text, TextInput,TouchableOpacity, ActivityIndicator,ScrollView } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-web';

class Contact extends Component{
  constructor(props)
  {
    super(props);

    this.state =
    {
      searchedContact: "",
      searchedUser: "",
      searchedRemove:"",
      submittedAdd: true,
      submittedUser: true,
      submittedUser: true,
      contactData: [],
      userData: [],
    }

    this.getUsers = this.getUsers.bind(this),
    this.addContacts = this.addContacts.bind(this),
    this.removeContacts = this.removeContacts.bind(this),
    this.getContacts = this.getContacts.bind(this)
  }

  componentDidMount()
  {
    this.unsubscribe = this.props.navigation.addListener('focus',() => {this.checkLoggedIn();});
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }

  getUsers = async () => {

    console.log("Button clicked: " + this.state.searchedUser)
    console.log("Validated and ready to send to the API")

    this.state ={
        searchedUser: this.state.searchedUser,
      }
    
      const value = await AsyncStorage.getItem("whatsthat_session_token");
      return fetch('http://127.0.0.1:3333/api/1.0.0/search',
      {
        method : 'get',
        headers: {'X-Authorization' : value},
        //body: JSON.stringify(this.state)
      })
    .then((response) => {
  
    if(response.status === 200)
    {
        return response.json();
                
    }
    else if (response.status === 401)
    {
        throw "invalid"
    }
    else
    {
        throw "something went wrong"
    }
  
        })
    .then(async (responseJson) =>
    {
     this.setState
      ({
        //loadingUsers: false,
        //userData : responseJson,
      });
    })
        .catch((error) =>
        {
          console.log(error);
        });
        
    }


 
    addContacts = async () => {

  
      console.log("Button clicked: " + this.state.searchedContact)
      console.log("Validated and ready to send to the API")
  
      this.state ={
          searchedContact: this.state.searchedContact,
        }
      
        const value = await AsyncStorage.getItem("whatsthat_session_token");
        console.log(this.state)
        return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.state.searchedContact +'/contact',
        {
          method : 'post',
          headers: {'X-Authorization' : value},
          body: JSON.stringify(this.state)
        })
      .then((response) => {
    
      if(response.status === 200)
      {
          return response.json();
                  
      }
      else if (response.status === 401)
      {
          throw "invalid"
      }
      else
      {
          throw "something went wrong"
      }
    
          })
      .then(async (responseJson) =>
      {
        if(responseJson = "OK")
        {
          throw "Contact added"
        }
        else if(responseJson = "Already a contact")
        {
          throw "already contact"
        }
       this.setState
        ({
          searchedContact : this.state.searchedContact
        });
      })
          .catch((error) =>
          {
            console.log(error);
          });
          
    }


    removeContacts = async () => 
    {
  
      console.log("Button clicked: " + this.state.searchedRemove)
      console.log("Validated and ready to send to the API")
  
      this.state ={
          searchedRemove: this.state.searchedRemove,
        }
      
        const value = await AsyncStorage.getItem("whatsthat_session_token");
        console.log(this.state)
        return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.state.searchedRemove +'/contact',
        {
          method : 'delete',
          headers: {'X-Authorization' : value},
          body: JSON.stringify(this.state)
        })
      .then((response) => {
    
      if(response.status === 200)
      {
          return response.json();
                  
      }
      else if (response.status === 401)
      {
          throw "invalid"
      }
      else
      {
          throw "something went wrong"
      }
    
          })
      .then(async (responseJson) =>
      {
        if(responseJson = "OK")
        {
          throw "Contact removed"
        }
        else if(responseJson = "Already a contact")
        {
          throw "already removed"
        }
       this.setState
        ({
          searchedRemove : this.state.searchedRemove
        });
      })
          .catch((error) =>
          {
            console.log(error);
          });
          
    }



  getContacts = async() => 
  {
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    return fetch('http://127.0.0.1:3333/api/1.0.0/contacts',
    {
      method : 'get',
      headers: {'X-Authorization' : value},
    })
    
    .then(async(response) => 
    {
      if(response.status === 200)
        {
          return response.json()             
        }
        else if (response.status === 401)
        {
          throw "Unauthorized"
        }
        else if (contactData = "")
        {
          throw "empty"
        }
        else
        {
            throw "something went wrong"
        }
        
    })

    //.then((response) => response.json())
    .then(async (responseJson) =>
    {
     this.setState
      ({
        loadingContacts: false,
        contactData : responseJson,
      });
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
      <ScrollView>
		  <View style={styles.container}>

                    <View style={styles.searchBar}>
                    <Text>Search:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter User"
                            onChangeText={searchedUser => this.setState({searchedUser})}
                            defaultValue={this.state.searchedUser}
                        />
                        <>
                            {this.state.submittedUser && !this.state.searchedUser &&
                                <Text style={styles.error}>*please enter valid user</Text>
                            }
                        </>
                    </View>

                    <TouchableOpacity style={styles.searchButton} onPress={this.getUsers}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Click here to search for users</Text>
                </View>
            </TouchableOpacity>

            <View>
                         <FlatList data ={this.state.userData}
                          renderItem={({item}) => (
                           <View>
                           <Text>{item.first_name}</Text>
                           </View>
                          )}
                          />
                       </View>

                    
                    <View style={styles.addBar}>
                    <Text>Add Contact:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter User"
                            onChangeText={searchedContact => this.setState({searchedContact})}
                            defaultValue={this.state.searchedContact}
                        />
                        <>
                            {this.state.submittedAdd && !this.state.searchedContact &&
                                <Text style={styles.error}>*please enter valid user ID</Text>
                            }
                        </>
                    </View>

                  <TouchableOpacity style={styles.contactsButton} onPress={this.addContacts}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add Contact</Text>
                </View>
            </TouchableOpacity>
                            

            <View style={styles.addBar}>
                    <Text>Remove Contact:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter User"
                            onChangeText={searchedRemove => this.setState({searchedRemove})}
                            defaultValue={this.state.searchedRemove}
                        />
                        <>
                            {this.state.submittedRemove && !this.state.searchedRemove &&
                                <Text style={styles.error}>*please enter valid user ID</Text>
                            }
                        </>
                    </View>

                  <TouchableOpacity style={styles.contactsButton} onPress={this.removeContacts}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Remove Contact</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.contactsButton} onPress={this.getContacts}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Click here to get contacts</Text>
                </View>
            </TouchableOpacity>
            <View>
    <FlatList style={styles.view} data ={this.state.contactData}
     renderItem={({item}) => (
      <View>
      <Text>{'id: (' + item.user_id + ') '+ item.first_name +" "+ item.last_name}</Text>
      </View>
     )}
     />
  </View>
                        
            
            </View>
    </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  searchBar:
    {
      marginBottom: 5,
      padding: 20
    },
  searchButton: {
      backgroundColor: '#222',
      borderRadius: 5,
      padding: 10,
      margin: 20
    },
  addBar:
    {
      marginBottom: 5,
      padding: 20
    },
  contactsButton: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  view:
    {
        width: 300,
        height: 200,
        backgroundColor: 'lightblue'
    }
});

export default Contact;