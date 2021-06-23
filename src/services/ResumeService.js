import Axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8080/api/resumes";
class ResumeService {
    getResumes() {
        return Axios.get(API_URL, authHeader());
    }

    getResume(id) {
        return Axios.get(API_URL + "/" + id, authHeader());
    }
    getResumeByApplicant(applicantId) {
        return Axios.get(API_URL + "/applicants/" + applicantId, authHeader());
    }

    changeResume(applicantId, resumeId, resumeForm) {
        return Axios.get(API_URL + "/applicants/" + applicantId, authHeader())
            .then(
                () => {
                    return Axios.put(
                        API_URL + "/" + resumeId,
                        resumeForm,
                        authHeader()
                    );
                },
                (error) => {
                    return Axios.post(API_URL, resumeForm, authHeader());
                }
            )
            .catch();
    }
}
export default new ResumeService();
