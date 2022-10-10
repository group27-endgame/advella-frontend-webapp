import Product from "./Product.model";
import Service from "./Service.model";

export default class User {
  public userId: number;
  public email: string;
  public password: string | null;
  public username: string;
  public description: string;
  public location: string;
  public rating: number;
  public services: Service[];
  public products: Product[];

  constructor(
    userId: number,
    email: string,
    password: string,
    username: string,
    description: string,
    location: string,
    rating: number,
    services: Service[],
    products: Product[]
  ) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.username = username;
    this.description = description;
    this.location = location;
    this.rating = rating;
    this.services = services;
    this.products = products;
  }
}
