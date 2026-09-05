import { Media } from '@/types/media';
import { isAvailableAsync, shareAsync } from 'expo-sharing';
import { Alert, Image, TouchableOpacity, View } from 'react-native';

const MediaCard = ({ media }: { media: Media }) => {
  async function shareImage() {
    const isAvailable = await isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Sharing is not available on this device');
      return;
    }

    await shareAsync(media.uri, {
      dialogTitle: 'Galex Share',
      mimeType: media.type === 'image' ? 'image/jpeg' : 'video/mp4',
      UTI: media.type === 'image' ? 'public.jpeg' : 'public.mp4',
    });
  }

  function handleLongPress() {
    Alert.alert('Options', 'What do you want to do?', [
      {
        text: 'Delete',
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Share',
        onPress: shareImage,
      },
    ]);
  }

  return (
    <View
      key={media.id}
      className='bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden aspect-square mb-3 w-[48.5%]'
    >
      <TouchableOpacity onLongPress={handleLongPress}>
        <Image
          source={{ uri: media.uri }}
          resizeMode='cover'
          className='size-full'
        />
      </TouchableOpacity>
    </View>
  );
};

export default MediaCard;
