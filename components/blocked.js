import { StyleSheet, View, Text, TextInput,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-web';

class Blocked extends Component{
  constructor(props)
  {
    super(props);

    this.state =
    {
      searchedBlocked: "",
      searchedRemove: "",
      blockedData: [],
    }
    this.getBlocked = this.getBlocked.bind(this),
    this.removeBlocked = this.removeBlocked.bind(this),
    this.addBlocked = this.addBlocked.bind(this)
  }

  componentDidMount()
  {
    this.unsubscribe = this.props.navigation.addListener('focus',() => {this.checkLoggedIn();});
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }

  
    addBlocked = async () => {

  
      console.log("Button clicked: " + this.state.searchedBlocked)
      console.log("Validated and ready to send to the API")
  
      this.state ={
          searchedBlocked: this.state.searchedBlocked,
        }
      
        const value = await AsyncStorage.getItem("whatsthat_session_token");
        console.log(this.state)
        return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.state.searchedBlocked +'/block',
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
          throw "blocked"
        }
        else if(responseJson = "Already a contact")
        {
          throw "already blocked"
        }
       this.setState
        ({
          searchedBlocked : this.state.searchedBlocked
        });
      })
          .catch((error) =>
          {
            console.log(error);
          });
          
    }


    removeBlocked = async () => 
    {
  
      console.log("Button clicked: " + this.state.searchedRemove)
      console.log("Validated and ready to send to the API")
  
      this.state ={
          searchedRemove: this.state.searchedRemove,
        }
      
        const value = await AsyncStorage.getItem("whatsthat_session_token");
        console.log(this.state)
        return fetch('http://127.0.0.1:3333/api/1.0.0/user/' + this.state.searchedRemove +'/block',
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
          throw "Blocked user removed"
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
    


  getBlocked = async() => 
  {
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    return fetch('http://127.0.0.1:3333/api/1.0.0/blocked',
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
        else if (blockedData = "")
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
        blockedData : responseJson,
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
                    
                    <View style={styles.addBar}>
                    <Text>Block Contact:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter User"
                            onChangeText={searchedBlocked => this.setState({searchedBlocked})}
                            defaultValue={this.state.searchedBlocked}
                        />
                        <>
                            {this.state.submittedAdd && !this.state.searchedBlocked &&
                                <Text style={styles.error}>*please enter valid user ID</Text>
                            }
                        </>
                    </View>

                  <TouchableOpacity style={styles.blockedButton} onPress={this.addBlocked}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Block user</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.addBar}>
                    <Text>Remove Blocked Contact:</Text>
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

                  <TouchableOpacity style={styles.blockedButton} onPress={this.removeBlocked}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Remove Blocked User</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.blockedButton} onPress={this.getBlocked}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Click here to get blocked users</Text>
                </View>
            </TouchableOpacity>

    <View>
    <FlatList style={styles.view} data ={this.state.blockedData}
     renderItem={({item}) => (
      <View>
      <Text>{'user id: ' + item.user_id + ') '+ item.first_name +" "+ item.last_name}</Text>
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
    backgroundColor: 'orange'
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
  blockedButton: {
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

export default Blocked;