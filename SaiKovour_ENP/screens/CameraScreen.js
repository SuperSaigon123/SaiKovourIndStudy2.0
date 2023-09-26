import React from 'react';
import { StyleSheet, Image, Text, View, useState, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button, IconButton } from 'react-native-paper';
import CamButton from '../components/CamButton';
import * as MediaLibrary from 'expo-media-library'

export default function CameraScreen({navigation}) {
    const [image, setImage] = React.useState(null)
    const [uri, setUri] = React.useState(null)
    const [type, setType] = React.useState(CameraType.back);
    const [permission, requestPermission] = React.useState(null);
    const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off)
    const cameraRef = React.useRef(null)

    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    React.useEffect(() => {
      (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        requestPermission(cameraStatus.status === 'granted')
      })();
    }, [])

    const takePicture = async() => {
      if(cameraRef) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          console.log(data)
          setImage(data.uri);
          setUri(data.uri)
        } catch(e){
          console.log(e);
        }
      }
    }

    const saveImage = async() => {
      console.log('test')
      if(image) {
        try {
          const asset = await MediaLibrary.createAssetAsync(image)
          alert('Picture saved!')
          setImage(null)
          setUri(null)
        } catch(e) {
          console.log(e)
        }
      }
    }

    if(permission === false){
      return <Text>No access to camera</Text>
    }

    function testFunc(){
      console.log("Test")
    }

    return (
      <View style={styles.container}>
        {!image ?
        <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30
          }}>
            <IconButton 
              icon={"repeat-variant"}
              mode={'outlined'}
              iconColor='#FFFFFF'
              size={40}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}/>
            <IconButton 
              icon={"flash"} 
              mode={'outlined'}
              iconColor={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
              size={40}
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on && console.log("Flash: ON")
                    : Camera.Constants.FlashMode.off
                )
              }/>
          </View>
        </Camera>
        :
        <Image source={{uri: image}} style={styles.camera}/>
}
        <View>
          {image ?
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 50
          }}>
            <Button 
              icon="refresh" 
              onPress={() =>{
                setImage(null)
                setUri(null)}} 
              style={styles.button}
              textColor='white'>
                Re-take
            </Button>
            <Button 
              icon="check" 
              onPress={() => {
                navigation.navigate('Import', {
                  paramKey: image
                })
                setImage(null)
                setUri(null)
              }} 
              style={styles.button}
              textColor='white'>
                Save
            </Button>
          </View>
          :
          <CamButton
            title={'Take picture'} 
            icon={'camera'}
            color={'white'}
            onPressFunc={takePicture}
            ></CamButton>
}
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
    button: {
      marginBottom: -20,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
    },
  });