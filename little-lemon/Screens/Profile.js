
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Switch, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; 
import { useUser } from '../Context/UserContext';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const { userData, saveOnboardingData, logout } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber);
      setProfileImage(userData.profileImage);
      setEmailNotifications(userData.emailNotifications);
    }
  }, [userData]);

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

  const handleSaveChanges = async () => {
    if (isValidPhoneNumber(phoneNumber)) {
      saveOnboardingData({ name, email, phoneNumber, profileImage, emailNotifications });
    } else {
      Alert.alert("Invalid phone number", "Please check the phone number and try again.");
    }
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Onboarding');
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
      <Button title="Save Changes" onPress={handleSaveChanges} />
      <Button title="Logout" onPress={handleLogout} color="#d9534f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#4f34eb',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: '#f5f105',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f105',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
});
export default Profile;