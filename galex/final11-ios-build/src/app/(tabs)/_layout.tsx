import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name='index'>
        <NativeTabs.Trigger.Label>Lens</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf='camera' md='camera' />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='gallery'>
        <NativeTabs.Trigger.Icon sf='photo' md='photo_album' />
        <NativeTabs.Trigger.Label>Gallery</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
