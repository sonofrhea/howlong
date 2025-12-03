import axios from 'axios';

//const baseEntry = 'http://127.0.0.1:8000/';

const isDevelopment = import.meta.env.MODE === "development";
const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

// my base configuration
const apiClient = axios.create({
  baseURL: baseEntry,
  timeout: 5000,
});

export default apiClient;
