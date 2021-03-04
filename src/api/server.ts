import axios from "axios";

export default axios.create({
  baseURL: "https://ds-ecommers.herokuapp.com",
  // baseURL: "http://localhost:8080",
});
