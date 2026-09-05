import { useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export function usePicture() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  return {
    isTakingPhoto,
    setIsTakingPhoto,
    cameraPermission,
    requestCameraPermission,
  };
}
