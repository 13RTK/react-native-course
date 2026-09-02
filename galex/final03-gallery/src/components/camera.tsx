import { Host, Icon } from '@expo/ui';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { cssInterop } from 'nativewind';
import {
  ComponentProps,
  ComponentType,
  RefAttributes,
  useRef,
  useState,
} from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

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

    setIsTakingPhoto(false);

    try {
      const pictureRef = await cameraViewRef.current?.takePictureAsync({
        quality: 1,
      });
      console.log(pictureRef);
    } catch (error) {
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
        <TouchableOpacity
          className={`items-center justify-center border-4 border-white bg-black/30 p-1 size-20 rounded-full ${isCameraDisabled} ? 'opacity-45' : ''`}

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
        </TouchableOpacity>
      </View>
    </View>
  );
}
