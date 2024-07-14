import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;
const token = sessionStorage.getItem("JWTtoken");
const authHeader = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

class events {
  constructor() {
    this.route = `${apiURL}/events`;
  }

  async getSingleEvent(eventId) {
    try {
      return !!token ? await axios.get(`${this.route}/${eventId}`, authHeader) : await axios.get(`${this.route}/${eventId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async rsvpEvent(eventId, body) {
    try {
      return await axios.post(`${this.route}/${eventId}/rsvps`, body, authHeader);
    } catch (error) {
      console.log(error);
    }
  }

  async updateEvent(eventId, rsvpId, body) {
    try {
      return await axios.put(`${this.route}/${eventId}/rsvps/${rsvpId}`, body, authHeader);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new events();
