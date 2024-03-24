import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import HomeHeader from '../Components/HomeHeader';
import HeroBanner from '../Components/HeroBanner';
import CategoryFilter from '../Components/CategoryFilter';
import { useUser } from '../Context/UserContext';
import { fetchFilteredMenuData } from '../database';

const Home = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { userData } = useUser();

   useEffect(() => {
    console.log('selectedCategories:', selectedCategories);
    fetchFilteredMenuData(selectedCategories, searchQuery)
        .then(data => {
            setMenuItems(data);
        })
        .catch(error => console.error('Error fetching filtered menu data:', error));
}, [selectedCategories, searchQuery]);

const onSelectCategory = (category) => {
    console.log('Before updating selectedCategories:', selectedCategories);
    if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
        setSelectedCategories([...selectedCategories, category]);
    }
    console.log('After updating selectedCategories:', selectedCategories);
};

    const renderMenuItem = ({ item }) => (
        <View style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemText}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <Text style={styles.menuItemPrice}>${item.price ? item.price.toFixed(2) : 'N/A'}</Text>
            </View>
            <Image
                source={{ uri: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}` }}
                style={styles.menuItemImage}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <HomeHeader profileImage={userData?.profileImage} name={userData?.name} />
            <HeroBanner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onSelectCategory={onSelectCategory}
            />
            <FlatList
                data={menuItems}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 5,
    },
    menuItemDescription: {
        fontSize: 14,
        color: '#666',
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
});

export default Home;