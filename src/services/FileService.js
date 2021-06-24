import axios from "./index";
const API_URL = "/api";
const user = JSON.parse(localStorage.getItem("user"));
class FileService {
  uploadFile(id, file) {
    return axios.post(API_URL + "/uploadFile/" + id, file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.accessToken,
      },
    });
  }

  downloadFile(filename) {
    const uri = "https://vietjobapi.herokuapp.com";
    return uri + API_URL + "/downloadFile/" + filename;
  }
}
export default new FileService();
