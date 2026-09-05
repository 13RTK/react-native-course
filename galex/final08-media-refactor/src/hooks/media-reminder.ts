import { checkMediaReminderAtom } from '@/atoms/reminder-atom';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { Alert } from 'react-native';

export function useMediaReminder() {
  const [checkMediaReminder, setCheckMediaReminder] = useAtom(
    checkMediaReminderAtom,
  );

  function checkMediaRemind() {
    if (checkMediaReminder) {
      Alert.alert('Media saved', 'Would want to check your medias?', [
        {
          text: 'Never remind me',
          onPress: () => setCheckMediaReminder(false),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Go To Gallery', onPress: () => router.push('/gallery') },
      ]);
    }
  }

  return {
    checkMediaRemind,
  };
}
