import { setCurrency } from "./components/store";
import apiClient from './BaseEngine';


export const initCurrency = async () => {
    try {
        const res = await apiClient.get('/core/company/profile/');
        const data = res.data;
        setCurrency(data.preferred_currency);
    } catch (e) {
        console.error('Failed to load preferred currency', e);
    }
};
