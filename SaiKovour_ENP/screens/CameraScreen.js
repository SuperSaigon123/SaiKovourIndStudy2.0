import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, IconButton } from 'react-native-paper';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleRecordButton = async () => {
    if (isRecording) {
      // Stop recording
      cameraRef.current.stopRecording();
      setIsRecording(false);
    } else {
      // Start recording
      const recording = await cameraRef.current.recordAsync();
      console.log('Recording:', recording);

      // Send the video to the FastAPI server for processing
      sendMediaToServer(recording.uri, 'video/mp4');
      
      setIsRecording(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo);

        // Send the photo to the FastAPI server for processing
        sendMediaToServer(photo.uri, 'image/jpeg');
      } catch (e) {
        console.error('Error taking picture:', e);
      }
    }
  };

  const sendMediaToServer = async (uri, contentType) => {
    const apiUrl = 'http://127.0.0.1:8000/process_media';
    const formData = new FormData();
    console.log(contentType)
    formData.append('file', {
      uri: uri,
      type: contentType,
      name: 'media',
    });
    console.log(formData)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      

      if (response.ok) {
        // Process the response, assuming it is a media file
        const processedMediaUri = URL.createObjectURL(await response.blob());
        console.log('Processed Media URI:', processedMediaUri);
        // Handle the processed media as needed
      } else {
        console.error('Failed to send media to FastAPI server');
      }
    } catch (error) {
      console.error('Error sending media to server:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={cameraRef}
        useCamera2Api={false}
      >
        <View style={styles.cameraControls}>
          <IconButton
            icon="camera-switch"
            color="#fff"
            size={30}
            onPress={toggleCameraType}
          />
        </View>
      </Camera>

      <View style={styles.recordButtonContainer}>
        <TouchableOpacity onPress={handleRecordButton}>
          <View
            style={[
              styles.recordButton,
              isRecording ? styles.recording : null,
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.captureButtonContainer}>
        <TouchableOpacity onPress={takePicture}>
          <View style={styles.captureButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  recordButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  recordButton: {
    width: 60,
    height: 60,
    bottom: 110,
    borderRadius: 30,
    backgroundColor: '#FF0000',
  },
  recording: {
    backgroundColor: '#FF0000',
    borderWidth: 2,
    borderColor: '#fff',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  captureButton: {
    width: 60,
    height: 60,
    bottom: 110,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});