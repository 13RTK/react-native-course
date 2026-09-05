import { photosAtom } from '@/atoms/photos-atom';
import { checkPhotoReminderAtom } from '@/atoms/reminder-atom';
import CameraActionButton from '@/components/camera-action-button';
import CameraFaceSwitch from '@/components/camera-face-switch';
import CameraModeSwitch from '@/components/camera-mode-switch';
import Spinner from '@/components/spinner';
import { useCamera } from '@/hooks/camera';
import { usePicture } from '@/hooks/picture';
import { useVideo } from '@/hooks/video';
import { Host, Icon } from '@expo/ui';
import { CameraView } from 'expo-camera';
import * as Crypto from 'expo-crypto';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { cssInterop } from 'nativewind';
import { ComponentProps, ComponentType, RefAttributes } from 'react';
import { Alert, Button, Pressable, Text, View } from 'react-native';

type StyledCameraViewProps = ComponentProps<typeof CameraView> & {
  className?: string;
} & RefAttributes<CameraView>;

const StyledCameraView = cssInterop(CameraView, {
  className: 'style',
}) as ComponentType<StyledCameraViewProps>;

export default function Camera() {
  const {
    facing,
    toggleCameraFacing,
    isCameraReady,
    setIsCameraReady,
    cameraViewRef,
    cameraMode,
    setCameraMode,
  } = useCamera();

  const {
    isTakingPhoto,
    setIsTakingPhoto,
    cameraPermission,
    requestCameraPermission,
  } = usePicture();

  const {
    isRecording,
    setIsRecording,
    microphonePermission,
    requestMicrophonePermission,
  } = useVideo();

  async function handleTakePhoto() {
    if (!cameraViewRef.current || isCameraDisabled) {
      return;
    }

    setIsTakingPhoto(true);

    try {
      const pictureRef = await cameraViewRef.current?.takePictureAsync({
        quality: 1,
      });

      setPhotos([...photos, { id: Crypto.randomUUID(), uri: pictureRef.uri }]);

      // Alert only reminder be true
      if (checkPhotoReminder) {
        Alert.alert('Photo saved', 'Would want to check your photos?', [
          {
            text: 'Never remind me',
            onPress: () => setCheckPhotoReminder(false),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'Go To Gallery', onPress: () => router.push('/gallery') },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsTakingPhoto(false);
    }
  }

  const isCameraDisabled = !isCameraReady || isTakingPhoto;

  const [photos, setPhotos] = useAtom(photosAtom);
  const [checkPhotoReminder, setCheckPhotoReminder] = useAtom(
    checkPhotoReminderAtom,
  );

  async function handleRecordVideo() {
    if (!cameraViewRef.current || !isCameraReady) {
      return;
    }

    if (isRecording) {
      cameraViewRef.current.stopRecording();
      return;
    }

    let hasMicrophonePermission = microphonePermission?.granted ?? false;

    if (!hasMicrophonePermission) {
      const result = await requestMicrophonePermission();
      hasMicrophonePermission = result.granted;
    }

    if (!hasMicrophonePermission) {
      Alert.alert('Microphone Permission Required');
      return;
    }

    setIsRecording(true);

    try {
      const video = await cameraViewRef.current.recordAsync();

      console.log(video);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRecording(false);
    }
  }

  function handleAction() {
    if (cameraMode === 'picture') {
      handleTakePhoto();
      return;
    }

    handleRecordVideo();
  }

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <Spinner />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className='flex-1 flex justify-center items-center'>
        <Text className='text-center pb-10 dark:text-white'>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title='grant permission' />
      </View>
    );
  }

  return (
    <View className='flex-1 bg-black'>
      <StyledCameraView
        onCameraReady={() => setIsCameraReady(true)}
        className='flex-1 w-full'
        facing={facing}
        ref={cameraViewRef}
        mode={cameraMode}
        autofocus='on'
      />
      {/* Camera Switch Button */}
      <CameraFaceSwitch
        toggleCameraFacing={toggleCameraFacing}
        isRecording={isRecording}
      />

      {/* Camera Mode Toggle */}
      <CameraModeSwitch
        cameraMode={cameraMode}
        setCameraMode={setCameraMode}
        isRecording={isRecording}
      />

      {/* Action Button */}
      <CameraActionButton
        isCameraDisabled={isCameraDisabled}
        handleAction={handleAction}
        cameraMode={cameraMode}
        isRecording={isRecording}
      />
    </View>
  );
}
