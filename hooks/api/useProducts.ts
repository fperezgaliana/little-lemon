import { getProducts } from "@/api";
import {
  getProductCategoriesFromDb,
  getProductsFromDb,
  saveProducts,
} from "@/db";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

type ProductFilters = {
  textFilter?: string;
  categoriesFilter?: string[];
};

const filterProducts = (products: Product[], filters: ProductFilters) => {
  return products.filter((product) => {
    const matchesText = product.name
      .toLowerCase()
      .includes(filters.textFilter?.toLowerCase() ?? "");
    const matchesCategory = filters.categoriesFilter?.length
      ? filters.categoriesFilter.includes(product.category)
      : true;
    return matchesText && matchesCategory;
  });
};

async function loadProducts(filters: ProductFilters) {
  const localData = await getProductsFromDb();

  if (localData.length > 0) {
    console.log("Loaded products from local database");
    return filterProducts(localData, filters);
  }

  console.log("Fetching products from remote API");
  const remoteData = await getProducts();

  await saveProducts(remoteData.menu);

  return filterProducts(remoteData.menu, filters);
}

export const useProducts = ({
  textFilter,
  categoriesFilter,
}: ProductFilters) => {
  return {
    productsData: useQuery({
      queryKey: ["products", textFilter, categoriesFilter],
      queryFn: () => loadProducts({ textFilter, categoriesFilter }),
    }),
    productCategoriesData: useQuery({
      queryKey: ["productCategories"],
      queryFn: getProductCategoriesFromDb,
    }),
  };
};
