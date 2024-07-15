import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

class profiles {
  constructor() {
    this.route = `${apiURL}/profiles`;
  }

  async getProfile() {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.get(`${this.route}`, authHeader);
    } catch (error) {
      console.error(error);
    }
  }

  async getProfileGroups() {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.get(`${this.route}/groups`, authHeader);
    } catch (error) {
      console.error(error);
    }
  }

  async getProfileEvents() {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.get(`${this.route}/events`, authHeader);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new profiles();
