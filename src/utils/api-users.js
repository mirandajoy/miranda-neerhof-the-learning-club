import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

class users {
  constructor() {
    this.route = `${apiURL}/users`;
  }

  async createUser(body) {
    try {
      return await axios.post(`${this.route}/signup`, body);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async loginUser(body) {
    try {
      return await axios.post(`${this.route}/signin`, body);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default new users();