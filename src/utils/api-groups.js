import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;
export const token = sessionStorage.getItem("JWTtoken");
export const authHeader = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

class groups {
  constructor() {
    this.route = `${apiURL}/groups`;
  }

  async getGroups() {
    try {
      return !!token ? await axios.get(`${this.route}`, authHeader) : await axios.get(`${this.route}`);
    } catch (error) {
      console.error(error);
    }
  }

  async getSingleGroup(groupId) {
    try {
      return !!token ? await axios.get(`${this.route}/${groupId}`, authHeader) : await axios.get(`${this.route}/${groupId}`);
    } catch (error) {
      console.error(error);
    }
  }

  async joinGroup(groupId) {
    try {
      return await axios.post(`${this.route}/${groupId}/members`, null, authHeader);
    } catch (error) {
      console.error(error);
    }
  }

  async getGroupEvents(groupId) {
    try {
      return !!token ? await axios.get(`${this.route}/${groupId}/events`, authHeader) : await axios.get(`${this.route}/${groupId}/events`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new groups();
