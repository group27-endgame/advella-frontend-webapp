export default class CategoryProduct {
  public categoryId: number;
  public categoryTitle: string;

  constructor(categoryId: number, categoryTitle: string) {
    this.categoryId = categoryId;
    this.categoryTitle = categoryTitle;
  }
}
