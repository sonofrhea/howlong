import apiClient from '../../BaseEngine';










// AGENTS -  AXIOS




export const fetchAgents = async () => {
  const response = await apiClient.get('/core/users/');
  return response.data;
};

export const fetchAgentById = async (id: number) => {
  const response = await apiClient.get(`/core/users/${id}/`);
  return response.data;
};


export const fetchAgentByName = async (name: string) => {
  const response = await apiClient.get(`/core/users/${name}/`);
  return response.data;
};

export const fetchAgentByEmail = async (email: string) => {
  const response = await apiClient.get(`/core/users/${email}/`);
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

//  ROLES

export const fetchRoles = async (name: string) => {
  const response = await apiClient.get('/core/roles/');
  return response.data;
};