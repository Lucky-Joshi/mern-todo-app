import axios from "axios";

const API = axios.create({ // Create an Axios instance for API requests
  baseURL: "http://localhost:5000/api",
});

export default API;
