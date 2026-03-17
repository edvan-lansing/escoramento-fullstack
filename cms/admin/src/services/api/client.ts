import axios from "axios";
import { clearAuthSession, getToken } from "@/src/utils/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = String(error?.config?.url || "");
    const isLoginRequest = requestUrl.includes("/auth/login");

    if (status === 401 && !isLoginRequest && typeof window !== "undefined") {
      clearAuthSession();
      window.location.assign("/login");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
