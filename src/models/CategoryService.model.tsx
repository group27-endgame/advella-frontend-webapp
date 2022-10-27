import Service from "./Service.model";

export default class CategoryService {
  public categoryId: number;
  public categoryTitle: string;
  public services: Service[];

  constructor(categoryId: number, categoryTitle: string, services: Service[]) {
    this.categoryId = categoryId;
    this.categoryTitle = categoryTitle;
    this.services = services;
  }
}
