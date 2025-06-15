// src/auth.js
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";


const API_URL = "http://localhost:5000";

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwt_decode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return true;
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.warn("Refresh token ausente.");
    logout();
    return false;
  }

  try {
    const response = await axios.post(`${API_URL}/refresh`, {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    localStorage.setItem("access_token", response.data.access_token);
    return true;
  } catch (err) {
    console.error("Falha ao renovar o token:", err);
    logout();
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
