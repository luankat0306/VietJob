import Axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8080/api/applicants";
class ApplicantService {
    getApplicants() {
        return Axios.get(API_URL, authHeader());
    }

    createApplicant(applicant) {
        return Axios.post(API_URL + "/signup", applicant);
    }

    getApplicant(id) {
        return Axios.get(API_URL + "/" + id, authHeader());
    }

    getApplicantByUserId(id) {
        return Axios.get(API_URL + "/users/" + id, authHeader());
    }
    updateApplicant(id, applicant) {
        return Axios.put(API_URL + "/" + id, applicant, authHeader());
    }

    deleteApplicant(id) {
        return Axios.delete(API_URL + "/" + id, authHeader());
    }

    countApplicant() {
        return Axios.get(API_URL + "/count", authHeader());
    }

    changeSocial(applicantId, socialForm) {
        return Axios.post(
            API_URL + "/change-social/" + applicantId,
            socialForm,
            authHeader()
        );
    }
}

export default new ApplicantService();
