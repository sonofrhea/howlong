import axios from 'axios';
import { ImportMeta } from './vite-env';

//const baseEntry = 'http://127.0.0.1:8000/';

const isDevelopment = import.meta.env.MODE === "development";
const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

// my base configuration
const apiClient = axios.create({
  baseURL: baseEntry,
  //timeout: 5000,
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
},//(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(response => {
  return response
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('Token')
    window.location.href = "/"
  }
})



export default apiClient;
