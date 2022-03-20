import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as FaceDetector from 'expo-face-detector';
import { match } from 'assert';


export default function Home({history}) {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [faceSquare,setFaceSquare]= React.useState({});
  const [type, setType] = useState(Camera.Constants.Type.back);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');
    })();
  }, []);

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
              type={type}
              ratio={'4:3'} 
              faceDetectorSettings={{
                mode: FaceDetector.FaceDetectorMode.accurate,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                runClassifications: FaceDetector.FaceDetectorClassifications.none,
                minDetectionInterval: 100,
                tracking: true,
              }}
              onFacesDetected={res => {
                if (res.faces[0]) {
                  setFaceSquare({
                      width: res.faces[0].bounds.size.width,
                      height: res.faces[0].bounds.size.height,
                      marginLeft: res.faces[0].bounds.origin.x,
                      marginTop: res.faces[0].bounds.origin.y,
                      smillingProbability: res.faces[0].smilingProbability
                  });
                  history.push({pathname: "/Record",type:type})
                }
                if (res.faces.length == 0) {
                  setFaceSquare({});
                }
              }}
            >
                      </Camera>
          </View>
          <View style={styles.buttons} >
          <Button
                    title="Flip Video"
                    color="black" 
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
                  
                </Button>
            </View>
     <View style={styles.buttons}>
                <Button title="Take video" onPress={() =>{ 
                  history.push({ pathname: "/Record", type: type })}} color="black"  />
        </View>
  
      </View>
    );
  
}

const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row',
        width: "100%",
      
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
      backgroundColor: "#fff",
     height: '13%',
     margin: '7 % 3% 5 % 0 %',
      borderRadius: 15,
      borderColor: "pink",
      borderWidth: 9,
     

    },
    


  div1:{
    width:'100%',
    height:'7%',
    backgroundColor: "blue",
    borderWidth:1,
  },
  div2:{
    width:'100%',
    backgroundColor: "blue",
    borderWidth:1,
  }
})