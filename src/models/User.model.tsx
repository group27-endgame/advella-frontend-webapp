import ChatProduct from "./ChatProduct.model";
import ChatService from "./ChatService.model";
import Product from "./Product.model";
import Rating from "./Rating.model";
import Service from "./Service.model";

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
  public bidderChatService: ChatService[] | undefined;
  public bidderChatProduct: ChatProduct[] | undefined;
  public postedChatProduct: ChatProduct[] | undefined;
  public postedChatService: ChatService[] | undefined;
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
    postedChatService?: ChatService[],
    postedChatProduct?: ChatProduct[],
    bidderChatService?: ChatService[],
    bidderChatProduct?: ChatProduct[]
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
    this.postedChatProduct = postedChatProduct;
    this.postedChatService = postedChatService;
    this.bidderChatProduct = bidderChatProduct;
    this.bidderChatService = bidderChatService;
  }
}
