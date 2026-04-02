import apiClient from "../../BaseEngine";











export const fetchActivityLogs = async () => {
    try {
        const response = await apiClient.get('/core/activitylog/')
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
