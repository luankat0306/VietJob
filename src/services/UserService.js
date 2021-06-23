import axios from "./index";
import authHeader from "./authHeader";

const API_URL = "/api/users";
class UserService {
  changePassword(id, form) {
    return axios.post(API_URL + "/change-password/" + id, form, authHeader());
  }

  changeEmail(id, form) {
    return axios.post(API_URL + "/change-email/" + id, form, authHeader());
  }
}
export default new UserService();
