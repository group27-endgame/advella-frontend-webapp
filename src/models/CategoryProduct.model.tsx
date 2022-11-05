export default class CategoryProduct {
  public productCategoryId: number;
  public title: string | undefined;
  constructor(productCategoryId: number, title: string) {
    this.productCategoryId = productCategoryId;
    this.title = title;
  }
}
