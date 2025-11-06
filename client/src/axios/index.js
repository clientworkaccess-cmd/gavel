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
apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // ✅ Prevent refresh loop on login or refresh-token endpoints
    if (
      originalRequest.url.includes(API_ENDPOINTS.LOGIN) ||
      originalRequest.url.includes(API_ENDPOINTS.REFRESH_TOKEN)
    ) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401) {
      try {
        await apiClient.get(API_ENDPOINTS.REFRESH_TOKEN);
        return apiClient(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);


export default apiClient;
