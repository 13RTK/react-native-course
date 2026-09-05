import { CameraType, CameraView } from 'expo-camera';
import { useRef, useState } from 'react';

export function useCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraViewRef = useRef<CameraView>(null);

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return {
    facing,
    isCameraReady,
    setIsCameraReady,
    cameraViewRef,

    toggleCameraFacing,
  };
}
