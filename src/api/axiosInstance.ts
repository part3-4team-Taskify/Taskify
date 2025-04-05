// axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app",
});

// 👉 Authorization 헤더 자동 설정, 요청 보낼때 마다 localstorage에서 토큰 가져오기
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // localStorage에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 Authorization 추가
  }
  return config;
});

// 👉 요청 보낼 때마다 토큰 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // localStorage에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 Authorization 추가
  }
  return config;
});

export default axiosInstance;
