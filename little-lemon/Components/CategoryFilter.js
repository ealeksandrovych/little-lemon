import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryFilter = ({ categories, selectedCategories, onSelectCategory }) => {
  console.log('selectedCategories in CategoryFilter:', selectedCategories);
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.category,
            selectedCategories.includes(category) ? styles.selectedCategory : null,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  category: {
    margin: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#c0c0c0',
  },
  categoryText: {
    color: '#000',
  },
});

export default CategoryFilter;