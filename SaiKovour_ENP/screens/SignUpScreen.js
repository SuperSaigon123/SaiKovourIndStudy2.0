import { initializeApp } from "firebase/app";
import 'firebase/auth';
import Constants from 'expo-constants';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

let userRef = null
let user = null

export default function SignUpScreen({navigation}) {

  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
      <IconButton
        icon="arrow-left"
        size= {30}
        style={{marginRight: 300, marginBottom: 300, marginTop: 300}}
        onPress={() => navigation.navigate('Welcome')}
      >

      </IconButton>
      <TextInput 
        label="username" 
        style={{width: 300, marginBottom: 30}} 
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        ></TextInput>
      <TextInput 
        label="password" 
        style={{width: 300, marginBottom: 10}} 
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        ></TextInput>
      <Button labelStyle={{ fontSize: 20, marginTop: 15 }} icon="home" mode="contained" onPress={signUp} style={styles.button} buttonColor='green'>
          Go Home
      </Button>
      <StatusBar style="auto" />
      </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    marginTop: 50,
    width: 200,
    height: 50,
    marginBottom: 400
  },
});