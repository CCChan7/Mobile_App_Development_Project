import { StyleSheet, View, Text, TextInput,TouchableOpacity, ActivityIndicator,ScrollView } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-web';

class Chats extends Component{
  constructor(props)
  {
    super(props);

    this.state =
    {
      searchedChat: "",
      name: "",
      addtoChat: "",
      addID: "",
      removeChatID: "",
      removeUserID: "",
      messageChatID: "",
      message: "",
      removeMessageChatID: "",
      removeMessageID: "",
      chats: [],
    }

    this.createChat = this.createChat.bind(this),
    this.getChat = this.getChat.bind(this),
    this.addUser = this.addUser.bind(this),
    this.removeUser = this.removeUser.bind(this),
    this.addMessage = this.addMessage.bind(this),
    this.removeMessage = this.removeMessage.bind(this),
    this.viewChats = this.viewChats.bind(this)
  }

  componentDidMount()
  {
    this.unsubscribe = this.props.navigation.addListener('focus',() => {this.checkLoggedIn();});
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }

  createChat = async () => {

    console.log("Button clicked: " + this.state.name)
    console.log("Validated and ready to send to the API")

    this.state ={
        name: this.state.name,
      }
      
      console.log(this.state)
      const value = await AsyncStorage.getItem("whatsthat_session_token");
      return fetch('http://127.0.0.1:3333/api/1.0.0/chat',
      {
        method : 'post',
        headers: { 'Content-Type': 'application/json','X-Authorization' : value},
        body: JSON.stringify(this.state)
      })

    .then((response) => {
  
    if(response.status === 201)
    {
        return response.json();
                
    }
    else if (response.status === 400)
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
        name : responseJson,
      });
      console.log(responseJson)
    })
        .catch((error) =>
        {
          console.log(error);
        });
        
    }


 
    addUser = async () => {

  
      console.log("Button clicked: " + this.state.addtoChat + this.state.addID)
      console.log("Validated and ready to send to the API")
  
      this.state ={
          addtoChat: this.state.addtoChat,
          addID: this.state.addID,
        }
      
        const value = await AsyncStorage.getItem("whatsthat_session_token");
        console.log(this.state)
        return fetch('http://127.0.0.1:3333/api/1.0.0/chat/' + this.state.addtoChat + '/user/' + this.state.addID,
        {
          method : 'post',
          headers: {'X-Authorization' : value}
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
          addtoChat : responseJson
        });
        console.log(responseJson)
      })
          .catch((error) =>
          {
            console.log(error);
          });
          
    }


    removeUser = async () => {

  
        console.log("Button clicked: " + this.state.removeChatID + this.state.removeUser)
        console.log("Validated and ready to send to the API")
    
        this.state ={
            removeChatID: this.state.removeChatID,
            removeUserID: this.state.removeUserID,
          }
        
          const value = await AsyncStorage.getItem("whatsthat_session_token");
          console.log(this.state)
          return fetch('http://127.0.0.1:3333/api/1.0.0/chat/' + this.state.removeChatID + '/user/' + this.state.removeUserID,
          {
            method : 'delete',
            headers: {'X-Authorization' : value}
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
            removeChatID : responseJson
          });
          console.log(responseJson)
        })
            .catch((error) =>
            {
              console.log(error);
            });
            
      }

      addMessage = async () => {

  
        console.log("Button clicked: " + this.state.messageChatID + this.state.message)
        console.log("Validated and ready to send to the API")
    
        this.state ={
            messageChatID: this.state.messageChatID,
            message: this.state.message,
          }
        
          const value = await AsyncStorage.getItem("whatsthat_session_token");
          console.log(this.state.message)

          return fetch('http://127.0.0.1:3333/api/1.0.0/chat/' + this.state.messageChatID + '/message',
          {
            method : 'post',
            headers: {'X-Authorization' : value},
            body: JSON.stringify(this.state.message)
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
            message : responseJson
          });
          console.log(responseJson)
        })
            .catch((error) =>
            {
              console.log(error);
            });
            
      }
  
  
      removeMessage = async () => {
  
    
          console.log("Button clicked: " + this.state.removeMessageChatID + this.state.removeMessageID)
          console.log("Validated and ready to send to the API")
      
          this.state ={
              removeMessageChatID: this.state.removeMessageChatID,
              removeMessageID: this.state.removeMessageID,
            }
          
            const value = await AsyncStorage.getItem("whatsthat_session_token");
            console.log(this.state)
            return fetch('http://127.0.0.1:3333/api/1.0.0/chat/' + this.state.removeMessageChatID + '/user/' + this.state.removeMessageID,
            {
              method : 'delete',
              headers: {'X-Authorization' : value}
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
              removeChatID : responseJson
            });
            console.log(responseJson)
          })
              .catch((error) =>
              {
                console.log(error);
              });
              
        }


    getChat = async () => {

  
        console.log("Button clicked: " + this.state.searchedChat)
        console.log("Validated and ready to send to the API")
    
        this.state ={
            searchedChat: this.state.searchedChat,
          }
        
          const value = await AsyncStorage.getItem("whatsthat_session_token");
          console.log(this.state)
          return fetch('http://127.0.0.1:3333/api/1.0.0/chat/' + this.state.searchedChat,
          {
            method : 'get',
            headers: {'X-Authorization' : value},
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
            searchedChat : responseJson
          });
          console.log(responseJson)
        })
            .catch((error) =>
            {
              console.log(error);
            });
            
      }


    viewChats = async () => 
    {
      
        const value = await AsyncStorage.getItem("whatsthat_session_token");
        return fetch('http://127.0.0.1:3333/api/1.0.0/chat',
        {
          method : 'get',
          headers: {'X-Authorization' : value},
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
          chats : responseJson
        });
      })
          .catch((error) =>
          {
            console.log(error);
          });
          
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
                    <Text>Create chat</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter name of chat"
                            onChangeText={name => this.setState({name})}
                            defaultValue={this.state.name}
                        />
                        <>
                            {!this.state.name &&
                                <Text style={styles.error}>*please enter valid name</Text>
                            }
                        </>
                    </View>

                    <TouchableOpacity style={styles.searchButton} onPress={this.createChat}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Click here to create chat</Text>
                </View>
            </TouchableOpacity>

                    
                    <View style={styles.addBar}>
                    <Text>Write chat id to view details of chat</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter chat name"
                            onChangeText={searchedChat => this.setState({searchedChat})}
                            defaultValue={this.state.searchedChat}
                        />
                        <>
                            {!this.state.searchedChat &&
                                <Text style={styles.error}>*please enter valid name</Text>
                            }
                        </>
                    </View>

                  <TouchableOpacity style={styles.getButton} onPress={this.getChat}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>View Chat details</Text>
                </View>
            </TouchableOpacity>

