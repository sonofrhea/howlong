import axios from 'axios';

const baseURL = 'http://0.0.0.0:8000/'

const AxiosInstance = axios.create({
    baseURL: baseURL, 
    timeout: 5000,
    //headers: {
    //    "Content-Type":"application/json",
    //    accept: "application/json"
    //}
})
export default AxiosInstance;
