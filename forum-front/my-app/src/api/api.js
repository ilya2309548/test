import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://147.45.219.199:8081/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const api = axiosInstance;
