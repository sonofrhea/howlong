import apiClient from '../../BaseEngine';


import { AllCompanyPurchaseInvoiceInputs, AllCompanyPurchaseOrderInputs, 
    CompanyPurchaseInvoiceInputs, CompanyPurchaseInvoiceResponse, 
    CompanyPurchaseOrderInputs, CompanyPurchaseOrderResponse } from './Interfaces';








// --------------------------------------------------------------------------------------------------------


// PURCHASE INVOICE -  AXIOS

export const fetchCompanyPurchaseInvoices = async () => {
  const response = await apiClient.get('/purchases/companypurchaseinvoice/');
  return response.data;
};

export const fetchCompanyPurchaseInvoiceById = async (purchase_invoice_number: number) => {
  const response = await apiClient.get(`/purchases/companypurchaseinvoice/${purchase_invoice_number}/`);
  return response.data;
};

export const createCompanyPurchaseInvoice = async (companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs) => {
  const response = await apiClient.post('/purchases/companypurchaseinvoice/', companyPurchaseInvoiceData);
  return response.data;
};

export const updateCompanyPurchaseInvoice = async ({ 
    purchase_invoice_number, companyPurchaseInvoiceData 
}: AllCompanyPurchaseInvoiceInputs) => {
  const response = await apiClient.put(
    `/purchases/companypurchaseinvoice/${purchase_invoice_number}/`, companyPurchaseInvoiceData
);
  return response.data;
};

export const deleteCompanyPurchaseInvoice = async (purchase_invoice_number: number) => {
  await apiClient.delete(`/purchases/companypurchaseinvoice/${purchase_invoice_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------

// PURCHASE ORDER - AXIOS

export const fetchCompanyPurchaseOrders = async () => {
  const response = await apiClient.get('/purchases/companypurchaseorder/');
  return response.data;
};

export const fetchCompanyPurchaseOrderById = async (purchase_order_number: number) => {
  const response = await apiClient.get(`/purchases/companypurchaseorder/${purchase_order_number}/`);
  return response.data;
};

export const createCompanyPurchaseOrder = async (companyPurchaseOrderData: CompanyPurchaseOrderInputs | FormData) => {
  const response = await apiClient.post('/purchases/companypurchaseorder/', companyPurchaseOrderData, {
    headers: {
      "Content-Type": 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateCompanyPurchaseOrder = async (
  { purchase_order_number, companyPurchaseOrderData }: AllCompanyPurchaseOrderInputs) => {
  const response = await apiClient.put(`/purchases/companypurchaseorder/${purchase_order_number}/`, companyPurchaseOrderData);
  return response.data;
};

export const deleteCompanyPurchaseOrder = async (purchase_order_number: number) => {
  await apiClient.delete(`/purchases/companypurchaseorder/${purchase_order_number}/`);
  return true;
};
