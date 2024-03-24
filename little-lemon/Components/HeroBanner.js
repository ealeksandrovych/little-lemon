import React from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';

const HeroBanner = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.heroSection}>
      <View style={styles.heroWrapper}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.menuHeader}>Little Lemon Menu</Text>
          <Text style={styles.city}>Chicago</Text>
          <Text style={styles.greeting}>We're always delighted to serve you the most delicious food!</Text>
        </View>
        <Image
          style={styles.heroImage}
          source={{ uri: '../assets/Hero-image.png'}} 
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
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    flexDirection: 'column',
  },
  heroWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
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
    color: '#f50511',
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
  }
});

export default HeroBanner;