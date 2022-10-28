import axios from "axios";
import { apiURL } from "../constants";
import UserModel from "../models/User.model";
export default class User {
  public async registerUser(
    username: string,
    password: string,
    email: string,
    description: string
  ): Promise<boolean> {
    try {
      const response = await axios.post(`${apiURL}/api/users/register`, {
        userEmail: username,
        userPassword: password,
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
}
