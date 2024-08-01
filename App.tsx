import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

export default function App() {
  const device = useCameraDevice('front');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function _loadPermission() {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    }
    _loadPermission();
  }, []);

  if (device && hasPermission) {
    return (
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    );
  } else {
    return null;
  }
}
