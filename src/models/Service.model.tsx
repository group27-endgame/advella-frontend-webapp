import BidService from "./BidService.model";
import CategoryService from "./CategoryService.model";
import ChatService from "./ChatService.model";
import { ImageService } from "./ImageService.model";
import User from "./User.model";

export default class Service {
  public serviceId: number;
  public title: string;
  public detail: string;
  public moneyAmount: number;
  public duration: number;
  public postedDateTime: string;
  public deadline: string;
  public location: string;
  public serviceNumberOfBids: number;
  public serviceNumberOfLikes: number;
  public serviceCategory: CategoryService;
  public serviceStatus: string;
  public users: User[];
  public posted: User;
  public chatServices: ChatService[];
  public serviceImages: ImageService[];
  public bidServices: BidService[];
  constructor(
    serviceId: number,
    title: string,
    detail: string,
    moneyAmount: number,
    duration: number,
    postedDateTime: string,
    deadline: string,
    location: string,
    serviceNumberOfBids: number,
    serviceNumberOfLikes: number,
    serviceCategory: CategoryService,
    serviceStatus: string,
    users: User[],
    chatServices: ChatService[],
    posted: User,
    serviceImages: ImageService[],
    bidServices: BidService[]
  ) {
    this.serviceId = serviceId;
    this.title = title;
    this.detail = detail;
    this.moneyAmount = moneyAmount;
    this.duration = duration;
    this.postedDateTime = postedDateTime;
    this.deadline = deadline;
    this.location = location;
    this.serviceNumberOfBids = serviceNumberOfBids;
    this.serviceNumberOfLikes = serviceNumberOfLikes;
    this.serviceCategory = serviceCategory;
    this.users = users;
    this.chatServices = chatServices;
    this.serviceStatus = serviceStatus;
    this.posted = posted;
    this.serviceImages = serviceImages;
    this.bidServices = bidServices;
  }
}
