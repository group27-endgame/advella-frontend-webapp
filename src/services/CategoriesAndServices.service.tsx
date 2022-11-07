import axios from "axios";
import { apiURL } from "../constants";
import ProductModel from "../models/Product.model";
import ServiceModel from "../models/Service.model";
export default class CategoriesAndServices {
  public async getCategoriesAndServices(search: string): Promise<[]> {
    let productList: [];
    try {
      const response = await axios.get(
        `${apiURL}/api/productsAndServices/search`,
        { params: { searchedQuery: search } }
      );
      if (response.status !== 200) return [];

      productList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return productList;
  }

  public async getProductsAndServicesLatest(): Promise<[]> {
    let productList: [];
    try {
      const response = await axios.get(
        `${apiURL}/api/productsAndServices/latest`
      );
      if (response.status !== 200) return [];

      productList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return productList;
  }
}
