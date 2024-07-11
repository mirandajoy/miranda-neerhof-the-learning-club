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

  async rsvpEvent(eventId, body) {
    try {
      return await axios.post(`${this.route}/${eventId}/rsvps`, body,authHeader);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new events();
