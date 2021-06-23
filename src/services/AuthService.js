import axios from "./index";
const API_URL = "/api/auth";

class AuthService {
  login(username, password) {
    return axios.post(API_URL + "/signin", {
      username,
      password,
    });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("applicant");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
