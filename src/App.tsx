import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Frame,
  useCameraDevice,
  Camera as VisionCamera,
} from 'react-native-vision-camera';
import {
  Face,
  Camera,
  FaceDetectionOptions,
} from 'react-native-vision-camera-face-detector';

export default function App() {
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    // detection options
  }).current;

  const device = useCameraDevice('front');
  const [hasPermission, setHasPermission] = useState(false);
  const [arrayFace, setArrayFace] = useState<Face[]>([]);

  useEffect(() => {
    async function _loadPermission() {
      const cameraPermission = await VisionCamera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    }
    _loadPermission();
  }, []);

  function handleFacesDetection(faces: Face[], frame: Frame) {
    console.log(
      new Date().toTimeString(),
      'faces',
      faces.length,
      'frame',
      frame.toString(),
    );
    setArrayFace(faces);
  }

  if (device && hasPermission) {
    return (
      <View style={styles.container}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          pixelFormat={'rgb'}
          faceDetectionCallback={handleFacesDetection}
          faceDetectionOptions={faceDetectionOptions}
        />
        <Text style={styles.textFace}>{`Face: ${arrayFace.length}`}</Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textFace: {
    fontSize: 24,
    lineHeight: 28,
    color: 'red',
    position: 'absolute',
    bottom: 400,
    left: 16,
    right: 16,
    textAlign: 'center',
  },
});
