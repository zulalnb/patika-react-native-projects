import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import Loading from '@/components/Loading';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [userSession, setUserSession] = useState<boolean | undefined>();

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      setUserSession(!!user);
      setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return <Loading />;

  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Protected guard={!userSession}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!!userSession}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <FlashMessage position="top" />
    </KeyboardProvider>
  );
}
