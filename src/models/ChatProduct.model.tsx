import Product from "./Product.model";
import User from "./User.model";

export default class ChatProduct {
  public chatId: number;
  public chatMessage: string;
  public user: User;
  public product: Product;
  constructor(
    chatId: number,
    chatMessage: string,
    user: User,
    product: Product
  ) {
    this.chatId = chatId;
    this.chatMessage = chatMessage;
    this.user = user;
    this.product = product;
  }
}
