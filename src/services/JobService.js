import Axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8080/api/jobs";
class JobService {
  getJobs(page, rowPerPage) {
    return Axios.get(API_URL + `?page=${page - 1}&rowPerPage=${rowPerPage}`, authHeader());
  }

  getJobsPopular(page, rowPerPage) {
    return Axios.get(API_URL + `/popular?page=${page}&rowPerPage=${rowPerPage}`, authHeader());
  }

  getJobsByEnterprise(id) {
    return Axios.get(API_URL + "/enterprises/" + id, authHeader());
  }

  getJobsByCareer(id) {
    return Axios.get(API_URL + "/career/" + id, authHeader());
  }

  searchJobs(keywordForm) {
    return Axios.get(
      API_URL + "/search",
      {
        params: {
          keyword: keywordForm.keyword,
          career: keywordForm.career,
          province: keywordForm.province,
          page: keywordForm.page - 1,
          rowPerPage: keywordForm.rowPerPage,
        },
      },
      authHeader()
    );
  }

  getJob(id) {
    return Axios.get(API_URL + "/" + id, authHeader());
  }

  createJob(job) {
    return Axios.post(API_URL, job, authHeader());
  }
  topFiveJobs() {
    return Axios.get(API_URL + "/chart/top-five-jobs", authHeader());
  }

  deleteJob(id) {
    return Axios.delete(API_URL + "/" + id, authHeader());
  }
}

export default new JobService();
