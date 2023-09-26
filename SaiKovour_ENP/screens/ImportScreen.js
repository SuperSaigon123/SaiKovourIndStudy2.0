import React, {useEffect} from 'react';
import { StyleSheet, Text, View, useState, Image} from 'react-native';
import { Button } from 'react-native-elements';
import startingPicture from '../assets/ObamaExample.jpg'

import * as ImagePicker from 'expo-image-picker';

export default function ImportScreen({route}){

  let initial = null;
  const [image, setImage] = React.useState(null); 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    useEffect(() => {
      console.log(route)
      console.log(route.params)

      if (route.params.paraKey !== undefined){
        initial = route.params.paraKey
      }
    });

  return (
      <View style={styles.container}>
        <Text>Import screen</Text> 
        <Image style={styles.image} source={image} /> 
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
    },
    logo: {
      width: 100,
      height: 100,
    },
  }); 