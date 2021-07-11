import axios from "./index";
import authHeader from "./authHeader";
const API_URL = "/api/jobs";
class JobService {
  getJobs(page, rowPerPage) {
    return axios.get(
      API_URL + `?page=${page - 1}&rowPerPage=${rowPerPage}`,
      authHeader()
    );
  }

  getJobsPopular(page, rowPerPage) {
    return axios.get(
      API_URL + `/popular?page=${page}&rowPerPage=${rowPerPage}`,
      authHeader()
    );
  }

  getJobsByEnterprise(id) {
    return axios.get(API_URL + "/enterprises/" + id, authHeader());
  }

  getJobsByCareer(jobId, careerID) {
    return axios.get(
      API_URL + "/" + jobId + "/career/" + careerID,
      authHeader()
    );
  }

  searchJobs(keywordForm) {
    return axios.get(
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
    return axios.get(API_URL + "/" + id, authHeader());
  }

  createJob(job) {
    return axios.post(API_URL, job, authHeader());
  }
  topFiveJobs() {
    return axios.get(API_URL + "/chart/top-five-jobs", authHeader());
  }

  deleteJob(id) {
    return axios.delete(API_URL + "/" + id, authHeader());
  }
}

export default new JobService();
