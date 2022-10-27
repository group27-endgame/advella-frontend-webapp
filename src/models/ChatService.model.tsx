import Service from "./Service.model";
import User from "./User.model";

export default class ChatService {
  public chatId: number;
  public chatMessage: string;
  public service: Service;
  public userBidder: User;
  public userPoster: User;
  constructor(
    chatId: number,
    chatMessage: string,
    service: Service,
    userBidder: User,
    userPoster: User
  ) {
    this.chatId = chatId;
    this.chatMessage = chatMessage;
    this.service = service;
    this.userBidder = userBidder;
    this.userPoster = userPoster;
  }
}
