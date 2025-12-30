import apiClient from '../../BaseEngine';


import { AllIncomeAndExpenses, AllJournalHeaderInputs, 
  AllPaymentVoucherInputs, 
  AllReceiptVoucherInputs, 
  IncomeAndExpensesInputs, 
  JournalHeaderInputs, 
  PaymentVoucherInputs,
  ReceiptVoucherInputs} from './Constants/Types';






// --------------------------------------------------------------------------------------------------------


// INCOME AND EXPENSES -  AXIOS

export const fetchIncomeAndExpenses = async () => {
  const response = await apiClient.get('/accounting/incomeandexpenses/');
  return response.data;
};

export const fetchIncomeAndExpenseById = async (reference_number: number) => {
  const response = await apiClient.get(`/accounting/incomeandexpenses/${reference_number}/`);
  return response.data;
};

export const createIncomeAndExpense = async (incomeAndExpensesData: IncomeAndExpensesInputs) => {
  const response = await apiClient.post('/accounting/incomeandexpenses/', incomeAndExpensesData);
  return response.data;
};

export const updateIncomeAndExpense = async ({ reference_number, incomeAndExpensesData }: AllIncomeAndExpenses) => {
  const response = await apiClient.put(`/accounting/incomeandexpenses/${reference_number}/`, incomeAndExpensesData);
  return response.data;
};

export const deleteIncomeAndExpense = async (reference_number: number) => {
  await apiClient.delete(`/accounting/incomeandexpenses/${reference_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------


// JOURNAL -  AXIOS

export const fetchJournalEntries = async () => {
  const response = await apiClient.get('/accounting/journalheaders/');
  return response.data;
};

export const fetchJournalEntryById = async (journal_number: number) => {
  const response = await apiClient.get(`/accounting/journalheaders/${journal_number}/`);
  return response.data;
};

export const createJournalEntry = async (journalEntryData: JournalHeaderInputs) => {
  const response = await apiClient.post('/accounting/journalheaders/', journalEntryData);
  return response.data;
};

export const updateJournalEntry = async ({ journal_number, journalEntryData }: AllJournalHeaderInputs) => {
  const response = await apiClient.put(`/accounting/journalheaders/${journal_number}/`, journalEntryData);
  return response.data;
};

export const deleteJournalEntry = async (journal_number: number) => {
  await apiClient.delete(`/accounting/journalheaders/${journal_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------



// CASH BOOK -  AXIOS

export const fetchCashBooks = async () => {
  const response = await apiClient.get('/accounting/cashbookentries/');
  return response.data;
};

export const fetchCashBookById = async (reference_number: number) => {
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

export const deleteCashBook = async (reference_number: number) => {
  await apiClient.delete(`/accounting/cashbookentries/${reference_number}/`);
  return true;
};

// --------------------------------------------------------------------------------------------------------



// PAYMENT VOUCHER -  AXIOS

export const fetchPaymentVouchers = async () => {
  const response = await apiClient.get('/accounting/paymentvouchers/');
  return response.data;
};

export const fetchPaymentVoucherById = async (reference_number: number) => {
  const response = await apiClient.get(`/accounting/paymentvouchers/${reference_number}/`);
  return response.data;
};

export const createPaymentVoucher = async (paymentVoucherData: PaymentVoucherInputs) => {
  const response = await apiClient.post('/accounting/paymentvouchers/', paymentVoucherData);
  return response.data;
};

export const updatePaymentVoucher = async ({ reference_number, paymentVoucherData }: AllPaymentVoucherInputs) => {
  const response = await apiClient.put(`/accounting/paymentvouchers/${reference_number}/`, paymentVoucherData);
  return response.data;
};

export const deletePaymentVoucher = async (reference_number: number) => {
  await apiClient.delete(`/accounting/paymentvouchers/${reference_number}/`);
  return true;
};

// --------------------------------------------------------------------------------------------------------



// RECEIPT VOUCHER -  AXIOS

export const fetchReceiptVouchers = async () => {
  const response = await apiClient.get('/accounting/receiptvoucher/');
  return response.data;
};

export const fetchReceiptVoucherById = async (reference_number: number) => {
  const response = await apiClient.get(`/accounting/receiptvoucher/${reference_number}/`);
  return response.data;
};

export const createReceiptVoucher = async (receiptVoucherData: ReceiptVoucherInputs) => {
  const response = await apiClient.post('accounting/receiptvoucher/', receiptVoucherData);
  return response.data;
};

export const updateReceiptVoucher = async ({ reference_number, receiptVoucherData }: AllReceiptVoucherInputs) => {
  const response = await apiClient.put(`accounting/receiptvoucher/${reference_number}/`, receiptVoucherData);
  return response.data;
};

export const deleteReceiptVoucher = async (reference_number: number) => {
  await apiClient.delete(`accounting/receiptvoucher/${reference_number}/`);
  return true;
};


// --------------------------------------------------------------------------------------------------------



// BANK STATEMENTS -  AXIOS

export const fetchBankStatements = async () => {
  const response = await apiClient.get('/accounting/bankstatements/');
  return response.data;
};

export const fetchBankStatementById = async (statement_id: number) => {
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

export const deleteBankStatement = async (statement_id: number) => {
  await apiClient.delete(`/accounting/bankstatements/${statement_id}/`);
  return true;
};
