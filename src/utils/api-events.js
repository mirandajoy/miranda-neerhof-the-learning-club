import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

class events {
  constructor() {
    this.route = `${apiURL}/events`;
  }

  async getSingleEvent(eventId) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return !!token
        ? await axios.get(`${this.route}/${eventId}`, authHeader)
        : await axios.get(`${this.route}/${eventId}`);
    } catch (error) {
      console.error(error);
    }
  }

  async createEvent(body) {
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

  async editEvent(eventId, body) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.put(`${this.route}/${eventId}`, body, authHeader)
    } catch (error) {
      console.error(error);
    }
  }

  async deleteEvent(eventId) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.delete(`${this.route}/${eventId}`, authHeader)
    } catch (error) {
      console.error(error);
    }
  }

  async rsvpEvent(eventId, body) {
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      return await axios.post(`${this.route}/${eventId}/rsvps`, body, authHeader);
    } catch (error) {
      console.error(error);
    }
  }

  async updateEvent(eventId, rsvpId, body) {
    const token = sessionStorage.getItem("JWTtoken");
    const authHeader = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const token = sessionStorage.getItem("JWTtoken");
      const authHeader = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      return await axios.put(`${this.route}/${eventId}/rsvps/${rsvpId}`, body, authHeader);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new events();
