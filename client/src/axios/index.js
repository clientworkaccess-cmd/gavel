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



let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes(API_ENDPOINTS.LOGIN) ||
      originalRequest.url.includes(API_ENDPOINTS.REFRESH_TOKEN)
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await apiClient.get(API_ENDPOINTS.REFRESH_TOKEN);
          processQueue(null);
          resolve(apiClient(originalRequest));
        } catch (err) {
          processQueue(err);
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  }
);


export default apiClient;
