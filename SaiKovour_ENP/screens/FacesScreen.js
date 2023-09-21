import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function FacesScreen() {
    return (
      <View style={styles.container}>
        <Text>Faces screen</Text>
  
        <Button title="Click me" style={styles.button} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#75DDDD',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginTop: 10
    }
  });