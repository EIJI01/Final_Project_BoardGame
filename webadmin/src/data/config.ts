import axios from "axios";
import { url } from "../utils/url";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const localRefreshToken = localStorage.getItem("refreshToken")!;
        const localAccessToken = localStorage.getItem("accessToken")!;

        console.log(localAccessToken);
        console.log(localRefreshToken);

        const response = await axios.post(`${url}/authentication/refreshToken`, {
          accessToken: localAccessToken,
          refreshToken: localRefreshToken,
        });

        const { accessToken, refreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
