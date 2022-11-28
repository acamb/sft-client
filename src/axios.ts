import axios from 'axios'
import router from "./router"
const baseURL = '/';

const instance = axios.create(
    {
        baseURL,
        headers: {
            "Content-Type": "application/json",
          }
    }
);
instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
instance.interceptors.response.use(
  (res) => { 
    return res
  },
  (err) => {
    if (err.response?.status === 401 && err.config?.url !== 'api/login'){
        sessionStorage.clear();
        router.push("/login");
    }
    else {
      router.push('/error');
      return Promise.reject(err);
    }
  }
)
export default instance;