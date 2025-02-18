import axios from "axios";
import { useNavigate } from "react-router";

const ApiInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/chitshat",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
ApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
ApiInstance.interceptors.response.use(
  
  (response) => {
    return response;
  },
  (err) => {
    const navigate =useNavigate()
    if (err.response) {
      navigate('/')
    }
    return Promise.reject(err);
  }
);
export default ApiInstance;
