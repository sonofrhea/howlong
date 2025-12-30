import React, { useState } from "react";
import { ACCOUNTING_ICONS } from "./ModuleIcons";








export interface AccountingModuleInterface {
    id: keyof typeof ACCOUNTING_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}











// -------- BEGIN ----------- JOURNAL INPUT ----------------

export type JournalEntryList = {
    journal_number: number;
    date: string;
    description: string;
    cancelled: string;
    aggregate_debit: number;
    aggregate_credit: number;
};

export type JournalHeaderInputs = {
    date: string;
    description: string;
    journal_entries: Array<{
        account: {
            account_code: number;
            account_name: string;
            account_type: string; 
        };
        description: string;
        net_debit: number;
        net_credit: number;
        cancelled: boolean; 
    }>;
    aggregate_debit: number;
    aggregate_credit: number;
    cancelled: boolean;
};


export type JournalHeaderResponse = {
    journal_number: number;
};

export type AllJournalHeaderInputs = {
    journal_number: number;
    journalEntryData: JournalHeaderInputs;
};


export type EditJournalHeaderInputs = {
    journalEntryId: number;
    journalEntryData: JournalHeaderInputs;
};



// -------- END ----------- JOURNAL INPUT ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------INCOME AND EXPENSES FORM----------------

export type IncomeAndExpensesList = {
    reference_number: number;
    date: string;
    category: string;
    description: string;
    currency: string;
    net_debit: number;
    net_credit: number;
    running_balance: number;
};

export type IncomeAndExpensesInputs = {
    date: string;
    account: {
        account_code: number;
        account_name: string;
        account_type: string;
    };
    category: string;
    description: string;
    currency: string;
    gross_debit: number;
    gross_credit: number;
    tax: number;
    cancelled: boolean;
};

export type IncomeAndExpensesResponse = {
    reference_number: number;
};

export type AllIncomeAndExpenses = {
    reference_number: number;
    incomeAndExpensesData: IncomeAndExpensesInputs;
};

export type EditIncomeAndExpenses = {
    incomeAndExpenseId: number;
    incomeAndExpensesData: IncomeAndExpensesInputs;
};


// -------- END ----------- INCOME AND EXPENSES ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------PAYMENT VOUCHER----------------

export type PaymentVoucherList = {
    reference_number: number;
    date: string;
    payment_to: string;
    description: string;
    currency: string;
    cancelled: boolean;
    aggregate_total: number;
    agent: string;
};

export type PaymentVoucherInputs = {
    date: string;
    payment_to: string;
    account_paid_by?: {
        account_code?: number | null;
        account_name?: string | null;
        account_type?: string | null;
    } | null;
    description: string;
    project: string;
    payment_voucher_lines: Array <{
        description: string;
        gst_number: string;
        amount: number;
        tax_inclusive: boolean;
        tax: number;
        cancelled: boolean;
    }>;
    tax_inclusive: boolean;
    tax: number;
    cancelled: boolean;
    currency: string;
    agent: string;
};

export type PaymentVoucherResponse = {
    reference_number: number;
    aggregate_total: number;
};

export type AllPaymentVoucherInputs = {
    reference_number: number;
    paymentVoucherData: PaymentVoucherInputs;
};

export type EditPaymentVoucher = {
    paymentVoucherId: number;
    paymentVoucherData: PaymentVoucherInputs;
};



// -------- END ----------- PAYMENT VOUCHER ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------RECEIPT VOUCHER----------------

export type ReceiptVoucherList = {
    reference_number: number;
    date: string;
    received_from: string;
    description: string;
    tax: number;
    currency: string;
    cancelled: boolean;
    aggregate_total: number;
};

export type ReceiptVoucherInputs = {
  date: string;
  received_from: string;
  account_received_in?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  } | null;
  description: string;
  project: string;
  receipt_voucher_lines: Array<{
      description: string;
      gst_number: string;
      amount: number;
      special_treatment: boolean;
      treatment_amount: number;
      tax_inclusive: boolean;
      tax: number;
      cancelled: boolean;
  }>
  currency: string;
  tax_inclusive: boolean;
  tax: number;
  cancelled: boolean;
  agent: string;
};


export type ReceiptVoucherResponse = {
    reference_number: number;
    aggregate_total: number;
};

export type AllReceiptVoucherInputs = {
    reference_number: number;
    receiptVoucherData: ReceiptVoucherInputs;
};

export type EditReceiptVoucher = {
    receiptVoucherId: number;
    receiptVoucherData: ReceiptVoucherInputs;
};