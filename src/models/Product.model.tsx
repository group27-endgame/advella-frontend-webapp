import BidProduct from "./BidProduct.model";
import CategoryProduct from "./CategoryProduct.model";
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
  public productImages: ImageProduct[];
  public bidProducts: BidProduct[];

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
    productStatus: string,
    productImages: ImageProduct[],
    bidProducts: BidProduct[]
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
    this.productStatus = productStatus;
    this.productImages = productImages;
    this.bidProducts = bidProducts;
  }
}
