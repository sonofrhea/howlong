import axios from 'axios';
import { ImportMeta } from './vite-env';
import { toast } from "react-hot-toast";


const isDevelopment = import.meta.env.MODE === "development";
const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

const marketplaceApiClient = axios.create({
  baseURL: baseEntry,
  timeout: 7000,
  withCredentials: false
});


marketplaceApiClient.interceptors.request.use(config => {
    const marketplaceToken = localStorage.getItem('MarketplaceToken');
    if (marketplaceToken) {
        config.headers.Authorization = `MarketplaceToken ${marketplaceToken}`;
    } else {
        config.headers.Authorization = ``
    }
    return config;
}, (error) => Promise.reject(error));

marketplaceApiClient.interceptors.response.use(response => {
    return response
}, (error) => {
    if (error.response && error.response?.status === 401) {
        localStorage.removeItem('MarketplaceToken')
        window.location.href = "/"
    }
    else if (error.response?.status === 403) {
        const message = error.response?.data?.detail
        || 'You do not have permission to perform this action.';

        toast.error(message, {duration: 8000,});
    }
    return Promise.reject(error);
})



export default marketplaceApiClient;