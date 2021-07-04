import axios from "axios";
const instance = axios.create({
  baseURL: "https://linksaver-3202a-default-rtdb.firebaseio.com",
});

export default instance;
