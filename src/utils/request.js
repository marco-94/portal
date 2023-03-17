import axios from 'axios'
import router from "../router";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000
  });

  const forbidList = ["/user/log_in"];

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      if (!forbidList.includes(config.url)) {
        const token = sessionStorage.getItem('token');
        if (token) {
          token && (config.headers.Authorization = token);
        } else {
          router.replace({name: "Login"})
        }
      }
      return config
    },
    error => {
      return Promise.error(error)
    });

  // 响应拦截
  instance.interceptors.response.use(response => {
    if (response.status === 403) {
    router.replace({name: "Login"})
  }
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }, error => {
    if (error.response.status) {
      // 对不同返回码对相应处理
      return Promise.reject(error.response)
    }
  });

  // 3.发送真正的网络请求
  return instance(config)
}
