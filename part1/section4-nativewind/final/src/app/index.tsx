import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-2xl text-red-500'>
        Edit src/app/index.tsx to edit this screen.
      </Text>
      <Text onPress={() => router.navigate('/about')}>Go To About</Text>
    </View>
  );
}
