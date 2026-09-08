import { mediasAtom } from '@/atoms/medias-atom';
import MediaCard from '@/components/media-card';
import { Link } from 'expo-router';

import { useAtomValue } from 'jotai';
import { FlatList, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const GalleryScreen = () => {
  const medias = useAtomValue(mediasAtom);

  return (
    <SafeAreaView className='flex-1 bg-stone-50 dark:bg-zinc-950'>
      <FlatList
        data={medias}
        keyExtractor={(media) => media.id}
        contentContainerClassName='grow px-4 pb-8'
        columnWrapperClassName='justify-between'
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: media }) => <MediaCard media={media} />}
        ListHeaderComponent={
          <View className='flex-row items-end justify-between pb-5 pt-3'>
            <View className='gap-1'>
              <Text className='text-3xl font-bold tracking-tight text-zinc-950 dark:text-white'>
                Gallery
              </Text>

              <Text className='text-sm text-zinc-500 dark:text-zinc-400'>
                Medias captured with Galex
              </Text>
            </View>

            <View className='rounded-full bg-zinc-200 px-3 py-1.5 dark:bg-zinc-800'>
              <Text className='text-xs font-semibold text-zinc-700 dark:text-zinc-200'>
                {medias.length} {medias.length === 1 ? 'Media' : 'Medias'}
              </Text>
            </View>
          </View>
        }

        ListEmptyComponent={
          <View className='flex-1 items-center justify-center px-8 pb-24'>
            <View className='mb-5 size-20 items-center justify-center rounded-3xl bg-zinc-200 dark:bg-zinc-800'>
              <Text className='text-4xl'>📷</Text>
            </View>

            <Text className='text-center text-xl font-semibold text-zinc-900 dark:text-white'>
              No medias yet
            </Text>

            <Text className='pt-2 text-center text-sm leading-5 text-zinc-500 dark:text-zinc-400'>
              Take your first media at
              <Link href={'/'}>
                <Text className='underline'> Len</Text>
              </Link>
              , and they will appear here
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default GalleryScreen;
