
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './Screens/Onboarding';
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import { UserProvider, useUser } from './Context/UserContext';
import { initializeDb } from './database';
const Stack = createNativeStackNavigator();

function AppContent() {
  const { isOnboardingCompleted } = useUser();

  useEffect(() => {
    initializeDb(); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;