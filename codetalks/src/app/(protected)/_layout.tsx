import { getAuth, signOut } from '@react-native-firebase/auth';
import { Stack } from 'expo-router';

import colors from '@/styles/colors';
import Icon from '@react-native-vector-icons/material-design-icons';

export default function RoomsLayout() {
  function handleSignOut() {
    signOut(getAuth());
  }

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.orange,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Odalar' }} />
      <Stack.Screen
        name="rooms/[id]"
        options={{
          title: 'Oda Detayı',
          headerRight: () => <Icon name="logout" size={24} onPress={handleSignOut} color={colors.orange} />,
        }}
      />
    </Stack>
  );
}
