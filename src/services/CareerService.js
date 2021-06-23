import axios from "./index";
import authHeader from "./authHeader";

const API_URL = "/api/careers";
class CareerService {
  getCareers() {
    return axios.get(API_URL, authHeader());
  }

  getCareer(id) {
    return axios.get(API_URL + "/" + id, authHeader());
  }

  createCareer(career) {
    return axios.post(API_URL, career, authHeader());
  }

  updateCareer(id, career) {
    return axios.put(API_URL + "/" + id, career, authHeader());
  }

  deleteCareer(id) {
    return axios.delete(API_URL + "/" + id, authHeader());
  }
}
export default new CareerService();
