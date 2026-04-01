import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  // ✅ Check onboarding status
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('onboardingCompleted');
      setIsOnboarded(value !== null);
    } catch (e) {
      console.log('Error reading onboarding status', e);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  // ✅ Fonts
  const [fontsLoaded] = useFonts({
    'MarkaziText-Medium': require('./fonts/MarkaziText-Medium.ttf'),
    'Karla-Regular': require('./fonts/Karla-Regular.ttf'),
    'Karla-Bold': require('./fonts/Karla-Bold.ttf'),
    'Inter-SemiBold': require('./fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('./fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnboarded ? (
          <Stack.Screen name="Profile">
            {(props) => (
              <ProfileScreen {...props} refreshOnboarding={checkOnboarding} />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Onboarding">
            {(props) => (
              <OnboardingScreen {...props} onComplete={checkOnboarding} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}