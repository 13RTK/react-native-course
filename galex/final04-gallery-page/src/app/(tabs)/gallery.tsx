import { photosAtom } from '@/atoms/photos-atom';
import { useAtomValue } from 'jotai';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GalleryScreen = () => {
  const photos = useAtomValue(photosAtom);

  return (
    <SafeAreaView>
      <Text>GalleryScreen</Text>
      <View>
        <Text>
          {photos.map((photo) => (
            <Text>{photo.uri}</Text>
          ))}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default GalleryScreen;
