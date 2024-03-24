import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const HomeHeader = ({ profileImage, name }) => {
  const navigation = useNavigation();

  const getInitials = (nameString) => {
  if (!nameString) return '';  

  const names = nameString.split(' ');
  const initials = names.map(name => name.charAt(0)).join('');
  return initials.toUpperCase();
};

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('/Users/eka-terina/Desktop/little-lemon/little-lemon/assets/Logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.initialsText}>
              {getInitials(name)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeHeader;