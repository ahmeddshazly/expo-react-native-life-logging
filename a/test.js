import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as Sharing from "expo-sharing";
import Home from './home';

export default function Record({history}) {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      history.push('/')
    }, 1000);
  }, [])

  if (hasCameraPermission === null || hasAudioPermission === null ) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }
    return (
      <View style={{ flex: 1}}>
          <View style={styles.cameraContainer}>
          <Camera 
            ></Camera>
          </View>
            <View style={styles.buttons}>
          <Button title="Stop Video"     color="white" /> 
          </View>
          <View   style={styles.buttons}>
          <Button title="take Video"    color="white" /> 
          </View>
          
      </View> 
    );  
}
const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row',
      width:"100%",
      height:20
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  },
  video: {
    alignSelf: 'center',
    width: 350,
    height: 220,
  },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: "red",
        height: '11%',
        margin: '29 % 5% 6 % 0 %',
        borderRadius: 20,
        borderColor: "pink",
        borderWidth: 9,
    },
})