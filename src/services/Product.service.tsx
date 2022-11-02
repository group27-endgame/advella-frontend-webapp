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

  public async getProductCategories(token: string): Promise<CategoryProduct[]> {
    let categoryList: CategoryProduct[];
    try {
      const response = await axios.get(`${apiURL}/api/product-categories/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) return [];

      categoryList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return categoryList;
  }

  public async getProductsInCategory(
    token: string,
    id: string | undefined
  ): Promise<ProductModel[]> {
    let categoryList: ProductModel[];
    try {
      const response = await axios.get(
        `${apiURL}/api/products/category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) return [];

      categoryList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return categoryList;
  }
}
