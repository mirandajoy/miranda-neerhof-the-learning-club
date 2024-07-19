import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

class groups {
  constructor() {
    this.route = `${apiURL}/groups`;
  }

  async getGroups() {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return !!token ? await axios.get(`${this.route}`, authHeader) : await axios.get(`${this.route}`);
    } catch (error) {
      console.error(error);
    }
  }

  async getSingleGroup(groupId) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return !!token
        ? await axios.get(`${this.route}/${groupId}`, authHeader)
        : await axios.get(`${this.route}/${groupId}`);
    } catch (error) {
      console.error(error);
    }
  }

  async createGroup(body) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.post(`${this.route}`, body, authHeader)
    } catch (error) {
      console.error(error);
    }
  }

  async editGroup(groupId, body) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.put(`${this.route}/${groupId}`, body, authHeader)
    } catch (error) {
      console.error(error);
    }
  }

  async deleteGroup(groupId) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.delete(`${this.route}/${groupId}`, authHeader)
    } catch (error) {
      console.error(error);
    }
  }

  async joinGroup(groupId) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.post(`${this.route}/${groupId}/members`, null, authHeader);
    } catch (error) {
      console.error(error);
    }
  }

  async getGroupEvents(groupId) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return !!token
        ? await axios.get(`${this.route}/${groupId}/events`, authHeader)
        : await axios.get(`${this.route}/${groupId}/events`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new groups();
