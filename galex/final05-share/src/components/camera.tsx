import { photosAtom } from '@/atoms/photos-atom';
import { checkPhotoReminderAtom } from '@/atoms/reminder-atom';
import { Host, Icon } from '@expo/ui';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as Crypto from 'expo-crypto';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { cssInterop } from 'nativewind';
import {
  ComponentProps,
  ComponentType,
  RefAttributes,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type StyledCameraViewProps = ComponentProps<typeof CameraView> & {
  className?: string;
} & RefAttributes<CameraView>;

const StyledCameraView = cssInterop(CameraView, {
  className: 'style',
}) as ComponentType<StyledCameraViewProps>;

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const cameraViewRef = useRef<CameraView>(null);

  const isCameraDisabled = !isCameraReady || isTakingPhoto;

  const [photos, setPhotos] = useAtom(photosAtom);
  const [checkPhotoReminder, setCheckPhotoReminder] = useAtom(
    checkPhotoReminderAtom,
  );

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className='flex-1 flex justify-center items-center'>
        <Text className='text-center pb-10 dark:text-white'>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

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

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className='flex-1 bg-black'>
      <StyledCameraView
        onCameraReady={() => setIsCameraReady(true)}
        className='flex-1 w-full'
        facing={facing}
        ref={cameraViewRef}
      />
      {/* Camera Switch Button */}
      <TouchableOpacity
        className='absolute top-16 right-4 rounded-full bg-black/50 px-4 py-3'
        onPress={toggleCameraFacing}
      >
        <Text className='font-semibold text-white'>Switch Camera</Text>
      </TouchableOpacity>

      {/* Take Photo Button */}
      <View className='absolute bottom-16 w-full items-center'>
        <Pressable
          className={`items-center justify-center border-4 border-white bg-black/30 p-1 size-20 rounded-full ${isCameraDisabled ? 'opacity-50' : ''}`}
          pointerEvents='box-only'
          disabled={isCameraDisabled}
          onPress={handleTakePhoto}
        >
          <View className='h-full w-full items-center justify-center rounded-full bg-white'>
            <Host matchContents>
              <Icon
                name={Icon.select({
                  ios: 'camera.fill',
                  android: import('@expo/material-symbols/photo_camera.xml'),
                })}
                size={28}
                color='black'
              />
            </Host>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
