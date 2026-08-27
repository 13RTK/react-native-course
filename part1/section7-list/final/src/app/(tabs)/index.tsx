import { getFeeds } from '@/services/apiFeed';
import { Host, List, ListItem } from '@expo/ui';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
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
    <Host style={{ flex: 1 }}>
      {isSuccess && (
        <List>
          {feeds.map((feed) => (
            <ListItem supportingText={feed.description} key={feed.id}>
              {feed.title}
            </ListItem>
          ))}
        </List>
      )}
    </Host>
  );
}
