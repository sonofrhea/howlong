import apiClient from '../../BaseEngine';
import { CompanyProfileInputs, UserProfileInputs } from './constants/Types';










// AGENTS -  AXIOS




export const fetchAgents = async () => {
  const response = await apiClient.get('/core/users/profile/');
  return response.data;
};

export const fetchAgentById = async (id: number) => {
  const response = await apiClient.get(`/core/users/profile/${id}/`);
  return response.data;
};


export const fetchAgentByName = async (name: string) => {
  const response = await apiClient.get(`/core/users/profile/${name}/`);
  return response.data;
};

export const fetchAgentByEmail = async (email: string) => {
  const response = await apiClient.get(`/core/users/profile/${email}/`);
  return response.data;
};





// CURRENCIES -  AXIOS

export const fetchCurrencies = async () => {
  try {
    const response = await apiClient.get('/core/currencies/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// BANKS -  AXIOS

export const fetchBanks = async () => {
  try {
    const response = await apiClient.get('/core/banks/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//  ROLES

export const fetchRoles = async (name: string) => {
  try {
    const response = await apiClient.get('/core/roles/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};




// --------------------------------------------------------------------------------------------------------
                  // COMPANY


export const fetchCompanyProfile = async () => {
  try {
    const response = await apiClient.get('/core/company/profile/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



export const patchCompanyProfile = async (companyData : FormData ) => {
  try {
    const response = await apiClient.patch('/core/company/profile/', companyData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};




// --------------------------------------------------------------------------------------------------------
                  // USER


export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get('/core/users/profile/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const patchUserProfile = async (userProfileData: UserProfileInputs) => {
  try {
    const response = await apiClient.patch('/core/users/profile/', userProfileData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
