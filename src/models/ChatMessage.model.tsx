import User from "./User.model";

export default interface ChatRoom {
  chatContent: string;
  chatId: string;
  chatMessageRecipient: User;
  chatMessageSender: User;
  chatStatus: string;
  id: string;
}
