import apiClient from '../../BaseEngine';
import { AllCustomerInputs, CustomerInputs, 
  EditCustomerInputs, DebitNoteInputs,
  AllDebitNoteInputs
 } from './constants/Types';















// --------------------------------------------------------------------------------------------------------


// CUSTOMER PROFILE -  AXIOS

export const fetchCustomers = async () => {
  const response = await apiClient.get('/customers/customerprofile/');
  return response.data;
};

export const fetchCustomerById = async (customer_number: number) => {
  const response = await apiClient.get(`/customers/customerprofile/${customer_number}/`);
  return response.data;
};

export const createCustomer = async (customerData: CustomerInputs | FormData) => {
  const response = await apiClient.post('/customers/customerprofile/', customerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateCustomer = async ({ customer_number, customerData }: AllCustomerInputs) => {
  const response = await apiClient.put(`/customers/customerprofile/${customer_number}/`, customerData);
  return response.data;
};

export const deleteCustomer = async (customer_number: number) => {
  await apiClient.delete(`/customers/customerprofile/${customer_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------

// DEBIT NOTE - AXIOS

export const fetchDebitNotes = async () => {
  const response = await apiClient.get('/customers/customerdebitnote/');
  return response.data;
};

export const fetchDebitNoteById = async (debit_note_number: number) => {
  const response = await apiClient.get(`/customers/customerdebitnote/${debit_note_number}/`);
  return response.data;
};

export const createDebitNote = async (debitNoteData: DebitNoteInputs) => {
  const response = await apiClient.post('/customers/customerdebitnote/', debitNoteData);
  return response.data;
};

export const updateDebitNote = async ({ debit_note_number, debitNoteData }: AllDebitNoteInputs) => {
  const response = await apiClient.put(`/customers/customerdebitnote/${debit_note_number}/`, debitNoteData);
  return response.data;
};

export const deleteDebitNote = async (debit_note_number: number) => {
  await apiClient.delete(`/customers/customerdebitnote/${debit_note_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------

//  CUSTOMER CREDIT NOTE - AXIOS

export const fetchCreditNotes = async () => {
  const response = await apiClient.get('/customers/customercreditnote/');
  return response.data;
};

export const fetchCreditNoteById = async (credit_note_number) => {
  const response = await apiClient.get(`/customers/customercreditnote/${credit_note_number}/`);
  return response.data;
};

export const createCreditNote = async (creditNoteData) => {
  const response = await apiClient.post('/customers/customercreditnote/', creditNoteData);
  return response.data;
};

export const updateCreditNote = async ({ credit_note_number, creditNoteData }) => {
  const response = await apiClient.put(`/customers/customercreditnote/${credit_note_number}/`, creditNoteData);
  return response.data;
};

export const deleteCreditNote = async (credit_note_number) => {
  await apiClient.delete(`/customers/customercreditnote/${credit_note_number}/`);
  return true;
};





// ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

// CUSTOMER REFUND - AXIOS

export const fetchRefunds = async () => {
  const response = await apiClient.get('/customers/customerrefund/');
  return response.data;
};

export const fetchRefundById = async (refund_number) => {
  const response = await apiClient.get(`/customers/customerrefund/${refund_number}/`);
  return response.data;
};

export const createRefund = async (refundData) => {
  const response = await apiClient.post('/customers/customerrefund/', refundData);
  return response.data;
};

export const updateRefund = async ({ refund_number, refundData }) => {
  const response = await apiClient.put(`/customers/customerrefund/${refund_number}/`, refundData);
  return response.data;
};

export const deleteRefund = async (refund_number) => {
  await apiClient.delete(`/customers/customerrefund/${refund_number}/`);
  return true;
};





// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

// INVOICES

export const fetchInvoices = async () => {
  const response = await apiClient.get(`/sales/invoice/`);
  return response.data;
};

export const fetchInvoiceById = async (invoice_number) => {
  const response = await apiClient.get(`/sales/invoice/${invoice_number}`);
  return response.data;
};





// ---------------------------------------------------------------------------

// PRODUCTS

export const fetchProducts = async () => {
  const response = await apiClient.get(`/products/productitem/`);
  return response.data;
};

export const fetchProductById = async (item_code) => {
  const response = await apiClient.get(`/products/productitem/${item_code}`);
  return response.data;
};