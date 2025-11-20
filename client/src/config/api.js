// API Configuration - Always use live backend with HTTPS
const API_BASE_URL = import.meta.env.VITE_BASE_URL; // updated to GoDaddy domain


// Export the API_BASE_URL for use in other files
export { API_BASE_URL };

// API Endpoints
export const API_ENDPOINTS = {
  // 🔐 Auth endpoints
  LOGIN: `${API_BASE_URL}/api/login`,
  RESEND_VERIFICATION: `${API_BASE_URL}/api/resend-otp`,
  VERIFY_EMAIL: `${API_BASE_URL}/api/verify-email`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/request-password-reset`,
  RESET_PASSWORD: `${API_BASE_URL}/api/reset-password`,
  SIGNUP: `${API_BASE_URL}/api/signup`,
  LOGOUT: `${API_BASE_URL}/api/logout`,
  DASHBOARD: `${API_BASE_URL}/api/dashboard`,
  REFRESH_TOKEN: `${API_BASE_URL}/api/refresh-token`,
  USERS: `${API_BASE_URL}/api/users`,

  // ✉️ Utilities
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
  CAPTCHA_VERRIFICATION: `${API_BASE_URL}/api/verify-captcha`,

  // 🧑‍💼 Admin system
  ADMINS: `${API_BASE_URL}/api/admins`,

  // 👤 Client system
  CLIENTS: `${API_BASE_URL}/api/clients`,

  // 👨‍💻 Candidate system
  CANDIDATES: `${API_BASE_URL}/api/candidates`,

  // 🏢 Company & Positions
  COMPANY: `${API_BASE_URL}/api/company`,
  POSITION: `${API_BASE_URL}/api/position`,
  COMPANIES_NAMES: `${API_BASE_URL}/api/companies-names`,

  // 🗂️ Interviews
  INTERVIEW: `${API_BASE_URL}/api/interview`,
  INTERVIEW_CHECK: `${API_BASE_URL}/api/interview/check`,

  // 🌐 External
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL,
  WEBHOOK_REPORT_URL: import.meta.env.VITE_WEBHOOK_REPORT_URL,
  VAPI_PUBLIC_KEY: import.meta.env.VITE_VAPI_PUBLIC_KEY,
  VAPI_REPORT: import.meta.env.VITE_VAPI_REPORT,
  VAPI_ASSISTANT_HOSPITALITY_EN_KEY: import.meta.env.VITE_ASSISTANT_HOSPITALITY_EN_KEY,
  VAPI_ASSISTANT_HOSPITALITY_ES_KEY: import.meta.env.VITE_ASSISTANT_HOSPITALITY_ES_KEY,
  VAPI_ASSISTANT_LEGAL_EN_KEY: import.meta.env.VITE_ASSISTANT_LEGAL_EN_KEY,
  VAPI_ASSISTANT_LEGAL_ES_KEY: import.meta.env.VITE_ASSISTANT_LEGAL_ES_KEY,
};


export default API_ENDPOINTS;
