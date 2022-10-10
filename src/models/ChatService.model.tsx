import Service from "./Service.model";
import User from "./User.model";

export default class ChatService {
  public chatId: number;
  public chatMessage: string;
  public user: User;
  public service: Service;
  constructor(
    chatId: number,
    chatMessage: string,
    user: User,
    service: Service
  ) {
    this.chatId = chatId;
    this.chatMessage = chatMessage;
    this.user = user;
    this.service = service;
  }
}
