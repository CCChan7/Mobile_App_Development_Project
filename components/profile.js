import { StyleSheet, View, Text, TextInput,TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';
import {Camera, CameraType} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-web';

class Profile extends Component{
  constructor(props)
  {
    super(props);

    // const [type,setType] = useState(CameraType.back);
    // const [permission, requestPermissions] = Camera.useCameraPermissions();

    this.state =
    {
      loadData: false,
      uploadPhoto: null,
      photo: null,
      profileData: "",
      first_name:"",
      last_name:"",
      email: "",
      password: "",
    }
    this.updateInfo = this.updateInfo.bind(this)
  }

  componentDidMount()
  {
    this.unsubscribe = this.props.navigation.addListener('focus',() => {this.checkLoggedIn();});
    this.getInfo();
    this.getPhoto();
  }

  componentWillUnmount()
  {
    this.unsubscribe();
  }
  
//   changeCamera()
//   {
//     setType(current=> (current === CameraType.back ? CameraType.front : CameraType.back));
//     console.log("Camera ", type)
    
//   }
getPhoto = async() => 
  {

    const idvalue = await AsyncStorage.getItem("whatsthat_user_id");
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    return fetch('http://127.0.0.1:3333/api/1.0.0/user/'+ idvalue + '/photo',
    {
      method : 'get',
      headers: {'Content-Type': 'image/png', 'X-Authorization' : value},
    })
    
    .then(async(response) => 
    {
      if(response.status === 200)
        {
          return response.blob()             
        }
        else if (response.status === 401)
        {
          throw "Unauthorized"
        }
        else
        {
            throw "something went wrong"
        }
        
    })

    //.then((response) => response.json())
    // .then((response) =>
    // {
    //     return response.blob();
    // })

    .then(async (resBlob) =>
    {
        let data = URL.createObjectURL(resBlob)
     this.setState
      ({
        photo : resBlob,
      });
      console.log(this.state.photo)
    })
    
    .catch((error) =>
    {
      console.log(error);
    })
  }

  pickPhoto = async () => 
  {
    this.state.uploadPhoto = await ImagePicker.launchImageLibraryAsync(
    {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
    });
    this.addPhoto(this.state.uploadPhoto)
  }


  addPhoto = async() => 
  {
   
    this.state ={
        uploadPhoto: this.state.uploadPhoto,
      }

    const idvalue = await AsyncStorage.getItem("whatsthat_user_id");
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    return fetch('http://127.0.0.1:3333/api/1.0.0/user/'+ idvalue + '/photo',
    {
      method : 'post',
      headers: {'Content-Type': 'image/png', 'X-Authorization' : value},
      body: this.state
    })
    
    .then(async(response) => 
    {
      if(response.status === 200)
        {
          return response.blob()             
        }
        else if (response.status === 401)
        {
          throw "Unauthorized"
        }
        else
        {
            throw "something went wrong"
        }
        
    })

    //.then((response) => response.json())
    .then(async (resBlob) =>
    {
        let data = URL.createObjectURL(resBlob)
     this.setState
      ({
        photo : resBlob,
      });
      console.log(this.state.photo)
    })
    
    .catch((error) =>
    {
      console.log(error);
    })
  }



  getInfo = async() => 
  {
    const idvalue = await AsyncStorage.getItem("whatsthat_user_id");
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    return fetch('http://127.0.0.1:3333/api/1.0.0/user/'+ idvalue,
    {
      method : 'get',
      headers: {'X-Authorization' : value},
      body: JSON.stringify(this.idvalue)
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
        else if (profileData = "")
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
        loadData : true,
        profileData : responseJson,
      });
      console.log(this.state.profileData)
    })
    
    .catch((error) =>
    {
      console.log(error);
    })
  }




  updateInfo = async() => 
  {
    console.log("Button clicked: " + this.state.first_name + " " + this.state.last_name + " " +this.state.email + " " + this.state.password)
    console.log("Validated and ready to send to the API")

    this.state ={
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      }
    const idvalue = await AsyncStorage.getItem("whatsthat_user_id");
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    return fetch('http://127.0.0.1:3333/api/1.0.0/user/'+ idvalue,
    {
      method : 'patch',
      headers: {'X-Authorization' : value},
      body: JSON.stringify(this.state)
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
        else if (profileData = "")
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
        // loadData : true,
         profileData : responseJson,
      });
      console.log(this.state.profileData)
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
    if (this.loadData = false)
    {
        return(
            <View>
                <ActivityIndicator/>
            </View>
        )
    }
    else if (this.loadData = true)
    {
    return(
      <ScrollView>
		  <View style={styles.container}>

        
   
                        <View style= {{flex:1}}>
       <View source={{uri: this.state.photo}} style={{width: 200, height: 200}}/>
        </View>
                        


          <View style={styles.getButton}>
                        <TouchableOpacity onPress={this.pickPhoto}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Browse Files for photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

<View>
    <View style={styles.view}>
      <Text>{JSON.stringify("User ID: " + this.state.profileData.user_id)}</Text>
      <Text>{JSON.stringify("First Name: " +this.state.profileData.first_name)}</Text>
      <Text>{JSON.stringify("Last Name: " + this.state.profileData.last_name)}</Text>
      <Text>{JSON.stringify("Email: " + this.state.profileData.email)}</Text>
      </View>
  </View>

 

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
                  
                    <View style={styles.getButton}>
                        <TouchableOpacity onPress={this.updateInfo}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Update information</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            
            </View>
            </ScrollView>
    );
  }
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
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
    loginbtn:
    {
        padding: 20
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

export default Profile;