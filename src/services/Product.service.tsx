import axios from "axios";
import { apiURL } from "../constants";
import ProductModel from "../models/Product.model";
import ProductCategory from "../models/CategoryProduct.model";
import UserModel from "../models/User.model";
export default class Product {
  public async addNewProduct(
    token: string,
    title: string,
    deadline: number,
    productStatus: string,
    moneyAmount: number,
    detail: string,
    pickUpLocation: string,
    postedDateTime: string,
    productCategory: number,
    image?: Blob
  ): Promise<ProductModel | undefined> {
    let product: ProductModel;

    const formData = new FormData();
    formData.append(
      "newProduct",
      new Blob(
        [
          JSON.stringify({
            title: title,
            deadline: deadline,
            productStatus: productStatus,
            moneyAmount: moneyAmount,
            detail: detail,
            pickUpLocation: pickUpLocation,
            postedDateTime: postedDateTime,
            productCategory: { productCategoryId: productCategory },
          }),
        ],
        { type: "application/json" }
      )
    );

    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(`${apiURL}/api/products/new`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
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

  public async closeProductStatus(productId: number): Promise<boolean> {
    try {
      const response = await axios.post(
        `${apiURL}/api/products/closed/${productId}`
      );
      if (response.status !== 200) return false;
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
  public async openProductStatus(productId: number): Promise<boolean> {
    try {
      const response = await axios.post(
        `${apiURL}/api/products/open/${productId}`
      );
      if (response.status !== 200) return false;
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  public async deleteService(token: string, productId: number): Promise<""> {
    try {
      const response = await axios.delete(
        `${apiURL}/api/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status !== 200) return "";
      return "";
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  public async bidProduct(
    token: string,
    amount: number,
    productId: number
  ): Promise<boolean> {
    try {
      const params = new URLSearchParams();
      params.append("amount", amount.toString());

      const response = await axios.post(
        `${apiURL}/api/users/bid/product/${productId}`,
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public async getAllBidders(productId: number): Promise<UserModel[] | null> {
    let user: UserModel[];
    try {
      const response = await axios.get(
        `${apiURL}/api/products/bidders/${productId}`,
        {}
      );
      if (response.status !== 200) return null;
      user = response.data;
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  public async getHighestBidder(productId: number): Promise<UserModel | null> {
    let user: UserModel;
    try {
      const response = await axios.get(
        `${apiURL}/api/products/bidders/highest/${productId}`,
        {}
      );
      if (response.status !== 200) return null;
      user = response.data;
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
