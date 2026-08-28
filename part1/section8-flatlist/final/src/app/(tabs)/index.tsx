import { FeedCard } from '@/components/feed-card';
import { getFeeds } from '@/services/apiFeed';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const {
    data: feeds,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['feeds'],
    queryFn: getFeeds,
  });

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 flex justify-center items-center'>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} className='android:mt-8'>
      <FlatList
        data={feeds}
        renderItem={({ item: feed }) => <FeedCard feed={feed} />}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
