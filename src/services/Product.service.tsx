import axios from "axios";
import { apiURL } from "../constants";
import ProductModel from "../models/Product.model";
// import ProductCategory from "../models/CategoryProduct.model";
import CategoryProduct from "../models/CategoryProduct.model";
export default class Product {
  public async addNewProduct(
    title: string,
    deadline: string,
    moneyAmount: string,
    detail: string,
    pickUpLocation: string,
    postedDateTime: string
    // productCategory: ProductCategory
  ): Promise<boolean> {
    try {
      const response = await axios.post(`${apiURL}/api/products/new`, {
        deadline: deadline,
        title: title,
        moneyAmount: moneyAmount,
        detail: detail,
        pickUpLocation: pickUpLocation,
        postedDateTime: postedDateTime,
        //productCategory: productCategory,
      });
      if (response.status === 200) {
        console.log(response);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);

      return false;
    }
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
    token: string,
    userId: number
  ): Promise<ProductModel[]> {
    let productList: ProductModel[];
    try {
      const response = await axios.get(
        `${apiURL}/api/products/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  public async getProductCategories(): Promise<CategoryProduct[]> {
    let categoryList: CategoryProduct[];
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
  ): Promise<CategoryProduct | null> {
    let category: CategoryProduct;
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
