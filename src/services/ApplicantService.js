import axios from "./index";
import authHeader from "./authHeader";
const API_URL = "/api/applicants";
class ApplicantService {
  getApplicants() {
    return axios.get(API_URL, authHeader());
  }

  createApplicant(applicant) {
    return axios.post("/api/auth/applicants/signup", applicant);
  }

  getApplicant(id) {
    return axios.get(API_URL + "/" + id, authHeader());
  }

  getApplicantByUserId(id) {
    return axios.get(API_URL + "/users/" + id, authHeader());
  }
  updateApplicant(id, applicant) {
    return axios.put(API_URL + "/" + id, applicant, authHeader());
  }

  deleteApplicant(id) {
    return axios.delete(API_URL + "/" + id, authHeader());
  }

  countApplicant() {
    return axios.get(API_URL + "/count", authHeader());
  }

  changeSocial(applicantId, socialForm) {
    return axios.post(
      API_URL + "/change-social/" + applicantId,
      socialForm,
      authHeader()
    );
  }
}

export default new ApplicantService();
