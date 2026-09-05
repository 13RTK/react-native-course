import { useMicrophonePermissions } from 'expo-camera';
import { useState } from 'react';

export function useVideo() {
  const [isRecording, setIsRecording] = useState(false);
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();

  return {
    isRecording,
    setIsRecording,
    microphonePermission,
    requestMicrophonePermission,
  };
}
