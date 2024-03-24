import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      source={require('/Users/eka-terina/Desktop/little-lemon/little-lemon/assets/Logo.png')} 
      style={styles.logo}
    />
    <Text style={styles.text}>Little Lemon</Text>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', 
  },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SplashScreen;

 