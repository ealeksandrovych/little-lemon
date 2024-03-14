import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OnboardingScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isNameValid = (name) => {
    return name.length > 0 && /^[A-Za-z ]+$/.test(name);
  };

  const isFormValid = () => {
    return isNameValid(name) && isValidEmail(email);
  };

  const saveOnboardingData = async () => {
    if (isFormValid()) {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify({ name, email }));
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert("Error", "Failed to save user data.");
      }
    } else {
      Alert.alert("Validation failed", "Please check your input.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Little Lemon</Text>
        <Image style={styles.logo} source={require('/Users/eka-terina/Desktop/little-lemon/little-lemon/assets/Logo.png')} />
      </View>
        <Text style={styles.greeting}>We are happy to meet you. Please, enter your name and email.</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <Button
      title="Next"
      color="#841584" 
      style={styles.nextButton}
      onPress={saveOnboardingData}
      disabled={!isFormValid()}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow'
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 400,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
  },
  greeting: {
    width: '70%',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'regular',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  nextButton: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
});