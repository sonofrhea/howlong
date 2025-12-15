import apiClient from '../BaseEngine';
import { ImportMeta } from '../vite-env';


const HandleLogin = async (email: string, password: any) => {
    const isDevelopment = import.meta.env.MODE === "development";
  const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

 try {
   const response = await apiClient.post(`${baseEntry}core/login/`, {
     email,
     password
   });
   localStorage.setItem('Token', response.data.token);
   return response.data; 
 } catch (error: any) {
   console.error('Login failed:', error.response?.data || error.message);
   throw error; 
 }
};
export default HandleLogin;
