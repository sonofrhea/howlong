import apiClient from '../../BaseEngine';


import { AllCashBookInputs, AllIncomeAndExpenses, AllJournalHeaderInputs, 
  AllPaymentVoucherInputs, 
  AllReceiptVoucherInputs, 
  CashBookInputs, 
  IncomeAndExpensesInputs, 
  JournalHeaderInputs, 
  PaymentVoucherInputs,
  ReceiptVoucherInputs} from './Constants/Types';






// --------------------------------------------------------------------------------------------------------


// INCOME AND EXPENSES -  AXIOS

export const fetchIncomeAndExpenses = async () => {
  try {
    const response = await apiClient.get('/accounting/incomeandexpenses/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchIncomeAndExpenseById = async (reference_number: number) => {
  try {
    const response = await apiClient.get(`/accounting/incomeandexpenses/${reference_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createIncomeAndExpense = async (incomeAndExpensesData: IncomeAndExpensesInputs) => {
  try {
    const response = await apiClient.post('/accounting/incomeandexpenses/', incomeAndExpensesData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateIncomeAndExpense = async ({ reference_number, incomeAndExpensesData }: AllIncomeAndExpenses) => {
  try {
    const response = await apiClient.put(`/accounting/incomeandexpenses/${reference_number}/`, incomeAndExpensesData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteIncomeAndExpense = async (reference_number: number) => {
  try {
    const response = await apiClient.delete(`/accounting/incomeandexpenses/${reference_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// --------------------------------------------------------------------------------------------------------


// JOURNAL -  AXIOS

export const fetchJournalEntries = async () => {
  try {
    const response = await apiClient.get('/accounting/journalheaders/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchJournalEntryById = async (journal_number: number) => {
  try {
    const response = await apiClient.get(`/accounting/journalheaders/${journal_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createJournalEntry = async (journalEntryData: JournalHeaderInputs) => {
  try {
    const response = await apiClient.post('/accounting/journalheaders/', journalEntryData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateJournalEntry = async ({ journal_number, journalEntryData }: AllJournalHeaderInputs) => {
  try {
    const response = await apiClient.put(`/accounting/journalheaders/${journal_number}/`, journalEntryData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteJournalEntry = async (journal_number: number) => {
  try {
    const response = await apiClient.delete(`/accounting/journalheaders/${journal_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// --------------------------------------------------------------------------------------------------------



// CASH BOOK -  AXIOS

export const fetchCashBooks = async () => {
  try {
    const response = await apiClient.get('/accounting/cashbookentries/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCashBookById = async (reference_number: number) => {
  try {
    const response = await apiClient.get(`/accounting/cashbookentries/${reference_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCashBook = async (cashBookData: CashBookInputs) => {
  try {
    const response = await apiClient.post('/accounting/cashbookentries/', cashBookData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCashBook = async ({ reference_number, cashBookData }: AllCashBookInputs) => {
  try {
    const response = await apiClient.put(`/accounting/cashbookentries/${reference_number}/`, cashBookData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCashBook = async (reference_number: number) => {
  try {
    const response = await apiClient.delete(`/accounting/cashbookentries/${reference_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

// --------------------------------------------------------------------------------------------------------



// PAYMENT VOUCHER -  AXIOS

export const fetchPaymentVouchers = async () => {
  try {
    const response = await apiClient.get('/accounting/paymentvouchers/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPaymentVoucherById = async (reference_number: number) => {
  try {
    const response = await apiClient.get(`/accounting/paymentvouchers/${reference_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPaymentVoucher = async (paymentVoucherData: PaymentVoucherInputs) => {
  try {
    const response = await apiClient.post('/accounting/paymentvouchers/', paymentVoucherData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePaymentVoucher = async ({ reference_number, paymentVoucherData }: AllPaymentVoucherInputs) => {
  try {
    const response = await apiClient.put(`/accounting/paymentvouchers/${reference_number}/`, paymentVoucherData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePaymentVoucher = async (reference_number: number) => {
  try {
    const response = await apiClient.delete(`/accounting/paymentvouchers/${reference_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

// --------------------------------------------------------------------------------------------------------



// RECEIPT VOUCHER -  AXIOS

export const fetchReceiptVouchers = async () => {
  try {
    const response = await apiClient.get('/accounting/receiptvoucher/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchReceiptVoucherById = async (reference_number: number) => {
  try {
    const response = await apiClient.get(`/accounting/receiptvoucher/${reference_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createReceiptVoucher = async (receiptVoucherData: ReceiptVoucherInputs) => {
  try {
    const response = await apiClient.post('accounting/receiptvoucher/', receiptVoucherData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateReceiptVoucher = async ({ reference_number, receiptVoucherData }: AllReceiptVoucherInputs) => {
  try {
    const response = await apiClient.put(`accounting/receiptvoucher/${reference_number}/`, receiptVoucherData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteReceiptVoucher = async (reference_number: number) => {
  try {
    const response = await apiClient.delete(`accounting/receiptvoucher/${reference_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
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
  const response = await apiClient.delete(`/accounting/bankstatements/${statement_id}/`);
  return response.status;
};
