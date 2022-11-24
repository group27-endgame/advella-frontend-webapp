import User from "./User.model";

export default class ChatMessage {
  public chatContent: string | undefined;
  public chatId: string | undefined;
  public chatMessageRecipient: User | undefined;
  public chatMessageSender: User | undefined;
  public chatStatus: string | undefined;
  public id: string | undefined;

  constructor(
    chatContent?: string,
    chatId?: string,
    chatMessageRecipient?: User,
    chatMessageSender?: User,
    chatStatus?: string,
    id?: string
  ) {
    this.chatContent = chatContent;
    this.chatId = chatId;
    this.chatMessageRecipient = chatMessageRecipient;
    this.chatMessageSender = chatMessageSender;
    this.chatStatus = chatStatus;
    this.id = id;
  }
}
