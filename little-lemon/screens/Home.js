import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar as RNStatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { typography } from '../styles/typography';
import SearchBar from '../components/SearchBar';
import Divider from '../components/Divider';
import * as SQLite from 'expo-sqlite';

export default function Home({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Sides'];
  const [searchText, setSearchText] = useState('');

  const db = SQLite.openDatabase('little_lemon.db');

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('#495E57');
    }

    createTable();
    checkData();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      filterMenu();
    }, 300);

    return () => clearTimeout(delay);
  }, [searchText, selectedCategories]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      );
      const json = await response.json();
      return json.menu;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

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
        );`
      );
    });
  };

  const insertMenu = (menuItems) => {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
          `INSERT INTO menu (name, price, description, image, category)
           VALUES (?, ?, ?, ?, ?)`,
          [item.name, item.price, item.description, item.image, item.category]
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
        }
      );
    });
  };

  const filterMenu = () => {
    let query = 'SELECT * FROM menu WHERE 1=1';
    let params = [];

    // Search filter
    if (searchText) {
      query += ' AND name LIKE ?';
      params.push(`%${searchText}%`);
    }

    // Multi-category filter
    if (selectedCategories.length > 0) {
      const placeholders = selectedCategories.map(() => '?').join(',');
      query += ` AND category IN (${placeholders})`;
      params.push(...selectedCategories);
    }

    db.transaction((tx) => {
      tx.executeSql(query, params, (_, { rows }) => {
        setMenu(rows._array);
      });
    });
  };

  const toggleCategory = (category) => {
    if (category === 'All') {
      setSelectedCategories([]);
      return;
    }

    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <StatusBar style="light" backgroundColor="#495E57" />
      </SafeAreaView>

      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../img/Logo.png')} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../img/profile-picture.png')} />
            </TouchableOpacity>
          </View>

          {/* Main List */}
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

            ListHeaderComponent={
              <>
                {/* Hero */}
                <View style={styles.heroSection}>
                  <Text style={[typography.h1, { color: '#F4CE14' }]}>
                    Little Lemon
                  </Text>
                  <Text style={[typography.h2, { color: '#FFFFFF' }]}>
                    Chicago
                  </Text>

                  <View style={styles.textNImage}>
                    <Text
                      style={[
                        typography.body,
                        { color: '#FFFFFF', marginTop: 8, width: 210 },
                      ]}
                    >
                      We are a family-owned restaurant, focused on traditional
                      recipes served with a modern twist.
                    </Text>

                    <Image source={require('../img/HeroImage.png')} />
                  </View>

                  <SearchBar value={searchText} onChangeText={setSearchText} />
                </View>

                {/* Categories */}
                <View style={styles.OrderForDelivery}>
                  <Text style={typography.h2}>Order for delivery</Text>

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
                              backgroundColor: isSelected
                                ? '#495E57'
                                : '#EDEFEE',
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

                <Divider />
              </>
            }

            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    backgroundColor: '#495E57',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  menuList: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginVertical: 12,
  },
  menuInformation: {
    flex: 1,
    marginRight: 12,
    gap: 8,
  },
  menuImage: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 185,
    height: 40,
    resizeMode: 'contain',
  },
});