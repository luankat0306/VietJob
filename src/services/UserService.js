import Axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/users";
class UserService {
    changePassword(id, form) {
        return Axios.post(
            API_URL + "/change-password/" + id,
            form,
            authHeader()
        );
    }

    changeEmail(id, form) {
        return Axios.post(API_URL + "/change-email/" + id, form, authHeader());
    }
}
export default new UserService();
