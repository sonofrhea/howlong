import React, { useState } from "react";

import { CUSTOMERS_ICONS } from "./ModuleIcons";



import { ID_TYPE_CHOICES,
  TAX_ID_CHOICES,
  BANK_TYPE_CHOICES,
  STATUS_CHOICES,
  REFUND_TYPE_OPTIONS
 } from "./Options";




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
}





export type CustomerInputs = {
  customer_name: string | null;
  company_name: string | null;
  control_account?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
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
  id_file: File | null;
  preferred_currency: {
    currency_code: string | null;
    currency_name: string | null;
    currency_symbol: string | null;
    country: string | null;
    buy: number | null;
    sell: number | null;
  };
  gst_number: string | null;
  tax_id_type: typeof TAX_ID_CHOICES[number]['value'] | null;
  tax_number: string | null;
  tourism_number: string | null;
  expiration_date: string | null;
  service_tax_number: string | null;
  taxpayers_qr_code: File | null;
  customer_bank_name: string | null;
  customer_bank_account_number: number | null;
  bank_account_type: typeof BANK_TYPE_CHOICES[number]['value'] | null;
  swift_code: string | null;
  is_active: boolean;
  status: typeof STATUS_CHOICES[number]['value'] | null;
  remark: string | null;
  date_created: string;
  created_by: string;
};

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
  customer_name: string;
  account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  paid_amount: string;
  debit_note_details?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    tax_inclusive?: boolean | null;
    tax_amount?: number;
    current_total?: number | null;
    cancelled?: boolean | null;
  }> | null;
  tax_amount: number;
  aggregate_total: string;
  debit_note_outstanding: string;
  agent: string;
  created_by: number;
  currency: string;
  date_created: string;
  updated_by: number;
  date_updated: string;
  version: number;
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
    payment_type?: keyof typeof REFUND_TYPE_OPTIONS | null;
    cancelled?: boolean | null;
  }> | null;
  tax_inclusive: boolean;
  tax_amount: number;
  agent: string;
  currency: string | null;
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

// -------- END ----------- CUSTOMER REFUND INPUT ----------------