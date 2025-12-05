import axios from "axios";
import API_ENDPOINTS, { API_BASE_URL } from "../config/api";


const apiClient = axios.create({
  baseURL: API_BASE_URL || "http://localhost:5000",
  withCredentials: true, 
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(API_ENDPOINTS.REFRESH_TOKEN, {}, { withCredentials: true });
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
