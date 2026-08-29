import type { Feed } from '@/schemas/feed';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import { Text, View } from 'react-native';

const StyledImage = cssInterop(Image, { className: 'style' });

export function FeedCard({ feed }: { feed: Feed }) {
  return (
    <View
      className='overflow-hidden rounded-2xl bg-white'
      style={{ borderCurve: 'continuous' }}
    >
      <StyledImage
        source={{ uri: feed.image }}
        accessibilityLabel={feed.title}
        contentFit='cover'
        className='aspect-[3/2] w-full'
      />

      <View className='gap-2 p-4'>
        <Text
          selectable
          numberOfLines={1}
          className='text-lg font-semibold text-gray-900'
        >
          {feed.title}
        </Text>
        <Text
          selectable
          numberOfLines={3}
          className='text-sm leading-5 text-gray-600'
        >
          {feed.description}
        </Text>
      </View>
    </View>
  );
}
