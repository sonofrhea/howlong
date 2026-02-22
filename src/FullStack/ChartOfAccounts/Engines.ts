import apiClient from '../../BaseEngine';





apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    };
    return config;
});







export const fetchChartOfAccounts = async () => {
  try {
    const response = await apiClient.get('/chartofaccounts/chartofaccounts/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};