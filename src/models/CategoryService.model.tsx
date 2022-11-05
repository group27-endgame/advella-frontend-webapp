export default class CategoryService {
  public serviceCategoryId: number;
  public title: string | undefined;

  constructor(serviceCategoryId: number, title: string) {
    this.serviceCategoryId = serviceCategoryId;
    this.title = title;
  }
}
