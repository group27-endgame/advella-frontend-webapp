import CategoryProduct from "./CategoryProduct.model";
import User from "./User.model";

export default class Product {
  public productId: number;
  public productTitle: string;
  public productDetail: string;
  public productMoneyAmount: number;
  public productPickUpLocation: string;
  public productPostedDatetime: string;
  public productDeadline: string;
  public productNumberOfBids: number;
  public categoryProduct: CategoryProduct;
  public user: User;

  constructor(
    productId: number,
    productTitle: string,
    productDetail: string,
    productMoneyAmount: number,
    productPickUpLocation: string,
    productPostedDatetime: string,
    productDeadline: string,
    productNumberOfBids: number,
    user: User,
    categoryProduct: CategoryProduct
  ) {
    this.productId = productId;
    this.productTitle = productTitle;
    this.productDetail = productDetail;
    this.productMoneyAmount = productMoneyAmount;
    this.productPickUpLocation = productPickUpLocation;
    this.productPostedDatetime = productPostedDatetime;
    this.productDeadline = productDeadline;
    this.productNumberOfBids = productNumberOfBids;
    this.user = user;
    this.categoryProduct = categoryProduct;
  }
}
