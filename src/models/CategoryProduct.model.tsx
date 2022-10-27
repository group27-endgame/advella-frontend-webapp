import Product from "./Product.model";

export default class CategoryProduct {
  public categoryId: number;
  public categoryTitle: string;
  public products: Product[];
  constructor(categoryId: number, categoryTitle: string, products: Product[]) {
    this.categoryId = categoryId;
    this.categoryTitle = categoryTitle;
    this.products = products;

  }
}
