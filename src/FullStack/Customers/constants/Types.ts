import React, { useState } from "react";

import { CUSTOMERS_ICONS } from "./ModuleIcons";



import { ID_TYPE_CHOICES,
  TAX_ID_CHOICES,
  BANK_TYPE_CHOICES,
  STATUS_CHOICES,
  REFUND_TYPE_OPTIONS
 } from "./Options";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, BankInterface, CurrencyInterface } from "../../Core/constants/Types";
import { CustomerPaymentResponse } from "../../Sales/Constants/Types";
import { JournalHeaderInputs } from "../../Accounting/Constants/Types";
import { SortConfig } from "../../Suppliers/constants/Types";




export interface CustomersModuleInterface {
    id: keyof typeof CUSTOMERS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};


export interface creditNoteInterface {
  credit_note_number: number;
  credit_note_outstanding: number | null;
}




























// -------- BEGIN ----------- CUSTOMERS INPUT ----------------

export type CustomersList = {
    customer_number: number;
    customer_name: string | null;
    mobile_number: number | null;
    city: string | null;
    state: string | null;
    preferred_currency: string | null;
    status: string;
    date_created: string;
    remark: string | null;
};



export type CustomerDetails = {
  customer_number: number;
  customer_name: string;
  company_name: string;
  address: string;
  country: string;
  post_code: string;
  city: string;
  state: string;
  mobile_number: string;
  home_number: string;
  fax: string;
  email: string;
  id_type: string;
  id_number: string;

  preferred_currency: {
    currency_code: string;
    currency_name: string;
    currency_symbol: string;
    country: string;
    buy: string;
    sell: string
  };

  customer_bank_name: string;
  customer_bank_account_number: string;
  bank_account_type: string;
  swift_code: string;

  is_active: boolean;

  gst_number: string;
  tax_id_type: string;
  tax_number: string;
  tourism_number: string;
  expiration_date: string;
  service_tax_number: string;

  status: string;
  remark: string;

  created_by: string;
  date_created: string;
  date_updated: string;
  updated_by: string;

  company: string
};






export type CustomerInputs = {
  customer_number: number;
  customer_name: string | null;
  company_name: string | null;
  address: string | null;
  country: string | null;
  post_code: string | null;
  city: string | null;
  state: string | null;
  mobile_number: string | null;
  home_number: string | null;
  fax: string;
  email: string;
  id_type: typeof ID_TYPE_CHOICES[number]['value'] | null;
  id_number: string;
  preferred_currency?: {
    currency_code?: string | null;
    currency_name?: string | null;
    currency_symbol?: string | null;
    country?: string | null;
    buy?: number | null;
    sell?: number | null;
  } | null;
  gst_number: string | null;
  tax_id_type: typeof TAX_ID_CHOICES[number]['value'] | null;
  tax_number: string | null;
  tourism_number: string | null;
  expiration_date: string | null;
  service_tax_number: string | null;
  taxpayers_qr_code?: File | null;
  customer_bank_name: string | null;
  customer_bank_account_number: number | null;
  bank_account_type: typeof BANK_TYPE_CHOICES[number]['value'] | null;
  swift_code: string | null;
  is_active: boolean;
  status: typeof STATUS_CHOICES[number]['value'] | null;
  remark: string | null;
  created_by: string;
  date_created: string;
  date_updated: string;
  updated_by: string;
};


export type CustomerEdit = {
  customer_number: number;
  customer_name: string;
  company_name: string;
  address: string;
  country: string;
  post_code: string;
  city: string;
  state: string;
  mobile_number: string;
  home_number: string;
  fax: string;
  email: string;
  id_type: typeof ID_TYPE_CHOICES[number]['value'] | null;
  id_number: string;
  preferred_currency?: {
    currency_code?: string | null;
    currency_name?: string | null;
    currency_symbol?: string | null;
    country?: string | null;
    buy?: number | null;
    sell?: number | null;
  } | null;
  customer_bank_name: string;
  customer_bank_account_number: string;
  bank_account_type: typeof BANK_TYPE_CHOICES[number]['value'] | null;
  swift_code: string;
  is_active: boolean;
  gst_number: string;
  tax_id_type: typeof TAX_ID_CHOICES[number]['value'] | null;
  tax_number: string;
  tourism_number: string;
  expiration_date: string;
  service_tax_number: string;
  status: typeof STATUS_CHOICES[number]['value'] | null;
  remark: string;
}

export type CustomerCreateResponse = {
  customer_number: number;
  customer_name: string;
};

export type AllCustomerInputs = {
    customer_number: number;
    customerData: CustomerInputs;
};

export type EditCustomerInputs = {
    customerId: number;
    customerData: CustomerInputs;
};

