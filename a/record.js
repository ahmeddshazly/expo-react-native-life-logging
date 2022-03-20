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
  const [record, setRecord] = useState(null);
  const [rec, setRec] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');
      console.log(history.type)
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if(record!==null){
        const UTI = 'public.item';
        const shareResult = await Sharing.shareAsync(record, {UTI});
        history.push('/test')
      }
    })();
  }, [record]);
  useEffect(() => {
    (async () => {
       if(!rec&&camera){
        setTimeout(() => {
          console.log("first")
          takeVideo();
          setRec(true);
        }, 1000);
       }
    })();
  }, [camera]);
  const takeVideo = async () => {
    if(camera){
        const data = await camera.recordAsync({
          maxDuration:60
        })
        setRecord(data.uri);
        console.log(data.uri)
    }
  }
  const stopVideo = async () => {
    await camera.stopRecording();
  }

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
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio} 
              type={history.entries[history.length-1].type}
            ></Camera>
          </View>
            <View style={styles.buttons}>
          <Button title="Stop Video"  onPress={() => stopVideo()}  color="white" /> 
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