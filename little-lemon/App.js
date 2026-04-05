import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/Home';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('onboardingCompleted');
      setIsOnboarded(value === 'true');
    } catch (e) {
      console.log('Error reading onboarding status', e);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  const [fontsLoaded] = useFonts({
    'MarkaziText-Medium': require('./fonts/MarkaziText-Medium.ttf'),
    'Karla-Regular': require('./fonts/Karla-Regular.ttf'),
    'Karla-Bold': require('./fonts/Karla-Bold.ttf'),
    'Inter-SemiBold': require('./fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('./fonts/Inter-Medium.ttf'),
  });

  // ⏳ Wait for everything
  if (!fontsLoaded || isOnboarded === null) return null;

  // 🟡 SHOW SPLASH FIRST
  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  // 🟢 THEN SHOW APP
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnboarded ? (
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Profile'>
              {(props) => (
                <ProfileScreen {...props} refreshOnboarding={checkOnboarding} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name='Onboarding'>
            {(props) => (
              <OnboardingScreen {...props} onComplete={checkOnboarding} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
