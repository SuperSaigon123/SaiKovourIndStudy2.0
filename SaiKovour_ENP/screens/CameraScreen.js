import React from 'react';
import { StyleSheet, Image, Text, View, useState, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button } from 'react-native-elements';
import CamButton from '../components/CamButton';

export default function CameraScreen() {
    const [image, setImage] = React.useState[null]
    const [type, setType] = React.useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const cameraRef = React.useRef(null)

    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async() => {
      if(cameraRef) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          setImage[data.uri]
        } catch(e){
          console.log(e)
        }
      }
    }

    return (
      <View style={styles.container}>
        {!image ?
        <Camera style={styles.camera}> 
          <Text>Hello</Text>
        </Camera>
        :
        <Image />}
        <View>
          <CamButton
            title={'Take picture'} 
            icon={'camera'}
            color={'white'}
            
            ></CamButton>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      paddingBottom: 120,
    },
    camera: {
      flex: 1,
    },
  });