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
      return await axios.get(`${this.route}`, authHeader);
    } catch (error) {
      console.log(error);
    }
  }

  async joinGroup(groupId) {
    try {
      return await axios.post(`${this.route}/${groupId}/members`, null, authHeader);
    } catch (error) {
      console.log(error);
    }
  }

  async getGroupEvents(groupId) {
    try {
      return await axios.get(`${this.route}/${groupId}/events`, authHeader);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new groups();
