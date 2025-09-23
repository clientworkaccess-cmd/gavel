// API utility functions with automatic token refresh
import { API_BASE_URL } from '../config/api.js';

// Function to make authenticated API calls
export const authenticatedFetch = async (endpoint, options = {}) => {
  let accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  // Add authorization header
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    ...options.headers
  };

  const makeRequest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include'
      });
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  let response = await makeRequest();

  // Retry if token expired
  if (response.status === 401) {
    try {
      const errorData = await response.json();
      if (errorData.code === 'TOKEN_EXPIRED') {
        const newToken = await refreshToken();
        if (newToken) {
          // Update header with new token
          headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request
          response = await makeRequest();
        }
      }
    } catch (err) {
      console.error('Failed to parse 401 response or refresh token:', err);
    }
  }

  return response;
};

// Function to refresh access token
export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    } else {
      logoutAndRedirect();
      return null;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    logoutAndRedirect();
    return null;
  }
};

// Logout helper
const logoutAndRedirect = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  localStorage.removeItem('admin_logged_in');
  localStorage.removeItem('client_logged_in');
  localStorage.removeItem('candidate_logged_in');
  window.location.href = '/login';
};

// Function to logout
export const logout = async () => {
  try {
    await fetch(`${API_BASE_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    logoutAndRedirect();
  }
};

// Function to test if backend is reachable
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (response.ok) {
      return true;
    } else {
      console.error('Backend responded with error:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
};
