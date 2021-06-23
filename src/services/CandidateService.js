import Axios from "axios";
import authHeader from "./authHeader";

var API_URL = "http://localhost:8080/api/candidates";

class CandidateService {
    sendCV(cv) {
        return Axios.post(API_URL, cv, authHeader());
    }

    getCandidate(id) {
        return Axios.get(API_URL + "/" + id, authHeader());
    }

    getCandidateByResume(idResume) {
        return Axios.get(API_URL + "/resumes/" + idResume, authHeader());
    }

    getCandidateByJobs(idEnterprise) {
        return Axios.get(
            API_URL + "/jobs/enterprises/" + idEnterprise,
            authHeader()
        );
    }

    getCandidateAccept(idEnterprise) {
        return Axios.get(
            API_URL + "/jobs/enterprises/" + idEnterprise + "/accept",
            authHeader()
        );
    }

    accept(id) {
        return Axios.put(API_URL + "/accept/" + id, authHeader());
    }

    reject(id) {
        return Axios.put(API_URL + "/reject/" + id, authHeader());
    }
    deleteCandidate(id) {
        return Axios.delete(API_URL + "/" + id, authHeader());
    }
    top5() {
        return Axios.get(API_URL + "/top5", authHeader());
    }
}

export default new CandidateService();
