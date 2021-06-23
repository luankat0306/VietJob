import Axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/provinces";
class ProvinceService {
    listProvince() {
        return Axios.get(API_URL, authHeader());
    }
}

export default new ProvinceService();
