import Axios from "axios";
import authHeader from "../services/authHeader";
const API_URL = "http://localhost:8080/api/jobsaveds";
class JobSavedService {
    getJobSavedByApplicant(idApplicant) {
        return Axios.get(API_URL + "/" + idApplicant, authHeader());
    }

    createJobSaved(jobSavedForm) {
        return Axios.post(API_URL, jobSavedForm, authHeader());
    }

    deleteJobSaved(idJobSaved) {
        return Axios.delete(API_URL + "/" + idJobSaved, authHeader());
    }
}

export default new JobSavedService();
