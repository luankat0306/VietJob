import Axios from "axios";

const API_URL = "http://localhost:8080/api";
const user = JSON.parse(localStorage.getItem("user"));
class FileService {
  uploadFile(id, file) {
    return Axios.post(API_URL + "/uploadFile/" + id, file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.accessToken,
      },
    });
  }

  downloadFile(filename) {
    return API_URL + "/downloadFile/" + filename;
  }
}
export default new FileService();
