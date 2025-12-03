import apiClient from '../../BaseEngine';

import { allCustomerInputs, CustomerCreateResponse, CustomerInputs } from './Interfaces';


// Request interceptor for auth headers
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});




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

export const createCustomer = async (customerData: CustomerInputs) => {
  const response = await apiClient.post('/customers/customerprofile/', customerData);
  return response.data;
};

export const updateCustomer = async ({ customer_number, customerData }: allCustomerInputs) => {
  const response = await apiClient.put(`/customers/customerprofile/${customer_number}/`, customerData);
  return response.data;
};

export const deleteCustomer = async (customer_number: number) => {
  await apiClient.delete(`/customers/customerprofile/${customer_number}/`);
  return true;
};




// --------------------------------------------------------------------------------------------------------


// INCOME AND EXPENSES -  AXIOS

export const fetchIncomeAndExpenses = async () => {
  const response = await apiClient.get('/accounting/incomeandexpenses/');
  return response.data;
};

export const fetchIncomeAndExpenseById = async (reference_number) => {
  const response = await apiClient.get(`/accounting/incomeandexpenses/${reference_number}/`);
  return response.data;
};

export const createIncomeAndExpense = async (incomeAndExpensesData) => {
  const response = await apiClient.post('/accounting/incomeandexpenses/', incomeAndExpensesData);
  return response.data;
};

export const updateIncomeAndExpense = async ({ reference_number, incomeAndExpensesData }) => {
  const response = await apiClient.put(`/accounting/incomeandexpenses/${reference_number}/`, incomeAndExpensesData);
  return response.data;
};

export const deleteIncomeAndExpense = async (reference_number) => {
  await apiClient.delete(`/accounting/incomeandexpenses/${reference_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------


// JOURNAL -  AXIOS

export const fetchJournals = async () => {
  const response = await apiClient.get('/accounting/journalheaders/');
  return response.data;
};

export const fetchJournalById = async (journal_number) => {
  const response = await apiClient.get(`/accounting/journalheaders/${journal_number}/`);
  return response.data;
};

export const createJournal = async (journalData) => {
  const response = await apiClient.post('/accounting/journalheaders/', journalData);
  return response.data;
};

export const updateJournal = async ({ journal_number, journalData }) => {
  const response = await apiClient.put(`/accounting/journalheaders/${journal_number}/`, journalData);
  return response.data;
};

export const deleteJournal = async (journal_number) => {
  await apiClient.delete(`/accounting/journalheaders/${journal_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------



// CASH BOOK -  AXIOS

export const fetchCashBooks = async () => {
  const response = await apiClient.get('/accounting/cashbookentries/');
  return response.data;
};

export const fetchCashBookById = async (reference_number) => {
  const response = await apiClient.get(`/accounting/cashbookentries/${reference_number}/`);
  return response.data;
};

export const createCashBook = async (cashBookData) => {
  const response = await apiClient.post('/accounting/cashbookentries/', cashBookData);
  return response.data;
};

export const updateCashBook = async ({ reference_number, cashBookData }) => {
  const response = await apiClient.put(`/accounting/cashbookentries/${reference_number}/`, cashBookData);
  return response.data;
};

export const deleteCashBook = async (reference_number) => {
  await apiClient.delete(`/accounting/cashbookentries/${reference_number}/`);
  return true;
};

// --------------------------------------------------------------------------------------------------------



// PAYMENT VOUCHER -  AXIOS

export const fetchPaymentVouchers = async () => {
  const response = await apiClient.get('/accounting/paymentvouchers/');
  return response.data;
};

export const fetchPaymentVoucherById = async (reference_number) => {
  const response = await apiClient.get(`/accounting/paymentvouchers/${reference_number}/`);
  return response.data;
};

export const createPaymentVoucher = async (paymentVoucherData) => {
  const response = await apiClient.post('/accounting/paymentvouchers/', paymentVoucherData);
  return response.data;
};

export const updatePaymentVoucher = async ({ reference_number, paymentVoucherData }) => {
  const response = await apiClient.put(`/accounting/paymentvouchers/${reference_number}/`, paymentVoucherData);
  return response.data;
};

export const deletePaymentVoucher = async (reference_number) => {
  await apiClient.delete(`/accounting/paymentvouchers/${reference_number}/`);
  return true;
};

// --------------------------------------------------------------------------------------------------------



// RECEIPT VOUCHER -  AXIOS

export const fetchReceiptVouchers = async () => {
  const response = await apiClient.get('/accounting/receiptvoucher/');
  return response.data;
};

export const fetchReceiptVoucherById = async (reference_number) => {
  const response = await apiClient.get(`/accounting/receiptvoucher/${reference_number}/`);
  return response.data;
};

export const createReceiptVoucher = async (receiptVoucherData) => {
  const response = await apiClient.post('accounting/paymentvouchers/', receiptVoucherData);
  return response.data;
};

export const updateReceiptVoucher = async ({ reference_number, receiptVoucherData }) => {
  const response = await apiClient.put(`accounting/paymentvouchers/${reference_number}/`, receiptVoucherData);
  return response.data;
};

export const deleteReceiptVoucher = async (reference_number) => {
  await apiClient.delete(`accounting/paymentvouchers/${reference_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------



// BANK STATEMENTS -  AXIOS

export const fetchBankStatements = async () => {
  const response = await apiClient.get('/accounting/bankstatements/');
  return response.data;
};

export const fetchBankStatementById = async (statement_id) => {
  const response = await apiClient.get(`/accounting/bankstatements/${statement_id}/`);
  return response.data;
};

export const createBankStatement = async (receiptVoucherData) => {
  const response = await apiClient.post('/accounting/bankstatements/', receiptVoucherData);
  return response.data;
};

export const updateBankStatement = async ({ statement_id, receiptVoucherData }) => {
  const response = await apiClient.put(`/accounting/bankstatements/${statement_id}/`, receiptVoucherData);
  return response.data;
};

export const deleteBankStatement = async (statement_id) => {
  await apiClient.delete(`/accounting/bankstatements/${statement_id}/`);
  return true;
};
