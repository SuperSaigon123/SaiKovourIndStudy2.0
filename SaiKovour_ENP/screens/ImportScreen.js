import React from 'react';
import { StyleSheet, Text, View, useState } from 'react-native';
import { Button } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';

export default function ImportScreen() {

  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
      <View style={styles.container}>
        <Text>Import screen</Text>
  
        <Button title="Click me" style={styles.button} onPress={pickImage} />
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