export type CustomerProps = {
  customer: CustomerInputs;
  onSubmit: (data: CustomerInputs) => void;
  isSubmitting: boolean;
  onCancel: (customerId: number) => void;
  currencies: CurrencyInterface[];
  banks: BankInterface[];
};


export type CustomerDetailsProps = {
  customer: CustomerDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (customerId: number) => void;
};


export type CustomerFormProps = {
  onSubmit: (data: CustomerInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  currencies: CurrencyInterface[];
  banks: BankInterface[];
};


export type CustomerTableProps = {
  customers: CustomersList[];
  onCustomerClick: (customerId: number) => void;
  onEditCustomer: (customerId: number, customer: CustomersList) => void;
  onDeleteCustomer: (customerId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
}

// -------- END ----------- CUSTOMER FORM INPUT ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------CUSTOMER DEBIT NOTE FORM----------------



export type DebitNoteTableInput = {
  debit_note_number: number;
  date: string;
  customer: string;
  aggregate_total: number;
  debit_note_outstanding: number;
  cancelled: boolean;
  agent: string;
}


export type DebitNoteInputs = {
  debit_note_number: number;
  date: string;
  customer: string;
  customer_name: string;
  related_payment: string;
  related_payment_amount: string;
  account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  paid_amount: number;
  debit_note_details?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    tax_inclusive?: boolean | null;
    tax_amount?: number;
    cancelled?: boolean | null;
  }> | null;
  tax_inclusive: boolean;
  tax_amount: number | 0.00;
  agent: string;
  currency: string | null;
  cancelled: boolean;
}

export type DebitNoteCreateResponse = {
  debit_note_number: number;
}

export type AllDebitNoteInputs = {
    debit_note_number: number;
    debitNoteData: DebitNoteInputs;
};

export type EditDebitNoteInputs = {
    debitNoteId: number;
    debitNoteData: DebitNoteInputs;
};


export type DebitNoteDetails = {
  debit_note_number: number;
  date: string;
  customer: string;
  customer_name: string;
  account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  related_payment: number;
  related_payment_amount: number;
  paid_amount: number;
  gross_total: number;
  tax_inclusive: boolean;
  tax_amount: number;
  debit_note_details?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    tax_inclusive: boolean;
    tax_amount?: number | null;
    current_total?: number | null;
    cancelled: boolean;
  }>
  aggregate_total: number;
  debit_note_outstanding: number;
  cancelled: boolean;
  agent: string;
  created_by: string;
  currency: string;
};


export type DebitNoteEditProps = {
  debitNote: DebitNoteInputs;
  onSubmit: (data: DebitNoteInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel: (debitNoteId: number) => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  customerPayments: CustomerPaymentResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type DebitNoteDetailsProps = {
  debitNote: DebitNoteDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (debitNoteId: number) => void;
  onCancel?: () => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type DebitNoteFormProps = {
  onSubmit: (data: DebitNoteInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel: () => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  customerPayments: CustomerPaymentResponse[];
};


export type DebitNoteTableProps = {
    debitNotes: DebitNoteTableInput[];
    onDebitNoteClick: (debitNoteId: number) => void;
    onEditDebitNote: (debitNoteId: number, debitNote: DebitNoteTableInput) => void;
    onDeleteDebitNote: (debitNoteId: number) => void;
    sortConfig: SortConfig;
    onSort: (key: string) => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: string) => void;
  };


// -------- END ----------- CUSTOMER DEBIT NOTE INPUT ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------CUSTOMER CREDIT NOTE INPUTS----------------

export type CreditNoteList = {
  credit_note_number: number;
  date: string;
  customer: string;
  aggregate_total: number;
  currency: string;
  cancelled: boolean;
  agent: string;
};

export type CreditNoteDetails = {
  credit_note_number: number;
  date: string;
  customer: number;
  customer_name: string;
  credit_note_lines?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    tax_inclusive: boolean;
    tax_amount: number;
    current_total: number;
    cancelled: boolean;
  }> | null;
  related_payment: string;
  related_payment_amount: string;
  account?: {
      account_code?: number | null;
      account_name?: string | null;
      account_type?: string | null;
  } | null;
  gross_total: number;
  tax_inclusive: boolean;
  tax_amount: number;
  paid_amount: number;
  aggregate_total: number;
  credit_note_outstanding: number;
  cancelled: boolean;
  agent: string;
  created_by: string;
  currency: string;
};

export type CreditNoteEditInputs = {
  credit_note_number: number;
  date: string;
  customer: string;
  customer_name: string;
  credit_note_lines?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    tax_inclusive?: boolean | null;
    tax_amount?: number | null;
    cancelled?: boolean | null;
  }> | null;
  tax_inclusive: boolean;
  tax_amount: number;
  related_payment: string;
  related_payment_amount: number;
  account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  paid_amount: number;
  agent: string;
  currency: string | null;
};

export type CreditNoteInputs = {
  date: string;
  customer: string;
  customer_name: string;
  credit_note_lines?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    tax_inclusive?: boolean | null;
    tax_amount?: number | null;
    cancelled?: boolean | null;
  }> | null;
  tax_inclusive: boolean;
  tax_amount: number;
  related_payment: string;
  related_payment_amount: number;
  account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  paid_amount: number;
  agent: string;
  currency: string | null;
};


