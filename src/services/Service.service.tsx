import axios from "axios";
import { apiURL } from "../constants";
import ServiceModel from "../models/Service.model";
import CategoryService from "../models/CategoryService.model";

export default class Service {
  public async getAllCategories(): Promise<ServiceModel[]> {
    let serviceList: ServiceModel[];
    try {
      const response = await axios.get(`${apiURL}/api/services/latest`);
      if (response.status !== 200) return [];

      serviceList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return serviceList;
  }

  public async getServices(token: string): Promise<ServiceModel[]> {
    let serviceList: ServiceModel[];
    try {
      const response = await axios.get(`${apiURL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) return [];

      serviceList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return serviceList;
  }

  public async getServiceCategories(token: string): Promise<CategoryService[]> {
    let categoryList: CategoryService[];
    try {
      const response = await axios.get(`${apiURL}/api/service-categories/all`, {
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

  public async getServicesInCategory(
    token: string,
    id: string | undefined
  ): Promise<ServiceModel[]> {
    let servicesList: ServiceModel[];
    try {
      const response = await axios.get(
        `${apiURL}/api/services/category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) return [];

      servicesList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return servicesList;
  }
}
