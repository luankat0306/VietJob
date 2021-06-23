import axios from "./index";
import authHeader from "./authHeader";
const API_URL = "/api/resumes";
class ResumeService {
  getResumes() {
    return axios.get(API_URL, authHeader());
  }

  getResume(id) {
    return axios.get(API_URL + "/" + id, authHeader());
  }
  getResumeByApplicant(applicantId) {
    return axios.get(API_URL + "/applicants/" + applicantId, authHeader());
  }

  changeResume(applicantId, resumeId, resumeForm) {
    return axios
      .get(API_URL + "/applicants/" + applicantId, authHeader())
      .then(
        () => {
          return axios.put(API_URL + "/" + resumeId, resumeForm, authHeader());
        },
        (error) => {
          return axios.post(API_URL, resumeForm, authHeader());
        }
      )
      .catch();
  }
}
export default new ResumeService();
