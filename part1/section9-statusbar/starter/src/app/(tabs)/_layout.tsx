import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeTabs>
        <NativeTabs.Trigger name='index'>
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{
              default: 'house',
              selected: 'house.fill',
            }}
            md={{
              default: 'home',
              selected: 'home_filled',
            }}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name='about'>
          <NativeTabs.Trigger.Icon
            sf={{
              default: 'gear.circle',
              selected: 'gear.circle.fill',
            }}
            md={{
              default: 'settings',
              selected: 'settings',
            }}
          />
          <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
