import axios from "./index";
import authHeader from "./authHeader";

var API_URL = "/api/enterprises";

class EnterpriseService {
  getEnterprises() {
    return axios.get(API_URL, authHeader());
  }

  getEnterprise(id) {
    return axios.get(API_URL + "/" + id, authHeader());
  }

  getByUser(idUser) {
    return axios.get(API_URL + "/users/" + idUser, authHeader());
  }
  createEnterprise(enterprise) {
    return axios.post(
      API_URL + "/enterprises/signup",
      enterprise,
      authHeader()
    );
  }

  updateEnterprise(id, enterprise) {
    return axios.put(API_URL + "/" + id, enterprise, authHeader());
  }

  deleteEnterprise(id) {
    return axios.delete(API_URL + "/" + id, authHeader());
  }

  changeDescription(id, enterpriseForm) {
    return axios.post(
      API_URL + "/change-description/" + id,
      enterpriseForm,
      authHeader()
    );
  }
  topFiveEnterprises() {
    return axios.get(API_URL + "/chart/top-five-enterprises", authHeader());
  }
}

export default new EnterpriseService();
