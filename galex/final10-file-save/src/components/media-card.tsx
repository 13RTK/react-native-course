import { mediasAtom } from '@/atoms/medias-atom';
import { Media } from '@/types/media';
import { Host, Icon } from '@expo/ui';
import { isAvailableAsync, shareAsync } from 'expo-sharing';
import { useSetAtom } from 'jotai';
import { Alert, Image, TouchableOpacity, View } from 'react-native';

const MediaCard = ({ media }: { media: Media }) => {
  const setMedias = useSetAtom(mediasAtom);

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
        onPress: () =>
          setMedias((medias) =>
            medias.filter((mediaItem) => mediaItem.id !== media.id),
          ),
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

      {media.type === 'video' && (
        <View className='absolute right-2 top-2 size-8 items-center justify-center rounded-full bg-black/60'>
          <Host matchContents>
            <Icon
              name={Icon.select({
                ios: 'play.fill',
                android: import('@expo/material-symbols/play_arrow.xml'),
              })}
              size={17}
              color='#fff'
            />
          </Host>
        </View>
      )}
    </View>
  );
};

export default MediaCard;
