import axios from "axios";
import { Toast } from "vant";

const request = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      config.params = { token: token };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error(res.success || "Error"));
    } else {
      if (res.code === 200) {
        return res.result;
      } else {
        Toast(res.success);
      }
    }
  },
  (error) => Promise.reject(error)
);

export default request;
