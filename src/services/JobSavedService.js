import axios from "./index";
import authHeader from "../services/authHeader";
const API_URL = "/api/jobsaveds";
class JobSavedService {
  getJobSavedByApplicant(idApplicant) {
    return axios.get(API_URL + "/" + idApplicant, authHeader());
  }

  createJobSaved(jobSavedForm) {
    return axios.post(API_URL, jobSavedForm, authHeader());
  }

  deleteJobSaved(idJobSaved) {
    return axios.delete(API_URL + "/" + idJobSaved, authHeader());
  }
}

export default new JobSavedService();