export type CreditNoteCreateResponse = {
  credit_note_number: number;
  credit_note_outstanding: number;
  aggregate_total: number;
}

export type AllCreditNoteInputs = {
    credit_note_number: number;
    creditNoteData: CreditNoteInputs;
};

export type EditCreditNoteInputs = {
    creditNoteId: number;
    creditNoteData: CreditNoteInputs;
};

export type CreditNoteProps = {
  onSubmit: (data: CreditNoteInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  customerPayments: CustomerPaymentResponse[];
};

export type CreditNoteEditProps = {
  creditNote: CreditNoteEditInputs;
  onSubmit: (data: CreditNoteInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel: (creditNoteId: number) => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  customerPayments: CustomerPaymentResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type CreditNoteDetailsProps = {
  creditNote: CreditNoteDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (creditNoteId: number) => void;
  onCancel?: () => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type CreditNoteTableProps = {
  creditNotes: CreditNoteList[];
  onCreditNoteClick: (creditNoteId: number) => void;
  onEditCreditNote: (creditNoteId: number, creditNote: CreditNoteList) => void;
  onDeleteCreditNote: (creditNoteId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};


// -------- END ----------- CUSTOMER CREDIT NOTE INPUT ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------CUSTOMER REFUND INPUTS----------------


export type CustomerRefundList = {
  refund_number: number;
  date: string;
  pay_to: string;
  expected_refund: number;
  net_refunded: number;
  outstanding: number;
  cancelled: boolean;
  currency: string;
  agent: string;
};


export type CustomerRefundInputs = {
  refund_number: number;
  date: string;
  pay_to: string | null;
  pay_to_name: string | null;
  related_credit_note: string;
  related_credit_note_outstanding: number | null;
  payment_account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  expected_refund: number | null;
  related_customer_refund?: Array<{
    date?: string | null;
    refund_amount?: number | null;
    additional_charges?: number | null;
    payment_type?: typeof REFUND_TYPE_OPTIONS[number]['value'] | null;
    cancelled?: boolean | null;
  }> | null;
  tax_inclusive: boolean;
  tax_amount: number;
  agent: string;
  currency: string | null;
};


export type CustomerRefundDetails = {
  refund_number: number;
  date: string;
  pay_to: string;
  pay_to_name: string;
  related_credit_note: string;
  related_credit_note_outstanding: number;
  payment_account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  expected_refund: number;
  gross_total: number;
  tax_inclusive: boolean;
  tax_amount: number;
  related_customer_refund?: Array<{
    date: string | null;
    refund_amount: number | null;
    additional_charges: number | null;
    total_amount: number | null;
    cancelled: boolean;
    payment_type?: typeof REFUND_TYPE_OPTIONS[number]['value'] | null;
  }> | null;
  net_refunded: number;
  outstanding: number;
  cancelled: boolean;
  agent: string;
  currency: string;
  created_by: string;
};


export type CustomerRefundResponse = {
  refund_number: number;
}

export type AllCustomerRefundInputs = {
    refund_number: number;
    refundData: CustomerRefundInputs;
};

export type EditCustomerRefundInputs = {
    refundId: number;
    refundData: CustomerRefundInputs;
};

export type CustomerRefundProps = {
  refund: CustomerRefundInputs;
  onSubmit: (data: CustomerRefundInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel: (refundId: number) => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  creditNotes: CreditNoteCreateResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type CustomerRefundDetailsProps = {
  refund: CustomerRefundDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (refundId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type CustomerRefundFormProps = {
  onSubmit: (data: CustomerRefundInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  creditNotes: CreditNoteCreateResponse[];
};


export type CustomerRefundTableProps = {
  refunds: CustomerRefundList[];
  onRefundClick: (refundId: number) => void;
  onEditRefund: (refundId: number, refund: CustomerRefundList) => void;
  onDeleteRefund: (refundId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};

// -------- END ----------- CUSTOMER REFUND INPUT ----------------