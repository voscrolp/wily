import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }

    login = async (email,password)=>{
        if (email && password){
            try{
              const response = await firebase.auth().signInWithEmailAndPassword(email,password)
              if(response){
                this.props.navigation.navigate('Transaction')
              }
            }
            catch(error){
                switch (error.code) {
                  case 'auth/user-not-found':
                    Alert.alert("user dosen't exists")
                    console.log("doesn't exist")
                    break
                  case 'auth/invalid-email':
                    Alert.alert('incorrect email or password')
                    console.log('invaild')
                    break
                }
              }
            }
            else{
                Alert.alert('enter email and password');
            }
        
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/booklogo.jpg')}
                        style={{ width: 200, height: 200 }}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>Wily</Text>
                </View>

                <View>
                    <TextInput
                        style={styles.loginBox}
                        placeholder="enter email Id"
                        keyboardType ='email-address'
                        onChangeText={(text)=>{
                          this.setState({
                            emailId: text
                          })
                        }}
                    />

                    <TextInput
                        style={styles.loginBox}
                        placeholder="enter Password"
                        secureTextEntry={true}
                        onChangeText = {(text)=>{
                            this.setState({
                              password: text
                            })
                        }}
                    />

                    <TouchableOpacity 
                     style={{ height: 30, width: 90, borderWidth: 1, paddingTop: 5, borderRadius: 7, marginLeft:120 }}
                     onPress = {this.login(this.state.emailId ,this.state.password)}
                    >
                        <Text style={{ textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>


                </View>
            </KeyboardAvoidingView>

        )
    }
}


const styles = StyleSheet.create({
    loginBox:
    {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    }
})


