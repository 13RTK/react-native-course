import { useMicrophonePermissions } from 'expo-camera';
import { useEffect, useState } from 'react';

export function useVideo() {
  const [isRecording, setIsRecording] = useState(false);
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();

  const [recordTime, setRecordTime] = useState(0);
  const recordMinute = Math.floor(recordTime / 60);
  const recordSecond = recordTime % 60;

  useEffect(() => {
    setRecordTime(0);
    let timer = null;

    if (isRecording) {
      timer = setInterval(() => {
        setRecordTime((current) => current + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRecording]);

  return {
    isRecording,
    setIsRecording,
    microphonePermission,
    requestMicrophonePermission,

    recordMinute,
    recordSecond,
  };
}
