import axios from "axios";
import { apiURL } from "../constants/constants";
import CategoriesModel from "../models/Categories.model";

export default class Categories {
  public async getAllCategories(): Promise<CategoriesModel[]> {
    let categoryList: CategoriesModel[];
    try {
      const response = await axios.get(`${apiURL}/api/categories`);
      if (response.status !== 200) return [];

      categoryList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return categoryList;
  }
}
