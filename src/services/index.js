import Axios from "axios";

const axios = Axios.create({ baseURL: "https://vietjobapi.herokuapp.com" });
export default axios;
