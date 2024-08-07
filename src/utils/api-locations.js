import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

class locations {
  constructor() {
    this.route = `${apiURL}/locations`;
  }

  async getCountries() {
    try {
      return await axios.get(`${this.route}/countries`);
    } catch (error) {
      console.error(error);
    }
  }

  async getRegions() {
    try {
      return axios.get(`${this.route}/regions`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new locations();
