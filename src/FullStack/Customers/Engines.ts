import apiClient from '../../BaseEngine';
import { AllCustomerInputs, CustomerInputs, 
  EditCustomerInputs, DebitNoteInputs,
  AllDebitNoteInputs, AllCreditNoteInputs,
  CreditNoteInputs,
  CustomerRefundInputs,
  AllCustomerRefundInputs
 } from './constants/Types';













 

// --------------------------------------------------------------------------------------------------------


// CUSTOMER PROFILE -  AXIOS

export const paginatedCustomers = async (page: number, pageSize: number) => {
  const response = await apiClient.get(`/customers/customerprofile/?page=${page}&page_size=${pageSize}/`);
  return response.data;
};

export const fetchCustomers = async () => {
  try {
    const response = await apiClient.get('/customers/customerprofile/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCustomerById = async (customer_number: number) => {
  try {
    const response = await apiClient.get(`/customers/customerprofile/${customer_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  
};

export const createCustomer = async (customerData: CustomerInputs) => {
  try {
    const response = await apiClient.post('/customers/customerprofile/', customerData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomer = async ({ customer_number, customerData }: AllCustomerInputs) => {
  try {
    const response = await apiClient.put(`/customers/customerprofile/${customer_number}/`, customerData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCustomer = async (customer_number: number) => {
  try {
    const response = await apiClient.delete(`/customers/customerprofile/${customer_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};





// --------------------------------------------------------------------------------------------------------

// DEBIT NOTE - AXIOS

export const fetchDebitNotes = async () => {
  try {
    const response = await apiClient.get('/customers/customerdebitnote/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDebitNoteById = async (debit_note_number: number) => {
  try {
    const response = await apiClient.get(`/customers/customerdebitnote/${debit_note_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDebitNote = async (debitNoteData: DebitNoteInputs) => {
  try {
    const response = await apiClient.post('/customers/customerdebitnote/', debitNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDebitNote = async ({ debit_note_number, debitNoteData }: AllDebitNoteInputs) => {
  try {
    const response = await apiClient.put(`/customers/customerdebitnote/${debit_note_number}/`, debitNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDebitNote = async (debit_note_number: number) => {
  try {
    const response = await apiClient.delete(`/customers/customerdebitnote/${debit_note_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// --------------------------------------------------------------------------------------------------------

//  CUSTOMER CREDIT NOTE - AXIOS

export const fetchCreditNotes = async () => {
  try {
    const response = await apiClient.get('/customers/customercreditnote/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCreditNoteById = async (credit_note_number: number) => {
  try {
    const response = await apiClient.get(`/customers/customercreditnote/${credit_note_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCreditNote = async (creditNoteData: CreditNoteInputs) => {
  try {
    const response = await apiClient.post('/customers/customercreditnote/', creditNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCreditNote = async ({ credit_note_number, creditNoteData }: AllCreditNoteInputs) => {
  try {
    const response = await apiClient.put(`/customers/customercreditnote/${credit_note_number}/`, creditNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCreditNote = async (credit_note_number: number) => {
  try {
    const response = await apiClient.delete(`/customers/customercreditnote/${credit_note_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};





// ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

// CUSTOMER REFUND - AXIOS

export const fetchRefunds = async () => {
  try {
    const response = await apiClient.get('/customers/customerrefund/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRefundById = async (refund_number: number) => {
  try {
    const response = await apiClient.get(`/customers/customerrefund/${refund_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createRefund = async (refundData: CustomerRefundInputs) => {
  try {
    const response = await apiClient.post('/customers/customerrefund/', refundData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateRefund = async ({ refund_number, refundData }: AllCustomerRefundInputs) => {
  try {
    const response = await apiClient.put(`/customers/customerrefund/${refund_number}/`, refundData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRefund = async (refund_number: number) => {
  try {
    const response = await apiClient.delete(`/customers/customerrefund/${refund_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// ---------------------------------------------------------------------------
