import CategoryService from "./CategoryService.model";
import ChatService from "./ChatService.model";
import User from "./User.model";

export default class Service {
  public serviceId: number;
  public title: string;
  public detail: string;
  public moneyAmount: number;
  public serviceDuration: number;
  public servicePostedDatetime: string;
  public serviceDeadline: string;
  public serviceLocation: string;
  public serviceNumberOfBids: number;
  public serviceNumberOfLikes: number;
  public categoryService: CategoryService;
  public serviceStatus: string;
  public users: User[];
  public posted: User;
  public chatServices: ChatService[];
  constructor(
    serviceId: number,
    title: string,
    detail: string,
    moneyAmount: number,
    serviceDuration: number,
    servicePostedDatetime: string,
    serviceDeadline: string,
    serviceLocation: string,
    serviceNumberOfBids: number,
    serviceNumberOfLikes: number,
    categoryService: CategoryService,
    serviceStatus: string,
    users: User[],
    chatServices: ChatService[],
    posted: User
  ) {
    this.serviceId = serviceId;
    this.title = title;
    this.detail = detail;
    this.moneyAmount = moneyAmount;
    this.serviceDuration = serviceDuration;
    this.servicePostedDatetime = servicePostedDatetime;
    this.serviceDeadline = serviceDeadline;
    this.serviceLocation = serviceLocation;
    this.serviceNumberOfBids = serviceNumberOfBids;
    this.serviceNumberOfLikes = serviceNumberOfLikes;
    this.categoryService = categoryService;
    this.users = users;
    this.chatServices = chatServices;
    this.serviceStatus = serviceStatus;
    this.posted = posted;
  }
}
