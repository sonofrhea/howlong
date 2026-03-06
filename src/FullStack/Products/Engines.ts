import apiClient from '../../BaseEngine';
import { AllProductGroupInputs, ProductGroupInputs,
    ProductItemInputs, AllProductItemInputs
 } from './constants/Types';














// --------------------------------------------------------------------------------------------------------
            // PRODUCT GROUP


export const fetchProductGroups = async () => {
  try {
    const response = await apiClient.get('/products/productgroup/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductGroupById = async (group_code: number) => {
  try {
    const response = await apiClient.get(`/products/productgroup/${group_code}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProductGroup = async (productGroupData: ProductGroupInputs) => {
  try {
    const response = await apiClient.post('/products/productgroup/', productGroupData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUpdateProductGroup = async ({ group_code, productGroupData }: AllProductGroupInputs) => {
  try {
    const response = await apiClient.put(`/products/productgroup/${group_code}/`, productGroupData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchUpdateProductGroup = async ({ group_code, productGroupData }: AllProductGroupInputs) => {
  try {
    const response = await apiClient.patch(`/products/productgroup/${group_code}/`, productGroupData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductGroup = async (group_code: number) => {
  try {
    const response = await apiClient.delete(`/products/productgroup/${group_code}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};



// -------------------------------------------------------------------------------------------------
            // PRODUCT ITEMS


export const fetchProductItems = async () => {
  try {
    const response = await apiClient.get('/products/productitem/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductItemById = async (item_code: number) => {
  try {
    const response = await apiClient.get(`/products/productitem/${item_code}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProductItem = async (productItemData: ProductItemInputs | FormData) => {
  try {
    const response = await apiClient.post('/products/productitem/', productItemData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUpdateProductItem = async ({ item_code, productItemData }: AllProductItemInputs) => {
  try {
    const response = await apiClient.put(`/products/productitem/${item_code}/`, productItemData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchUpdateProductItem = async ({ item_code, productItemData }: AllProductItemInputs) => {
  try {
    const response = await apiClient.patch(`/products/productitem/${item_code}/`, productItemData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductItem = async (item_code: number) => {
  try {
    const response = await apiClient.delete(`/products/productitem/${item_code}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};








