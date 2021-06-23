import Axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/users";
class AdminService {
    getAdmin(id) {
        return Axios.get(API_URL + "/" + id, authHeader());
    }

    updateAdmin(id, admin) {
        return Axios.put(API_URL + "/" + id, admin, authHeader());
    }
}

export default new AdminService();
