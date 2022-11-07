import axios from "axios";
import { apiURL } from "../constants";
import ProductModel from "../models/Product.model";
import ProductCategory from "../models/CategoryProduct.model";
export default class Product {
  public async addNewProduct(
    title: string,
    deadline: number,
    productStatus: string,
    moneyAmount: number,
    detail: string,
    pickUpLocation: string,
    postedDateTime: string,
    productCategory: number
  ): Promise<ProductModel | undefined> {
    let product: ProductModel;

    const response = await axios.post(`${apiURL}/api/products/new`, {
      title: title,
      deadline: deadline,
      productStatus: productStatus,
      moneyAmount: moneyAmount,
      detail: detail,
      pickUpLocation: pickUpLocation,
      postedDateTime: postedDateTime,
      productCategory: { productCategoryId: productCategory },
    });

    if (response.status !== 200) {
      console.log(response.status);
      return undefined;
    }

    product = response.data;
    return product;
  }

  public async getProducts(token: string): Promise<ProductModel[]> {
    let productList: ProductModel[];
    try {
      const response = await axios.get(`${apiURL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) return [];

      productList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return productList;
  }

  public async getProductsInPostedByUser(
    userId: number
  ): Promise<ProductModel[]> {
    let productList: ProductModel[];
    try {
      const response = await axios.get(
        `${apiURL}/api/products/user/${userId}`,
        {
          params: { amount: 5 },
        }
      );
      if (response.status !== 200) return [];

      productList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return productList;
  }

  public async getProductCategories(): Promise<ProductCategory[]> {
    let categoryList: ProductCategory[];
    try {
      const response = await axios.get(`${apiURL}/api/product-categories/all`);
      if (response.status !== 200) return [];

      categoryList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return categoryList;
  }

  public async getProductsInCategory(
    id: string | undefined
  ): Promise<ProductModel[]> {
    let categoryList: ProductModel[];
    try {
      const response = await axios.get(`${apiURL}/api/products/category/${id}`);
      if (response.status !== 200) return [];

      categoryList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return categoryList;
  }
  public async getProductById(productId: number): Promise<ProductModel | null> {
    let product: ProductModel;
    try {
      const response = await axios.get(`${apiURL}/api/products/${productId}`);
      if (response.status !== 200) return null;

      product = response.data;
    } catch (error) {
      console.error(error);
      return null;
    }

    return product;
  }

  public async getProductCategory(
    categoryId: number
  ): Promise<ProductCategory | null> {
    let category: ProductCategory;
    try {
      const response = await axios.get(
        `${apiURL}/api/product-categories/${categoryId}`
      );
      if (response.status !== 200) return null;

      category = response.data;
    } catch (error) {
      console.error(error);
      return null;
    }

    return category;
  }
}
