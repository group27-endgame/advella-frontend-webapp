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

  public async getServiceCategories(): Promise<CategoryService[]> {
    let categoryList: CategoryService[];
    try {
      const response = await axios.get(`${apiURL}/api/service-categories/all`);
      if (response.status !== 200) return [];

      categoryList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return categoryList;
  }

  public async getServicesInCategory(
    id: string | undefined
  ): Promise<ServiceModel[]> {
    let servicesList: ServiceModel[];
    try {
      const response = await axios.get(`${apiURL}/api/services/category/${id}`);
      if (response.status !== 200) return [];

      servicesList = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return servicesList;
  }

  public async getServiceById(serviceId: number): Promise<ServiceModel | null> {
    let service: ServiceModel;
    try {
      const response = await axios.get(`${apiURL}/api/services/${serviceId}`);
      if (response.status !== 200) return null;

      service = response.data;
    } catch (error) {
      console.error(error);
      return null;
    }

    return service;
  }

  public async getServiceCategory(
    categoryId: number
  ): Promise<CategoryService | null> {
    let category: CategoryService;
    try {
      const response = await axios.get(
        `${apiURL}/api/service-categories/${categoryId}`
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
