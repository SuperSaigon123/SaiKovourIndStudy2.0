import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome screen!</Text>

      <View style={styles.buttons}>
        <Button icon="login" mode="contained" onPress={() => navigation.navigate('Sign In')} style={styles.button} buttonColor='blue'>
          Sign In
        </Button>

        <Button icon="plus-box-outline" mode="contained" onPress={() => navigation.navigate('Sign Up')} style={styles.button} buttonColor='green'>
          Sign Up
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flex: 0.75,
    marginTop: 50,
  },

  button: {
    marginTop: 10,
    width: 350,
    fontSize: 20,
  },

  text: {
    fontSize: 20,
  }
});