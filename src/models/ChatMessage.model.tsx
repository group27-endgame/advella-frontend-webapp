import User from "./User.model";

export default interface ChatRoom {
  chatContent: string;
  chatId: string;
  example: 12;
  chatMessageRecipient: User;
  chatMessageSender: User;
  chatStatus: string;
  id: string;
}
