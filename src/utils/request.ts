import axios from "axios";
import { Notify } from "vant";
const request = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      const errorMsg = res.message || res.success || "请求异常";
      Notify({ type: "danger", message: errorMsg });
      if (res.code === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return Promise.reject(new Error(errorMsg));
    } else {
      return res.result;
    }
  },
  (error) => Promise.reject(error)
);

export default request;
