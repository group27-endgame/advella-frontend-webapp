import axios from "axios";
import { apiURL } from "../constants";
// import UserModel from "../models/User.model";
export default class User {
  public async registerUser(
    username: string,
    password: string,
    email: string,
    description: string
  ): Promise<boolean> {
    try {
      const response = await axios.post(`${apiURL}/api/users/register`, {
        username: username,
        password: password,
        email: email,
        description: description,
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
}