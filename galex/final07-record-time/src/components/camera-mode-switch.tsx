import { Host, Icon } from '@expo/ui';
import { type CameraMode } from 'expo-camera';

import { Pressable, View } from 'react-native';

const CameraModeSwitch = ({
  cameraMode,
  setCameraMode,
  isRecording,
}: {
  cameraMode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
  isRecording: boolean;
}) => {
  return (
    <View className='absolute bottom-44 w-full items-center'>
      <View className='flex-row gap-1 rounded-full bg-black/60 p-1'>
        {/* Toggle to take picture */}
        <Pressable
          pointerEvents='box-only'
          onPress={() => setCameraMode('picture')}
          disabled={isRecording}
          className={`size-12 items-center justify-center rounded-full ${cameraMode === 'picture' ? 'bg-white' : ''}`}
        >
          <Host matchContents>
            <Icon
              name={Icon.select({
                ios: 'camera.fill',
                android: import('@expo/material-symbols/photo_camera.xml'),
              })}
              size={24}
              color={cameraMode === 'picture' ? 'black' : 'white'}
            />
          </Host>
        </Pressable>

        {/* Toggle to record video */}
        <Pressable
          pointerEvents='box-only'
          disabled={isRecording}
          onPress={() => setCameraMode('video')}
          className={`size-12 items-center justify-center rounded-full ${cameraMode === 'video' ? 'bg-white' : ''}`}
        >
          <Host matchContents>
            <Icon
              name={Icon.select({
                ios: 'video.fill',
                android: import('@expo/material-symbols/videocam.xml'),
              })}
              size={25}
              color={cameraMode === 'video' ? 'black' : 'white'}
            />
          </Host>
        </Pressable>
      </View>
    </View>
  );
};

export default CameraModeSwitch;
