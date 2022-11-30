import axios from "axios";
import { apiURL } from "../constants/constants";
import ChatRoom from "../models/ChatRoom.model";
import UserModel from "../models/User.model";
// import UserModel from "../models/User.model";
export default class User {
  public async registerUser(
    username: string,
    password: string,
    email: string,
    description: string,
    location: string
  ): Promise<boolean> {
    try {
      const response = await axios.post(`${apiURL}/api/users/register`, {
        username: username,
        password: password,
        email: email,
        description: description,
        location: location,
      });
      if (response.status === 200) return true;
      return false;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  public async login(
    username: string,
    password: string
  ): Promise<string | undefined> {
    let token: string | undefined = undefined;

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const response = await axios.post(`${apiURL}/api/users/login`, params);

    if (response.status !== 200) return undefined;

    token = response.data.token;

    return token;
  }

  public async getCurrentUser(token: string): Promise<UserModel | undefined> {
    let user: UserModel;
    try {
      const response = await axios.get(`${apiURL}/api/users/currentUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) return undefined;

      user = response.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }

    return user;
  }

  public async getUserById(userId: string): Promise<UserModel | undefined> {
    let user: UserModel;
    const response = await axios.get(`${apiURL}/api/users/${userId}`, {});

    if (response.status !== 200) return undefined;

    user = response.data;

    return user;
  }

  public async getAllContacts(userId: number): Promise<ChatRoom[] | undefined> {
    let user: ChatRoom[];
    try {
      const response = await axios.get(`${apiURL}/api/users/contact`, {
        params: { userId: userId },
      });

      if (response.status !== 200) return undefined;

      user = response.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }

    return user;
  }
}
