import { Host, Icon } from '@expo/ui';
import { type CameraMode } from 'expo-camera';
import { Pressable, View } from 'react-native';

const CameraActionButton = ({
  isCameraDisabled,
  handleAction,
  cameraMode,
  isRecording,
}: {
  isCameraDisabled: boolean;
  handleAction: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}) => {
  return (
    <View className='absolute bottom-16 w-full items-center'>
      <Pressable
        className={`items-center justify-center border-4 border-white bg-black/30 p-1 size-20 rounded-full ${isCameraDisabled ? 'opacity-50' : ''}`}
        pointerEvents='box-only'
        disabled={isCameraDisabled}
        onPress={handleAction}
      >
        {cameraMode === 'picture' && (
          <View className='size-full items-center justify-center rounded-full bg-white'>
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
        )}

        {cameraMode === 'video' && (
          <View
            className={`bg-red-500 
                ${isRecording ? ' size-8 rounded-lg ' : ' size-full rounded-full'}
                  `}
          ></View>
        )}
      </Pressable>
    </View>
  );
};

export default CameraActionButton;
