import CategoryProduct from "./CategoryProduct.model";
import ChatProduct from "./ChatProduct.model";
import User from "./User.model";

export default class Product {
  public productId: number | undefined;
  public title: string | undefined | null;
  public detail: string | undefined;
  public moneyAmount: number | undefined;
  public pickUpLocation: string | undefined;
  public postedDateTime: string | undefined;
  public deadline: string | undefined;
  public productStatus: string | undefined;
  public productNumberOfBids: number | undefined;
  public categoryProduct: CategoryProduct | undefined;
  public user: User[] | undefined;
  public posted: string | undefined;
  public chatProducts: ChatProduct[] | undefined;

  constructor(
    productId?: number,
    title?: string,
    detail?: string,
    moneyAmount?: number,
    pickUpLocation?: string,
    postedDateTime?: string,
    deadline?: string,
    productNumberOfBids?: number,
    users?: User[],
    categoryProduct?: CategoryProduct,
    posted?: string,
    chatProducts?: ChatProduct[],
    productStatus?: string
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
    this.categoryProduct = categoryProduct;
    this.posted = posted;
    this.chatProducts = chatProducts;
    this.productStatus = productStatus;
  }
}
