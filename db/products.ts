import { Product } from "../types";
import { db } from "./db";

export const getProductsFromDb = async (): Promise<Product[]> => {
  return db.getAllAsync<Product>("SELECT * FROM products");
};

export const getProductCategoriesFromDb = async () => {
  return db.getAllAsync<{ name: string }>(
    "SELECT DISTINCT category as name FROM products;",
  );
};

export const saveProducts = async (products: Product[]) => {
  const insertQuery =
    "INSERT OR REPLACE INTO products (id, name, description, price, category, image) VALUES (?, ?, ?, ?, ?, ?);";

  await db.withTransactionAsync(async () => {
    products.forEach(async (product) => {
      await db.runAsync(insertQuery, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.category,
        product.image,
      ]);
    });
  });
};

export const clearProducts = async () => {
  await db.runAsync("DELETE FROM products;");
};
