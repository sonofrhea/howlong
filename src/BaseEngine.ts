import axios from 'axios';
import { ImportMeta } from './vite-env';
import { toast } from "react-hot-toast";

//const baseEntry = 'http://127.0.0.1:8000/';

const isDevelopment = import.meta.env.MODE === "development";
const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

// my base configuration
const apiClient = axios.create({
  baseURL: baseEntry,
  timeout: 7000,
  withCredentials: false
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('Token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    else {
      config.headers.Authorization = ``
    }
    return config;
},(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(response => {
  return response
}, (error) => {
  if (error.response && error.response?.status === 401) {
    localStorage.removeItem('Token')
    window.location.href = "/login"
  }
  else if (error.response?.status === 403) {
    const message = error.response?.data?.detail
    || 'You do not have permission to perform this action.';

    toast.error(message, {duration: 8000,});
  }
  return Promise.reject(error);
})



export default apiClient;
