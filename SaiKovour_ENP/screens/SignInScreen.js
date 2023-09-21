import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Keyboard} from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function SignInScreen({navigation}) {

  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      Alert.alert(error.toString())
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      Alert.alert(error.toString())
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
        {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
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
      <Button labelStyle={{ fontSize: 20, marginTop: 15 }} icon="home" mode="contained" onPress={signIn} style={styles.button} buttonColor='green'>
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