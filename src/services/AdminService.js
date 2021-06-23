import axios from "./index";
import authHeader from "./authHeader";

const API_URL = "/api/users";
class AdminService {
  getAdmin(id) {
    return axios.get(API_URL + "/" + id, authHeader());
  }

  updateAdmin(id, admin) {
    return axios.put(API_URL + "/" + id, admin, authHeader());
  }
}

export default new AdminService();
