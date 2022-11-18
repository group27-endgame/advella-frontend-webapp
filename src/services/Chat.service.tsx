import axios from "axios";
import { apiURL } from "../constants/constants";

export default class Chat {
  public async findMessage(id: number): Promise<[]> {
    let rep: [];
    try {
      const response = await axios.get(`${apiURL}/messages/${id}`);
      if (response.status !== 200) return [];

      rep = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return rep;
  }
  public async findChatMessages(
    recipientId: number,
    senderId: number
  ): Promise<[]> {
    let rep: [];
    try {
      const response = await axios.get(
        `${apiURL}/messages/${senderId}/${recipientId}`
      );
      if (response.status !== 200) return [];

      rep = response.data;
    } catch (error) {
      console.error(error);
      return [];
    }

    return rep;
  }
  public async countNewMessages(
    recipientId: number,
    senderId: number
  ): Promise<number | null> {
    let rep: number;
    try {
      const response = await axios.get(
        `${apiURL}/messages/${senderId}/${recipientId}/count`
      );
      if (response.status !== 200) return null;

      rep = response.data;
    } catch (error) {
      console.error(error);
      return null;
    }

    return rep;
  }
}
