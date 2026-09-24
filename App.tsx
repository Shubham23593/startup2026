import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import notifee from '@notifee/react-native';
import { lightTheme, darkTheme } from './src/theme/theme';
import AppNavigator from './src/navigation/AppNavigator';
import { initDatabase } from './src/database/watermelon';

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    async function setup() {
      // Request notification permission
      await notifee.requestPermission();
      // Init offline DB
      await initDatabase();
      // Create notification channel
      await notifee.createChannel({
        id: 'deadlines',
        name: 'Deadline Reminders',
        importance: 4,
        sound: 'default',
        vibration: true,
      });
    }
    setup();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar
              barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
              backgroundColor={theme.colors.background}
            />
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
