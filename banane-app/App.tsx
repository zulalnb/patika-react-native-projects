/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';
import Icon from '@react-native-vector-icons/material-design-icons';
import FlashMessage from 'react-native-flash-message';
import { AppStackParamList, AuthStackParamList } from '@/types/navigation';
import Signup from '@/screens/Auth/Signup';
import Login from '@/screens/Auth/Login';
import Messages from '@/screens/Messages';
import colors from '@/styles/colors';

const Stack = createStackNavigator<AuthStackParamList & AppStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
    </Stack.Navigator>
  );
};

function App() {
  const [userSession, setUserSession] = useState<boolean | undefined>();

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      setUserSession(!!user);
    });
  }, []);

  return (
    <NavigationContainer>
      {!userSession ? (
        <AuthStack />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="MessagesScreen"
            component={Messages}
            options={{
              title: 'dertler',
              headerTintColor: colors.darkGreen,
              headerRight: () => (
                <Icon
                  name="logout"
                  size={30}
                  color={colors.darkGreen}
                  onPress={() => signOut(getAuth())}
                />
              ),
            }}
          />
        </Stack.Navigator>
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
