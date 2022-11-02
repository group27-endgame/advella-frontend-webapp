import Product from "./Product.model";

export default class CategoryProduct {
  public productCategoryId: number | undefined | null;
  public title: string | undefined | null;
  public products: Product[] | null | undefined;
  constructor(
    productCategoryId?: number | null,
    title?: string | null,
    products?: Product[] | null
  ) {
    this.productCategoryId = productCategoryId;
    this.title = title;
    this.products = products;
  }
}
