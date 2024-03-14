import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { HomeScreenHeader } from '../Components/HomeScreenHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

export const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setName(userData.name);
        setProfileImageUri(userData.profileImage);
      }
    };

    const clearTable = () => {
      db.transaction(tx => {
        tx.executeSql('DELETE FROM menu;', [], (_, result) => {
          console.log('Table cleared successfully', result);
        }, (t, error) => {
          console.log('Error clearing the table', error);
        });
      });
    };

    const fetchMenuData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const data = await response.json();
        setMenuItems(data.menu);

        clearTable(); 

        data.menu.forEach(item => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?);', 
              [item.name, item.price, item.description, `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`]
            );
          });
        });
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchUserData();
    fetchMenuData();
  }, []);

const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemText}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}` }}
        style={styles.menuItemImage}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeScreenHeader profileImage={profileImageUri} name={name} />
      <View style={styles.heroSection}>
      <View style={styles.heroWrapper}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.menuHeader}>Little Lemon Menu</Text>
          <Text style={styles.city}>Chicago</Text>
          <Text style={styles.greeting}>We're always delighted to serve you the most delicious food!</Text>
       </View>
        <Image
          style={styles.heroImage}
          source={{ uri: '/Users/eka-terina/Desktop/little-lemon/little-lemon/assets/Hero image.png' }} 
        />
      </View>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search..."
        placeholderTextColor="#EDEFEE"
      />
      </View>
       <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItemInfo: {
    marginLeft: 15,
    flex: 1,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10, 
    width: '95%', 
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  menuItemImage: {
    width: 70, 
    height: 70, 
    borderRadius: 35, 
  },
  listContentContainer: {
    alignItems: 'stretch',
  },
  heroSection: {
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    flexDirection: 'column',
  },
  heroTextContainer: {
    flex: 1,
  },
  menuHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4CE14',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 5,
  },
  greeting: {
    fontSize: 16,
    marginTop: 10,
    marginRight: 20,
    color: '#fff', 
  },
  heroImage: {
    width: 100, 
    height: 100,
    borderRadius: 50, 
  },
  searchInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 20,
    marginTop: 10,
    color: 'white',
  },
  heroWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});