import User from "./User.model";

export default interface ChatRoom {
  chatId: string;

  chatRecipient: User;
  chatSender: User;
  id: string;
}
