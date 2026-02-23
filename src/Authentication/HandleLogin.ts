import apiClient from '../BaseEngine';
import { ImportMeta } from '../vite-env';



export const HandleLogin = async (email: string, password: any) => {
  const isDevelopment = import.meta.env.MODE === "development";
  const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

 try {
   const response = await apiClient.post(`${baseEntry}core/login/`, {
     email,
     password
   });
   localStorage.setItem('Token', response.data.token);
   return response?.data; 
 } catch (error: any) {
      //console.log("ERROR TYPE:", error.constructor.name);
      //console.log("ERROR KEYS:", Object.keys(error));
      //console.log("FULL ERROR OBJECT:", error);
      //console.log("FULL ERROR:", error.response?.data?.detail);
      throw error; 
 }
};




export const handleStayLoggedIn = async () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

  try {
    const response = await apiClient.post(`${baseEntry}core/auth/ping/`, {});
    return response?.data;
  } catch (error: any) {
      //console.log("ERROR TYPE:", error.constructor.name);
      //console.log("ERROR KEYS:", Object.keys(error));
      //console.log("FULL ERROR OBJECT:", error);
    throw error;
  }
};
