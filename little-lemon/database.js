
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

const initializeDb = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY NOT NULL, name TEXT, category TEXT, price REAL, description TEXT, image TEXT);',
      [],
      () => console.log('Table created or already exists'),
      (_, error) => console.error('Error creating the table', error)
    );
  });
};

const fetchMenuData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
    const data = await response.json();

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('DELETE FROM menu;', [], () => {
          console.log('Table cleared successfully');
          const insertions = data.menu.map(item => new Promise((resolve, reject) => {
            tx.executeSql(
              'INSERT INTO menu (name, category, price, description, image) VALUES (?, ?, ?, ?, ?);',
              [item.name, item.category, item.price, item.description, item.image],
              () => resolve(),
              (_, error) => reject(error)
            );
          }));
          Promise.all(insertions).then(() => resolve(data.menu));
        }, (_, error) => reject(error));
      });
    });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
};

const fetchFilteredMenuData = (selectedCategories, searchQuery) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM menu';
    let params = [];

    if (selectedCategories.length > 0 || searchQuery) {
      let conditions = [];
      if (selectedCategories.length > 0) {
        conditions.push(`category IN (${selectedCategories.map(() => '?').join(', ')})`);
        params = params.concat(selectedCategories);
      }
      if (searchQuery) {
        conditions.push('name LIKE ?');
        params.push(`%${searchQuery}%`);
      }
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    db.transaction(tx => {
      tx.executeSql(query, params, (_, { rows }) => {
        resolve(rows._array);
      }, (_, error) => reject(error));
    });
  });
};

export { initializeDb, fetchMenuData, fetchFilteredMenuData };