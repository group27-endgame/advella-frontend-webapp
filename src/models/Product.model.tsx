import CategoryProduct from "./CategoryProduct.model";
import ChatProduct from "./ChatProduct.model";
import { ImageProduct } from "./ImageProduct.model";
import User from "./User.model";

export default class Product {
  public productId: number;
  public title: string;
  public detail: string;
  public moneyAmount: number;
  public pickUpLocation: string;
  public postedDateTime: string;
  public deadline: string;
  public productStatus: string;
  public productNumberOfBids: number;
  public productCategory: CategoryProduct;
  public user: User[];
  public posted: User;
  public chatProducts: ChatProduct[];
  public productImages: ImageProduct[];

  constructor(
    productId: number,
    title: string,
    detail: string,
    moneyAmount: number,
    pickUpLocation: string,
    postedDateTime: string,
    deadline: string,
    productNumberOfBids: number,
    users: User[],
    productCategory: CategoryProduct,
    posted: User,
    chatProducts: ChatProduct[],
    productStatus: string,
    productImages: ImageProduct[]
  ) {
    this.productId = productId;
    this.title = title;
    this.detail = detail;
    this.moneyAmount = moneyAmount;
    this.pickUpLocation = pickUpLocation;
    this.postedDateTime = postedDateTime;
    this.deadline = deadline;
    this.productNumberOfBids = productNumberOfBids;
    this.user = users;
    this.productCategory = productCategory;
    this.posted = posted;
    this.chatProducts = chatProducts;
    this.productStatus = productStatus;
    this.productImages = productImages;
  }
}
