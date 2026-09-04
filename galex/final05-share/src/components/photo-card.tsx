import { Image, View } from 'react-native';

const PhotoCard = ({ photo }: { photo: { id: string; uri: string } }) => {
  return (
    <View
      key={photo.id}
      className='bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden aspect-square mb-3 w-[48.5%]'
    >
      <Image
        source={{ uri: photo.uri }}
        resizeMode='cover'
        className='size-full'
      />
    </View>
  );
};

export default PhotoCard;
