import axios from "./index";
import authHeader from "./authHeader";

var API_URL = "/api/candidates";

class CandidateService {
  sendCV(cv) {
    return axios.post(API_URL, cv, authHeader());
  }

  getCandidate(id) {
    return axios.get(API_URL + "/" + id, authHeader());
  }

  getCandidateByResume(idResume) {
    return axios.get(API_URL + "/resumes/" + idResume, authHeader());
  }

  getCandidateByJobs(idEnterprise) {
    return axios.get(API_URL + "/jobs/enterprises/" + idEnterprise, authHeader());
  }

  getCandidateAccept(idEnterprise) {
    return axios.get(API_URL + "/jobs/enterprises/" + idEnterprise + "/accept", authHeader());
  }

  accept(id) {
    return axios.put(API_URL + "/accept/" + id, authHeader());
  }

  reject(id) {
    return axios.put(API_URL + "/reject/" + id, authHeader());
  }
  deleteCandidate(id) {
    return axios.delete(API_URL + "/" + id, authHeader());
  }
  top5() {
    return axios.get(API_URL + "/top5", authHeader());
  }
}

export default new CandidateService();
