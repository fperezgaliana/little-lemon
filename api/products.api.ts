import { ProductResponse } from "@/types";
import { client } from "./client";

const GET_PRODUCTS_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const PRODUCT_IMAGE_URL =
  "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/";

export const getProducts = async () => {
  return client<ProductResponse>(GET_PRODUCTS_URL).then(prepareProductData);
};

const prepareProductData = (data: ProductResponse) => {
  return {
    menu: data.menu.map((product) => ({
      ...product,
      id: product.name.toLowerCase().replace(/\s+/g, "-"),
      image: `${PRODUCT_IMAGE_URL}${product.image}?raw=true`,
    })),
  };
};
