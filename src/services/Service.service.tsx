import axios from "axios";
import { apiURL } from "../constants";
import ServiceModel from "../models/Service.model";
import CategoryService from "../models/CategoryService.model";
import ServiceCategory from "../models/CategoryService.model";

export default class Service {
  public async addNewService(
    token: string,
    title: string,
    deadline: string,
    serviceStatus: string,
    moneyAmount: number,
    detail: string,
    location: string,
    postedDateTime: string,
    duration: number,
    serviceCategory: ServiceCategory,
    image?: Blob
  ): Promise<ServiceModel | undefined> {
    try {
      let service: ServiceModel;
      const formData = new FormData();

      formData.append(
        "newService",
        new Blob(
          [
            JSON.stringify({
              title: title,
              deadline: deadline,
              serviceStatus: serviceStatus,
              moneyAmount: moneyAmount,
              detail: detail,
              location: location,
              postedDateTime: postedDateTime,
              duration: duration,
              serviceCategory: serviceCategory,
            }),
          ],
          { type: "application/json" }
        )
      );
      if (image !== undefined) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${apiURL}/api/services/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 200) return undefined;

      service = response.data;

      return service;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  }
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

  public async getServicesInPostedByUser(
    userId: number
  ): Promise<ServiceModel[]> {
    let productList: ServiceModel[];
    try {
      const response = await axios.get(
        `${apiURL}/api/services/user/${userId}`,
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

  public async closeServiceStatus(serviceId: number): Promise<boolean> {
    try {
      const response = await axios.post(
        `${apiURL}/api/services/closed/${serviceId}`
      );
      if (response.status !== 200) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public async openServiceStatus(serviceId: number): Promise<boolean> {
    try {
      const response = await axios.post(
        `${apiURL}/api/services/open/${serviceId}`
      );
      if (response.status !== 200) return false;
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
  public async deleteService(token: string, serviceId: number): Promise<""> {
    try {
      const response = await axios.delete(
        `${apiURL}/api/services/${serviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status !== 200) return "";
      return "";
    } catch (error) {
      console.error(error);
      return "";
    }
  }
}
