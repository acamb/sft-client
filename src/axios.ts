import axios from 'axios'
import { useRouter } from 'vue-router';
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
        const router = useRouter();
        router.push("/login");
    }
    else {
      return Promise.reject(err);
    }
  }
)
export default instance;