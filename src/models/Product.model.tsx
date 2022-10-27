import CategoryProduct from "./CategoryProduct.model";
import ChatProduct from "./ChatProduct.model";
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
  public user: User[];
  public posted: string;
  public chatProducts: ChatProduct[];

  constructor(
    productId: number,
    productTitle: string,
    productDetail: string,
    productMoneyAmount: number,
    productPickUpLocation: string,
    productPostedDatetime: string,
    productDeadline: string,
    productNumberOfBids: number,
    users: User[],
    categoryProduct: CategoryProduct,
    posted:string,
    chatProducts: ChatProduct[]

  ) {
    this.productId = productId;
    this.productTitle = productTitle;
    this.productDetail = productDetail;
    this.productMoneyAmount = productMoneyAmount;
    this.productPickUpLocation = productPickUpLocation;
    this.productPostedDatetime = productPostedDatetime;
    this.productDeadline = productDeadline;
    this.productNumberOfBids = productNumberOfBids;
    this.user = users;
    this.categoryProduct = categoryProduct;
    this.posted = posted;
    this.chatProducts = chatProducts;
  }
}
