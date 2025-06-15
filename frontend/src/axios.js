// src/axios.js
import axios from "axios";
import {
  getAccessToken,
  isTokenExpired,
  refreshAccessToken,
  logout,
} from "./auth";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        logout();
        throw new axios.Cancel("Sessão expirada");
      }
      token = getAccessToken(); // obter novo token após refresh
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.warn("Token inválido ou expirado. Redirecionando...");
      logout();
    }
    return Promise.reject(error);
  }
);

export default API;
