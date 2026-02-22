import apiClient from '../../BaseEngine';


import { AllCompanyPurchaseInvoiceInputs, AllCompanyPurchaseOrderInputs, 
    CompanyPurchaseInvoiceInputs, CompanyPurchaseInvoiceResponse, 
    CompanyPurchaseOrderInputs, CompanyPurchaseOrderResponse } from './constants/Types';








// --------------------------------------------------------------------------------------------------------


// PURCHASE INVOICE -  AXIOS

export const fetchCompanyPurchaseInvoices = async () => {
  try {
    const response = await apiClient.get('/purchases/companypurchaseinvoice/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCompanyPurchaseInvoiceById = async (purchase_invoice_number: number) => {
  try {
    const response = await apiClient.get(`/purchases/companypurchaseinvoice/${purchase_invoice_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCompanyPurchaseInvoice = async (companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs) => {
  try {
    const response = await apiClient.post('/purchases/companypurchaseinvoice/', companyPurchaseInvoiceData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCompanyPurchaseInvoice = async ({
  purchase_invoice_number,
  companyPurchaseInvoiceData
}: AllCompanyPurchaseInvoiceInputs) => {
  try {
    const response = await apiClient.put(
      `/purchases/companypurchaseinvoice/${purchase_invoice_number}/`,
      companyPurchaseInvoiceData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCompanyPurchaseInvoice = async (purchase_invoice_number: number) => {
  try {
    const response = await apiClient.delete(`/purchases/companypurchaseinvoice/${purchase_invoice_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// --------------------------------------------------------------------------------------------------------

// PURCHASE ORDER - AXIOS

export const fetchCompanyPurchaseOrders = async () => {
  try {
    const response = await apiClient.get('/purchases/companypurchaseorder/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCompanyPurchaseOrderById = async (purchase_order_number: number) => {
  try {
    const response = await apiClient.get(`/purchases/companypurchaseorder/${purchase_order_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCompanyPurchaseOrder = async (companyPurchaseOrderData: CompanyPurchaseOrderInputs | FormData) => {
  try {
    const response = await apiClient.post('/purchases/companypurchaseorder/', companyPurchaseOrderData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCompanyPurchaseOrder = async ({
  purchase_order_number,
  companyPurchaseOrderData
}: AllCompanyPurchaseOrderInputs) => {
  try {
    const response = await apiClient.put(`/purchases/companypurchaseorder/${purchase_order_number}/`, companyPurchaseOrderData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCompanyPurchaseOrder = async (purchase_order_number: number) => {
  try {
    const response = await apiClient.delete(`/purchases/companypurchaseorder/${purchase_order_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};
