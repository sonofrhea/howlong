import apiClient from '../../BaseEngine';




apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});







// AGENTS -  AXIOS




export const fetchAgents = async () => {
  const response = await apiClient.get('/core/customuser/');
  return response.data;
};

export const fetchAgentById = async (id: number) => {
  const response = await apiClient.get(`/core/customuser/${id}/`);
  return response.data;
};


export const fetchAgentByUsername = async (username: string) => {
  const response = await apiClient.get(`/core/customuser/${username}/`);
  return response.data;
};





// CURRENCIES -  AXIOS

export const fetchCurrencies = async () => {
  const response = await apiClient.get('/core/currencies/');
  return response.data;
};


// BANKS -  AXIOS

export const fetchBanks = async () => {
  const response = await apiClient.get('/core/banks/');
  return response.data;
};