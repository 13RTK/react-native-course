import { ActivityIndicator, View } from 'react-native';

const Spinner = () => {
  return (
    <View className='justify-center items-center flex flex-1'>
      <ActivityIndicator />
    </View>
  );
};

export default Spinner;
