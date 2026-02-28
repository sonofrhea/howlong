import React, { useState } from "react";
import { ACCOUNTING_ICONS } from "./ModuleIcons";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";
import { ProjectProfileResponse } from "../../Projects/constants/Types";
import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { CASH_BOOK_OPTIONS, INCOME_EXPENSES_OPTIONS } from "./options";

import { SortConfig } from "../../Suppliers/constants/Types";






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

export type JournalEntryDetails = {
  journal_number: number;
  date: string;
  description: string;

  journal_entries: Array<{
    account: {
      account_code: number;
      account_name: string;
      account_type: string
    };
    description: string;
    net_debit: string;
    net_credit: string;
    cancelled: boolean
  }>;

  aggregate_debit: string;
  aggregate_credit: string;
  cancelled: boolean;
  created_by: string
  date_created: string;
  date_updated: string;
  updated_by: string;
};


export type JournalHeaderInputs = {
    journal_number: number;
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

export type JournalHeaderProps = {
    journalEntry: JournalHeaderInputs;
    onSubmit: (data: JournalHeaderInputs) => void;
    isSubmitting: boolean;
    onCancel: (journalEntryId: number) => void;
    accounts: ControlAccountInterface[];
};

export type JournalEntryFormProps = {
    onSubmit: (data: JournalHeaderInputs) => void;
    isSubmitting: boolean;
    onCancel?: () => void;
    accounts: ControlAccountInterface[];
};

export type JournalEntryDetailsProps = {
    journalEntry: JournalEntryDetails;
    isLoading: boolean;
    onBack?: () => void;
    onEdit: (journalEntryId: number) => void;
};


export type JournalEntryListProps = {
    journalEntries: JournalEntryList[];
    onJournalEntryClick: (journalEntryId: number) => void;
    onEditJournalEntry: (journalEntryId: number, journalEntry: JournalEntryList) => void;
    onDeleteJournalEntry: (journalEntryId: number) => void;
    sortConfig: SortConfig;
    onSort: (key: string) => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: string) => void;
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
    cancelled: boolean;
    net_debit: number;
    net_credit: number;
    running_balance: number;
};

export type IncomeAndExpensesInputs = {
    reference_number: number;
    date: string;
    account: {
        account_code: number;
        account_name: string;
        account_type: string;
    };
    category: typeof INCOME_EXPENSES_OPTIONS[number] | null;
    description: string;
    currency: string;
    gross_debit: number;
    gross_credit: number;
    tax: number;
    cancelled: boolean;
};

