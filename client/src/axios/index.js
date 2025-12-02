import axios from "axios";
import API_ENDPOINTS, { API_BASE_URL } from "../config/api";


const apiClient = axios.create({
  baseURL: API_BASE_URL || "http://localhost:5000",
  withCredentials: true, 
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});



export default apiClient;