<View>
    <View style={styles.view}>
    <Text>{JSON.stringify("Chat Name: " + this.state.searchedChat.name)}</Text>
    <Text> Members: </Text>
      <Text>{JSON.stringify(this.state.searchedChat.members)}</Text>
      <Text>{JSON.stringify("Messages: " + this.state.searchedChat.messages)}</Text>
      </View>
  </View>


  <View style={styles.addBar}>
                    <Text>Write Chat ID to be added to</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter chat id"
                            onChangeText={addtoChat => this.setState({addtoChat})}
                            defaultValue={this.state.addtoChat}
                        />
                        <>
                            {!this.state.addtoChat &&
                                <Text style={styles.error}>*please enter valid id</Text>
                            }
                        </>
                    </View>

                    <View style={styles.addBar}>
                    <Text>Write user id of member to be added</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter user id"
                            onChangeText={addID => this.setState({addID})}
                            defaultValue={this.state.addID}
                        />
                        <>
                            {!this.state.addID &&
                                <Text style={styles.error}>*please enter valid id</Text>
                            }
                        </>
                    </View>

                  <TouchableOpacity style={styles.getButton} onPress={this.addUser}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add user to chat</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.addBar}>
                    <Text>Write Chat ID to be removed from</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter chat id"
                            onChangeText={removeChatID => this.setState({removeChatID})}
                            defaultValue={this.state.removeChatID}
                        />
                        <>
                            {!this.state.removeChatID &&
                                <Text style={styles.error}>*please enter valid id</Text>
                            }
                        </>
                    </View>

                    <View style={styles.addBar}>
                    <Text>Write user id of member to be removed</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter user id"
                            onChangeText={removeUserID => this.setState({removeUserID})}
                            defaultValue={this.state.removeUserID}
                        />
                        <>
                            {!this.state.removeUserID &&
                                <Text style={styles.error}>*please enter valid id</Text>
                            }
                        </>
                    </View>

                    <TouchableOpacity style={styles.getButton} onPress={this.removeUser}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Remove user from chat</Text>
                </View>
            </TouchableOpacity>




            <View style={styles.addBar}>
                    <Text>Write Chat ID to send message to</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter chat id"
                            onChangeText={messageChatID => this.setState({messageChatID})}
                            defaultValue={this.state.messageChatID}
                        />
                        <>
                            {!this.state.messageChatID &&
                                <Text style={styles.error}>*please enter valid id</Text>
                            }
                        </>
                    </View>

                    <View style={styles.addBar}>
                    <Text>Write message</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter user id"
                            onChangeText={message => this.setState({message})}
                            defaultValue={this.state.message}
                        />
                        <>
                            {!this.state.message &&
                                <Text style={styles.error}>*please enter valid message</Text>
                            }
                        </>
                    </View>

                  <TouchableOpacity style={styles.getButton} onPress={this.addMessage}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add message</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.addBar}>
                    <Text>Write Chat ID for message to be removed from</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter chat id"
                            onChangeText={removeMessageChatID => this.setState({removeMessageChatID})}
                            defaultValue={this.state.removeMessageChatID}
                        />
                        <>
                            {!this.state.removeMessageChatID &&
                                <Text style={styles.error}>*please enter valid id</Text>
                            }
                        </>
                    </View>

                    <View style={styles.addBar}>
                    <Text>Write message id of message to be removed</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, width: "100%", backgroundColor: "white"}}
                            placeholder="Enter user id"
                            onChangeText={removeMessageID => this.setState({removeMessageID})}
                            defaultValue={this.state.removeMessageID}
                        />
                        <>
                            {!this.state.removeMessageID &&
                                <Text style={styles.error}>*please enter valid id</Text>
                            }
                        </>
                    </View>

                    <TouchableOpacity style={styles.getButton} onPress={this.removeMessage}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Remove message from chat</Text>
                </View>
            </TouchableOpacity>





            <TouchableOpacity style={styles.getButton} onPress={this.viewChats}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Click here to get chats</Text>
                </View>
            </TouchableOpacity>

    <View>
    <FlatList style={styles.view} data ={this.state.chats}
     renderItem={({item}) => (
      <View>
      <Text>{item.chat_id + ') ' + item.name}</Text>
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
    backgroundColor: 'gray'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  createbar:
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
  getButton: {
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

export default Chats;