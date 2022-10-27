import ChatProduct from "./ChatProduct.model";
import ChatService from "./ChatService.model";
import Product from "./Product.model";
import Rating from "./Rating.model";
import Service from "./Service.model";

export default class User {
  public userId: number;
  public email: string;
  public username: string;
  public registrationDateTime: string;
  public description: string;
  public location: string;
  public rating: number;
  public services: Service[];
  public products: Product[];
  public ratings: Rating[];
  public postedService: Service[];
  public postedProduct: Product[];
  public bidderChatService: ChatService[];
  public bidderChatProduct: ChatProduct[];
  public postedChatProduct: ChatProduct[];
  public postedChatService: ChatService[];
  constructor(
    userId: number,
    email: string,
    username: string,
    description: string,
    location: string,
    rating: number,
    services: Service[],
    products: Product[],
    ratings: Rating[],
    postedService: Service[],
    postedProduct: Product[],
    registrationDateTime: string,
    postedChatService: ChatService[],
    postedChatProduct: ChatProduct[],
    bidderChatService: ChatService[],
    bidderChatProduct:ChatProduct[],

  ) {
    this.userId = userId;
    this.email = email;
    this.username = username;
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
