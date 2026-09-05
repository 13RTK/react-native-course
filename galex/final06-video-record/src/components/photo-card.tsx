import { isAvailableAsync, shareAsync } from 'expo-sharing';
import { Alert, Image, TouchableOpacity, View } from 'react-native';

const PhotoCard = ({ photo }: { photo: { id: string; uri: string } }) => {
  async function shareImage() {
    const isAvailable = await isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Sharing is not available on this device');
      return;
    }

    await shareAsync(photo.uri, {
      dialogTitle: 'Galex Share',
      mimeType: 'image/jpeg',
      UTI: 'public.jpeg',
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
      key={photo.id}
      className='bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden aspect-square mb-3 w-[48.5%]'
    >
      <TouchableOpacity onLongPress={handleLongPress}>
        <Image
          source={{ uri: photo.uri }}
          resizeMode='cover'
          className='size-full'
        />
      </TouchableOpacity>
    </View>
  );
};

export default PhotoCard;
