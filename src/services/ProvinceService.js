import axios from "./index";
import authHeader from "./authHeader";

const API_URL = "/api/provinces";
class ProvinceService {
  listProvince() {
    return axios.get(API_URL, authHeader());
  }
}

export default new ProvinceService();
