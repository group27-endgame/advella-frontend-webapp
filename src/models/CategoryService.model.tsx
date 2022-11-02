import Service from "./Service.model";

export default class CategoryService {
  public serviceCategoryId: number;
  public title: string | undefined;
  public services: Service[];

  constructor(serviceCategoryId: number, title: string, services: Service[]) {
    this.serviceCategoryId = serviceCategoryId;
    this.title = title;
    this.services = services;
  }
}
