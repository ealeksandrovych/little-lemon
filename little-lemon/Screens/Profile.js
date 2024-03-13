import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [emailNotifications, setEmailNotifications] = useState(false);

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { name, email, phoneNumber, profileImage, emailNotifications } = JSON.parse(userData);
        setName(name);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setProfileImage(profileImage);
        setEmailNotifications(emailNotifications);
      }
    })();
  }, []);

  const saveData = async () => {

    if (!isValidPhoneNumber(phoneNumber)) {
    Alert.alert("Invalid Phone Number", "Please enter a valid US phone number.");
    return;
  }
    try {
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify({ name, email, phoneNumber, profileImage, emailNotifications })
      );
      Alert.alert("Data Saved", "Your profile information has been saved successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to save the data.");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.navigate('Onboarding');
  };

  const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneNumberRegex.test(phoneNumber);
};

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Text style={styles.profileImagePlaceholder}>
          {name.charAt(0)}{email.charAt(0)}
        </Text>
      )}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      <View style={styles.switchContainer}>
        <Text>Email Notifications</Text>
        <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
      </View>
      <Button title="Save Changes" onPress={saveData} />
      <Button title="Logout" onPress={logout} color="#d9534f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
});

 