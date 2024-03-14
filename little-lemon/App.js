
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen }  from './Screens/Onboarding';
import { ProfileScreen } from './Screens/Profile';
import { SplashScreen } from './Screens/Splash';
import { HomeScreen } from './Screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
      setIsOnboardingCompleted(onboardingStatus === 'true');
    };

    checkOnboardingStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
         {isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (

          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}