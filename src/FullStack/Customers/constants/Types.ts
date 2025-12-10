import React, { useState } from "react";

import { CUSTOMERS_ICONS } from "./ModuleIcons";



import { ID_TYPE_CHOICES,
  TAX_ID_CHOICES,
  BANK_TYPE_CHOICES,
  STATUS_CHOICES
 } from "./Options";




export interface CustomersModuleInterface {
    id: keyof typeof CUSTOMERS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};






























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
  control_account: {
    account_code: number;
    account_name: string | null;
    account_type: string | null;
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
  customer_name: string | null;
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
  agent: string;
}


export type DebitNoteInputs = {
  date: string;
  customer: string;
  customer_name: string;
  related_payment: string;
  related_payment_amount: string;
  account: {
    account_code: number | null;
    account_name: string | null;
    account_type: string | null;
  };
  paid_amount: number;
  debit_note_details: Array <{
    date: string;
    description: string;
    amount: number;
    tax_inclusive: boolean;
    tax_amount: number;
  }>
  agent: string;
  currency: string;
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
  account: {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  paid_amount: string;
  debit_note_details: Array<{
    date: string;
    description: string;
    amount: string;
    tax_inclusive: boolean;
    tax_amount: string;
    current_total: string;
  }>;
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