export type IncomeAndExpensesDetails = {
    reference_number: number;
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
    tax_rate: number;
    cancelled: boolean;
    net_debit: number;
    net_credit: number;
    running_balance: number;
    created_by: string;
    date_created: string;
    date_updated: string;
    updated_by: string;
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

export type IncomeAndExpensesProps = {
    incomeAndExpense: IncomeAndExpensesInputs;
    onSubmit: (data: IncomeAndExpensesInputs) => void;
    isSubmitting: boolean;
    onCancel: (incomeAndExpenseId: number) => void;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type IncomeAndExpensesDetailsProps = {
    incomeAndExpense: IncomeAndExpensesDetails;
    isLoading: boolean;
    onBack?: () => void;
    onEdit: (incomeAndExpenseId: number) => void;
    accounts: ControlAccountInterface[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type IncomeAndExpensesListProps = {
    incomeAndExpenses: IncomeAndExpensesList[];
    onIncomeAndExpenseClick: (incomeAndExpenseId: number) => void;
    onEditIncomeAndExpense: (incomeAndExpenseId: number, journalEntry: IncomeAndExpensesList) => void;
    onDeleteIncomeAndExpense: (incomeAndExpenseId: number) => void;
    sortConfig: SortConfig;
    onSort: (key: string) => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: string) => void;
};

export type IncomeAndExpensesFormProps = {
    onSubmit: (data: IncomeAndExpensesInputs) => void;
    isSubmitting: boolean;
    onCancel?: () => void;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
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
    reference_number: number;
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

export type PaymentVoucherDetails = {
    reference_number: number;
    date: string;
    payment_to: string;
    payment_to_name: string;
    account_paid_by?: {
        account_code?: number | null;
        account_name?: string | null;
        account_type?: string | null;
    } | null;
    description: string;
    project: string;
    project_name: string;
    payment_voucher_lines: Array<{
        description: string;
        gst_number: string;
        amount: number;
        tax_inclusive: boolean;
        tax: number;
        tax_rate: number;
        cancelled: boolean;
        net_total: number;
}>
    gross_total: number;
    tax_inclusive: boolean;
    tax: number;
    tax_rate: number;
    cancelled: boolean;
    aggregate_total: number;
    currency: string;
    agent: string;
    created_by: string;
    date_created: string;
    date_updated: string;
    updated_by: string;
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

export type PaymentVoucherProps = {
    paymentVoucher: PaymentVoucherInputs;
    onSubmit: (data: PaymentVoucherInputs) => void;
    isSubmitting: boolean;
    onCancel: (paymentVoucherId: number) => void;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
    suppliers: SupplierProfileResponse[];
    agents: AgentInterface[];
    projects: ProjectProfileResponse[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type PaymentVoucherDetailsProps = {
    paymentVoucher: PaymentVoucherDetails;
    isLoading: boolean;
    onBack?: () => void;
    onEdit: (paymentVoucherId: number) => void;
    accounts: ControlAccountInterface[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type PaymentVoucherTableProps = {
    paymentVouchers: PaymentVoucherList[];
    onPaymentVoucherClick: (paymentVoucherId: number) => void;
    onEditPaymentVoucher: (paymentVoucherId: number, paymentVoucher: PaymentVoucherList) => void;
    onDeletePaymentVoucher: (paymentVoucherId: number) => void;
    sortConfig: SortConfig;
    onSort: (key: string) => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: string) => void;
};


export type PaymentVoucherFormProps = {
    onSubmit: (data: PaymentVoucherInputs) => void;
    isSubmitting: boolean;
    onCancel?: () => void;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
    suppliers: SupplierProfileResponse[];
    agents: AgentInterface[];
    projects: ProjectProfileResponse[];
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
    reference_number: number;
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

export type ReceiptVoucherDetails = {
    reference_number: number;
    date: string;
    received_from: string;
    received_from_name: string;
    account_received_in?: {
        account_code?: number;
        account_name?: string;
        account_type?: string;
    } | null;
    description: string;
    project: string;
    project_name: string;
    gross_total: number;
    tax_inclusive: boolean;
    tax: number;
    tax_rate: number;
    cancelled: boolean;
    receipt_voucher_lines: Array<{
        description: string;
        gst_number: string;
        amount: number;
        special_treatment: boolean;
        treatment_amount: number;
        treatment_rate: number;
        total_after_discount: number;
        tax_inclusive: boolean;
        tax: number;
        tax_rate: number;
        cancelled: boolean;
        net_total: number;
}>
    aggregate_total: number;
    currency: string;
    agent: string;
    created_by: string;
    date_created: string;
    date_updated: string;
    updated_by: string;
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

export type ReceiptVoucherProps = {
    receiptVoucher: ReceiptVoucherInputs;
    onSubmit: (data: ReceiptVoucherInputs) => void;
    isSubmitting: boolean;
    onCancel: (receiptVoucherId: number) => void;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
    customers: CustomerCreateResponse[];
    agents: AgentInterface[];
    projects: ProjectProfileResponse[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type ReceiptVoucherDetailsProps = {
    receiptVoucher: ReceiptVoucherDetails;
    isLoading: boolean;
    onBack?: () => void;
    onEdit: (receiptVoucherId: number) => void;
    accounts: ControlAccountInterface[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type ReceiptVoucherTableProps = {
    receiptVouchers: ReceiptVoucherList[];
    onReceiptVoucherClick: (receiptVoucherId: number) => void;
    onEditReceiptVoucher: (receiptVoucherId: number, receiptVoucher: ReceiptVoucherList) => void;
    onDeleteReceiptVoucher: (receiptVoucherId: number) => void;
    sortConfig: SortConfig;
    onSort: (key: string) => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: string) => void;
};

export type ReceiptVoucherFormProps = {
    onSubmit: (data: ReceiptVoucherInputs) => void;
    isSubmitting: boolean;
    onCancel?: () => void;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
    customers: CustomerCreateResponse[];
    agents: AgentInterface[];
    projects: ProjectProfileResponse[];
};

// -------- END ----------- RECEIPT VOUCHER ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------CASH BOOK----------------

export type CashBookList = {
    reference_number: number;
    date: string;
    payment_to_or_from: string;
    description: string;
    transaction_type: string;
    currency: string;
    net_debit: number;
    net_credit: number;
    running_balance: number;
};

export type CashBookInputs = {
    reference_number: number;
    date: string;
    payment_to_or_from: string;
    description: string;
    account?: {
        account_code?: number;
        account_name?: string;
        account_type?: string;
    } | null;
    transaction_type: typeof CASH_BOOK_OPTIONS[number] | null;
    currency: string;
    net_debit: number;
    net_credit: number;
    remark: string;
};

export type CashBookDetails = {
    reference_number: number;
    date: string;
    payment_to_or_from: string;
    description: string;
    account?: {
        account_code?: number;
        account_name?: string;
        account_type?: string;
    };
    transaction_type: string;
    currency: string;
    net_debit: number;
    net_credit: number;
    running_balance: number;
    remark: string;
    recorded_by: string;
    date_recorded: string;
    date_created: string;
    date_updated: string;
    updated_by: string;
};


export type CashBookResponse = {
    reference_number: number;
    running_balance: number;
};

export type AllCashBookInputs = {
    reference_number: number;
    cashBookData: CashBookInputs;
};

export type EditCashBook = {
    cashBookId: number;
    cashBookData: CashBookInputs;
};

export type CashBookProps = {
    cashBook: CashBookInputs;
    onSubmit: (data: CashBookInputs) => void;
    isSubmitting: boolean;
    onCancel: (cashBookId: number) => void;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
    agents: AgentInterface[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type CashBookDetailsProps = {
    cashBook: CashBookDetails;
    isLoading: boolean;
    onBack?: () => void;
    onEdit: (cashBookId: number) => void;
    accounts: ControlAccountInterface[];
    onCreateJournalEntry: (data: JournalHeaderInputs) => void;
    isCreatingJournalEntry: boolean;
};

export type CashBookTableProps = {
    cashBooks: CashBookList[];
    onCashBookClick: (cashBookId: number) => void;
    onEditCashBook: (cashBookId: number, cashBook: CashBookList) => void;
    onDeleteCashBook: (cashBookId: number) => void;
    sortConfig: SortConfig;
    onSort: (key: string) => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: string) => void;
};


export type CashBookFormProps = {
    onSubmit: (data: CashBookInputs) => void;
    isSubmitting: boolean;
    currencies: CurrencyInterface[];
    accounts: ControlAccountInterface[];
    agents: AgentInterface[];
    onCancel?: () => void;
};