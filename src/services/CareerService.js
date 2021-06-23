import Axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/careers";
class CareerService {
    getCareers() {
        return Axios.get(API_URL, authHeader());
    }

    getCareer(id) {
        return Axios.get(API_URL + "/" + id, authHeader());
    }

    createCareer(career) {
        return Axios.post(API_URL, career, authHeader());
    }

    updateCareer(id, career) {
        return Axios.put(API_URL + "/" + id, career, authHeader());
    }

    deleteCareer(id) {
        return Axios.delete(API_URL + "/" + id, authHeader());
    }
}
export default new CareerService();
