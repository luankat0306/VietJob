import Axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
    login(username, password) {
        return Axios.post(API_URL + "/signin", {
            username,
            password,
        });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("applicant");
    }

    register(username, email, password) {
        return Axios.post(API_URL + "signup", {
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
