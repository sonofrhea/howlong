import marketplaceApiClient from "../FullStack/MarketplaceBaseEngine";
import { ImportMeta } from '../vite-env';



const HandleMarketplaceLogin = async (email: string, password: any) => {
    const isDevelopment = import.meta.env.MODE === "development";
    const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

    try {
        const response = await marketplaceApiClient.post(`${baseEntry}marketplace/marketplace-login/`, {
            email,
            password
        });
        localStorage.setItem('MarketplaceToken', response.data.marketplace_token);
        return response?.data;
    } catch (error: any) {
        console.log("ERROR TYPE:", error.constructor.name);
        console.log("ERROR KEYS:", Object.keys(error));
        console.log("FULL ERROR OBJECT:", error);
        throw error;
    }
};
export default HandleMarketplaceLogin;
