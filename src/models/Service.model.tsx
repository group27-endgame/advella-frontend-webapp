import CategoryService from "./CategoryService.model";
import ChatService from "./ChatService.model";
import User from "./User.model";

export default class Service {
  public serviceId: number;
  public serviceTitle: string;
  public serviceDetail: string;
  public serviceMoneyAmount: number;
  public serviceDuration: string;
  public servicePostedDatetime: string;
  public serviceDeadline: string;
  public serviceLocation: string;
  public serviceNumberOfBids: number;
  public serviceNumberOfLikes: number;
  public categoryService: CategoryService;
  public user: User;
  public chatService: ChatService;
  constructor(
    serviceId: number,
    serviceTitle: string,
    serviceDetail: string,
    serviceMoneyAmount: number,
    serviceDuration: string,
    servicePostedDatetime: string,
    serviceDeadline: string,
    serviceLocation: string,
    serviceNumberOfBids: number,
    serviceNumberOfLikes: number,
    categoryService: CategoryService,
    user: User,
    chatService: ChatService
  ) {
    this.serviceId = serviceId;
    this.serviceTitle = serviceTitle;
    this.serviceDetail = serviceDetail;
    this.serviceMoneyAmount = serviceMoneyAmount;
    this.serviceDuration = serviceDuration;
    this.servicePostedDatetime = servicePostedDatetime;
    this.serviceDeadline = serviceDeadline;
    this.serviceLocation = serviceLocation;
    this.serviceNumberOfBids = serviceNumberOfBids;
    this.serviceNumberOfLikes = serviceNumberOfLikes;
    this.categoryService = categoryService;
    this.user = user;
    this.chatService = chatService;
  }
}
