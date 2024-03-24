import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
      setIsOnboardingCompleted(onboardingStatus === 'true');

      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    };

    loadUserData();
  }, []);

  const saveOnboardingData = async (data) => {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    setUserData(data);
    setIsOnboardingCompleted(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('onboardingCompleted');
    setUserData(null);
    setIsOnboardingCompleted(false);
  };

  return (
    <UserContext.Provider value={{ isOnboardingCompleted, setIsOnboardingCompleted, userData, saveOnboardingData, logout }}>
      {children}
    </UserContext.Provider>
  );
};