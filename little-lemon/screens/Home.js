import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar as RNStatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { typography } from '../styles/typography';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import UICard from '../components/UiCard';
import Divider from '../components/Divider';
import { TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native';

export default function Home({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['Starters', 'Mains', 'Desserts', 'Sides'];
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('#495E57');
    }

    createTable();
    checkData();
  }, []);

  useEffect(() => {
    filterByCategories();
  }, [selectedCategories]);

  useEffect(() => {
    const delay = setTimeout(() => {
      filterMenu();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText, selectedCategories]);

  const filterMenu = () => {
  let query = 'SELECT * FROM menu WHERE 1=1';
  let params = [];

  // Search filter
  if (searchText) {
    query += ' AND name LIKE ?';
    params.push(`%${searchText}%`);
  }

  // Category filter
  if (selectedCategories.length > 0) {
    const placeholders = selectedCategories.map(() => '?').join(',');
    query += ` AND category IN (${placeholders})`;
    params.push(...selectedCategories);
  }

  db.transaction(tx => {
    tx.executeSql(query, params, (_, { rows }) => {
      setMenu(rows._array);
    });
  });
};

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
      );
      const json = await response.json();

      return json.menu;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const db = SQLite.openDatabase('little_lemon.db');

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT,
        image TEXT,
        category TEXT
      );`,
        [],
        () => console.log('Table created'),
        (_, error) => console.log(error),
      );
    });
  };

  const insertMenu = (menuItems) => {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
          `INSERT INTO menu (name, price, description, image, category)
         VALUES (?, ?, ?, ?, ?)`,
          [item.name, item.price, item.description, item.image, item.category],
        );
      });
    });
  };

  const loadMenu = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM menu', [], (_, { rows }) => {
        setMenu(rows._array);
      });
    });
  };

  const checkData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM menu',
        [],
        async (_, { rows }) => {
          const count = rows._array[0].count;

          if (count === 0) {
            const data = await fetchMenu();
            insertMenu(data);
            loadMenu();
          } else {
            loadMenu();
          }
        },
      );
    });
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const mapCategory = (name) => {
    if (name.toLowerCase().includes('salad')) return 'Starters';
    if (name.toLowerCase().includes('pasta')) return 'Mains';
    return 'Desserts';
  };

  const filterByCategories = () => {
    if (selectedCategories.length === 0) {
      loadMenu();
      return;
    }

    const placeholders = selectedCategories.map(() => '?').join(',');

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM menu WHERE category IN (${placeholders})`,
        selectedCategories,
        (_, { rows }) => {
          setMenu(rows._array);
        },
      );
    });
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <StatusBar style='light' backgroundColor='#495E57' />
      </SafeAreaView>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../img/Logo.png')} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../img/profile-picture.png')} />
            </TouchableOpacity>
          </View>
          {/* <ScrollView> */}
          <View>
            <View style={styles.heroSection}>
              <View>
                <Text style={[typography.h1, { color: '#F4CE14' }]}>
                  Little Lemon
                </Text>
                <Text style={[typography.h2, { color: '#FFFFFF' }]}>
                  Chicago
                </Text>
              </View>
              <View style={styles.textNImage}>
                <View>
                  <Text
                    style={[
                      typography.body,
                      { color: '#FFFFFF', marginTop: 8, width: 210 },
                    ]}
                  >
                    We are a family-owned restaurant, focused on traditional
                    recipes served with a modern twist.
                  </Text>
                </View>
                <View>
                  <Image source={require('../img/HeroImage.png')} />
                </View>
              </View>
              <SearchBar value={searchText} onChangeText={setSearchText} />
            </View>
            <View style={styles.OrderForDelivery}>
              <View>
                <Text style={[typography.h2]}>Order for delivery</Text>
              </View>
              <View style={styles.UICardContainer}>
                <FlatList
                  data={categories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected = selectedCategories.includes(item);

                    return (
                      <TouchableOpacity onPress={() => toggleCategory(item)}>
                        <View
                          style={{
                            padding: 10,
                            borderRadius: 20,
                            backgroundColor: isSelected ? '#495E57' : '#EDEFEE',
                            marginRight: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: isSelected ? '#FFFFFF' : '#333333',
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <Divider />

            <FlatList
              data={menu}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.menuList}>
                  <View style={styles.menuInformation}>
                    <Text style={typography.h4}>{item.name}</Text>
                    <Text style={typography.body}>{item.description}</Text>
                    <Text style={typography.price}>${item.price}</Text>
                  </View>

                  <Image
                    style={styles.menuImage}
                    source={{
                      uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
                    }}
                  />
                </View>
              )}
            />
          </View>
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    backgroundColor: '#495E57',
  },

  // ✅ Main app background
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    paddingVertical: 40,
    // paddingHorizontal: 16,
  },
  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 25,
  },
  heroSection: {
    paddingVertical: 24,
    paddingHorizontal: 25,
    backgroundColor: '#495E57',
  },
  OrderForDelivery: {
    paddingHorizontal: 25,
    marginTop: 24,
  },
  textNImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UICardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  menuList: {
    flexDirection: 'row',
    alignItems: 'center', // vertical center ✅
    justifyContent: 'space-evenly', // proper spacing ✅
    paddingHorizontal: 25,
  },

  menuInformation: {
    flex: 1, // takes available space ✅
    marginVertical: 24,
    marginRight: 12, // spacing from image
    flexDirection: 'column',
    gap: 12,
  },

  menuImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
