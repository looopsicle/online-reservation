import axios from 'axios';

// Base URL API, bisa diambil dari env variable agar mudah konfigurasi per environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create instance axios dengan konfigurasi default
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 detik timeout, sesuaikan sesuai kebutuhan
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor, untuk tambah token otentikasi misal
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage atau state management (Redux, Context, dll)
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor, untuk handle error global, refresh token, dll
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Contoh handle 401 unauthorized
    if (error.response?.status === 401) {
      // Bisa trigger logout, redirect ke login, dll
      console.warn('Unauthorized! Redirect to login...');
      window.location.href = '/login';
    }
    // Kamu bisa handle error lain sesuai kebutuhan
    return Promise.reject(error);
  }
);

export default axiosInstance;
