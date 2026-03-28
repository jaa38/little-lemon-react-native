import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isOnboardingCompleted');

        if (value === 'true') {
          setIsOnboardingCompleted(true);
        }
      } catch (e) {
        console.log('Error loading onboarding status', e);
      }
    };

    loadOnboardingStatus();

    // ✅ Keep splash screen for 10 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10,000ms = 10 seconds
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <Stack.Screen name='Profile' component={ProfileScreen} />
        ) : (
          <Stack.Screen name='Onboarding'>
            {(props) => (
              <OnboardingScreen
                {...props}
                setIsOnboardingCompleted={setIsOnboardingCompleted}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
