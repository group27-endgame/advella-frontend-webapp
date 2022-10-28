import axios from "axios";
import { apiURL } from "../constants";
import ServiceModel from "../models/Service.model";

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
}
