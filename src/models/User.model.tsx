import BidProduct from "./BidProduct.model";
import BidService from "./BidService.model";

import Product from "./Product.model";
import Rating from "./Rating.model";
import Service from "./Service.model";
import ChatMessage from "./ChatMessage.model";
import ChatRoom from "./ChatRoom.model";

export default class User {
  public userId: number | undefined;
  public email: string | undefined;
  public token: string | undefined;
  public username: string | undefined;
  public registrationDateTime: string | undefined;
  public description: string | undefined;
  public location: string | undefined;
  public rating: number | undefined;
  public services: Service[] | undefined;
  public products: Product[] | undefined;
  public ratings: Rating[] | undefined;
  public postedService: Service[] | undefined;
  public postedProduct: Product[] | undefined;
  public bidProducts: BidProduct[] | undefined;
  public bidServices: BidService[] | undefined;
  public receivedChatRoom: ChatRoom | undefined;
  public receivedMessage: ChatMessage | undefined;
  public sendChatRoom: ChatRoom | undefined;
  public sendMessages: ChatMessage[] | undefined;
  constructor(
    userId?: number,
    email?: string,
    username?: string,
    token?: string,
    description?: string,
    location?: string,
    rating?: number,
    services?: Service[],
    products?: Product[],
    ratings?: Rating[],
    postedService?: Service[],
    postedProduct?: Product[],
    registrationDateTime?: string,
    bidProducts?: BidProduct[],
    bidServices?: BidService[],
    receivedChatRoom?: ChatRoom,
    receivedMessage?: ChatMessage,
    sendChatRoom?: ChatRoom,
    sendMessages?: ChatMessage[]
  ) {
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.token = token;
    this.description = description;
    this.location = location;
    this.rating = rating;
    this.services = services;
    this.products = products;
    this.ratings = ratings;
    this.postedService = postedService;
    this.registrationDateTime = registrationDateTime;
    this.postedProduct = postedProduct;
    this.bidProducts = bidProducts;
    this.bidServices = bidServices;
    this.receivedChatRoom = receivedChatRoom;
    this.receivedMessage = receivedMessage;
    this.sendChatRoom = sendChatRoom;
    this.sendMessages = sendMessages;
  }
}
