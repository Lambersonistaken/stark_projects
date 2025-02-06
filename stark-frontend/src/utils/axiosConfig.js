/* eslint-disable no-unused-vars */
import axios from 'axios';
import keycloak from '../keycloak';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token yenileme hatası durumunda yeniden login
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await keycloak.updateToken(5);
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return axios(originalRequest);
      } catch (err) {
        keycloak.login();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 