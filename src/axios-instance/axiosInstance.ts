// axiosInstance.js
import axios from 'axios';
import { getCookie } from '../utils/cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/', // Replace with your API base URL
  timeout: 10000, // Set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding a request interceptor to attach the token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('authentication'); // Retrieve token from cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, you can add a response interceptor to handle responses or errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., redirect on 401, etc.)
    return Promise.reject(error);
  }
);

export default axiosInstance;
