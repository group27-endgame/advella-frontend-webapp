import axios from "axios";

export default class Location {
  public async getLocation(city: string): Promise<string> {
    try {
      let service: string;
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client/${city} `,
        { params: { localityLanguage: "dk" } }
      );
      if (response.status !== 200) return "";

      service = response.data;

      return "";
    } catch (error) {
      console.error(error);

      return "";
    }
  }
}
