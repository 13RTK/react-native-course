import { Text, TouchableOpacity } from 'react-native';

const CameraFaceSwitch = ({
  toggleCameraFacing,
  isRecording,
}: {
  toggleCameraFacing: () => void;
  isRecording: boolean;
}) => {
  return (
    <TouchableOpacity
      className='absolute top-16 right-4 rounded-full bg-black/50 px-4 py-3'
      onPress={toggleCameraFacing}
      disabled={isRecording}
    >
      <Text className='font-semibold text-white'>Switch Camera</Text>
    </TouchableOpacity>
  );
};

export default CameraFaceSwitch;
