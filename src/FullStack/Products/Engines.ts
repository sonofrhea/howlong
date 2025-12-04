import apiClient from '../../BaseEngine';
import { AllProductGroupInputs, ProductGroupInputs,
    ProductItemInputs, AllProductItemInputs
 } from './Interfaces';














// --------------------------------------------------------------------------------------------------------
            // PRODUCT GROUP


export const fetchProductGroups = async () => {
    const response = await apiClient.get('/products/productgroup/');
    return response.data;
};

export const fetchProductGroupById = async (group_code: number) => {
    const response = await apiClient.get(`/products/productgroup/${group_code}/`);
    return response.data;
};

export const createProductGroup = async (productGroupData: ProductGroupInputs) => {
    const response = await apiClient.post('/products/productgroup/', productGroupData);
    return response.data;
};

export const putUpdateProductGroup = async ({group_code, productGroupData}: AllProductGroupInputs) => {
    const response = await apiClient.put(`/products/productgroup//${group_code}`, productGroupData);
    return response.data;
};

export const patchUpdateProductGroup = async ({group_code, productGroupData}: AllProductGroupInputs) => {
    const response = await apiClient.patch(`/products/productgroup/${group_code}`, productGroupData);
    return response.data;
};

export const deleteProductGroup = async (group_code: number) => {
    apiClient.delete(`/products/productgroup/${group_code}/`);
    return true;
};



// -------------------------------------------------------------------------------------------------
            // PRODUCT ITEMS


export const fetchProductItems = async () => {
    const response = await apiClient.get('/products/productitem/');
    return response.data;
};

export const fetchProductItemById = async (item_code: number) => {
    const response = await apiClient.get(`/products/productitem/${item_code}/`);
    return response.data;
};

export const createProductItem = async (productItemData: ProductItemInputs) => {
    const response = await apiClient.post('/products/productitem/', productItemData);
    return response.data;
};

export const putUpdateProductItem = async ({item_code, productItemData}: AllProductItemInputs) => {
    const response = await apiClient.put(`/products/productitem/${item_code}`, productItemData);
    return response.data;
};

export const patchUpdateProductItem = async ({item_code, productItemData}: AllProductItemInputs) => {
    const response = await apiClient.patch(`/products/productitem/${item_code}`, productItemData);
    return response.data;
};

export const deleteProductItem = async (item_code: number) => {
    apiClient.delete(`/products/productitem/${item_code}/`);
    return true;
};








