import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

export const initDb = () => {
  return db.execAsync(
    `CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL
      );`,
  );
};
