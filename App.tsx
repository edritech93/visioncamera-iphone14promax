import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Camera,
  Frame,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';

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

  const frameProcessor = useFrameProcessor((frame: Frame) => {
    'worklet';
    console.log(
      new Date().toTimeString(),
      `Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`,
    );
  }, []);

  if (device && hasPermission) {
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        pixelFormat={'rgb'}
        frameProcessor={frameProcessor}
      />
    );
  } else {
    return null;
  }
}
