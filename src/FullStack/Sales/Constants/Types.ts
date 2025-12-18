import React, { useState } from "react";
import { SALES_ICONS } from "./ModuleIcons";

import { PAYMENT_TYPE_OPTIONS } from "./Options";



export interface SalesModulesInterface {
    id: keyof typeof SALES_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};











// -------- BEGIN ----------- QUOTATIONS INPUT ----------------

export type QuotationList = {
  quotation_number: number;
  quotation_date: string;
  valid_until: string;
  customer: string;
  project_description: string;
  cancelled: boolean;
  net_total: number;
  agent: string;
}

export type QuotationInputs = {
  quotation_date: number; 
  valid_until: number;
  customer: string;
  customer_details: string;
  agent: string;
  project_description: string;
  cancelled: boolean;
  related_quotation?: Array<{
    item?: string | null;
    description?: string | null;
    quantity?: number | null;
    unit_of_measure?: string | null;
    price_per_unit?: number | null;
    currency?: string | null;
    cancelled?: boolean | null;
    tax_inclusive?: boolean | null;
    tax_amount?: number | null;
  }> | null;
  tax_inclusive: boolean;
  tax_amount: number;
  discount: number;
};

export type QuotationCreateResponse = {
  quotation_number: number;
};

export type AllQuotationInputs = {
    quotation_number: number;
    quotationData: QuotationInputs;
};

export type EditQuotationInputs = {
  quotationId: number;
  quotationData: QuotationInputs;
};

// -------- END ----------- QUOTATIONS INPUT ----------------









// -------- BEGIN ----------- INVOICE INPUT ----------------

export type InvoiceList = {
  invoice_number: number;
  invoice_date: string;
  invoice_due_date: string;
  customer: string;
  description: string,
  net_total: number;
  currency: string;
  cancelled: boolean;
  agent: string;
}

export type InvoiceInputs = {
  invoice_date: string;
  invoice_due_date: string;
  customer: string;
  customer_name: string;
  customer_details: string;
  description: string;
  currency: string;
  agent: string;
  tax_inclusive: boolean;
  tax_amount: number;
  project: string;
  project_name: string;
  discount: boolean;
  discount_amount: number;
  related_invoice?: Array<{
    item?: string | null;
    description?: string | null;
    quantity?: number | null;
    unit_of_measure?: string | null;
    price_per_unit?: number | null;
    tax_inclusive?: boolean | null;
    tax_amount?: number | null;
    cancelled?: boolean | null;
  }> | null;
  cancelled: boolean;
  created_by: string;
};

export type InvoiceCreateResponse = {
  invoice_number: number;
};

export type AllInvoiceInputs = {
    invoice_number: number;
    invoiceData: InvoiceInputs;
};

export type EditInvoiceInputs = {
  invoiceId: number;
  invoiceData: InvoiceInputs;
};

export type InvoiceInterface = {
  invoice_number: number;
  net_total: number;
};

// -------- END ----------- INVOICE INPUT ----------------










// -------- BEGIN ----------- CUSTOMER PAYMENT INPUT ----------------

export type CustomerPaymentList = {
  payment_number: number;
  date: number;
  customer: string;
  currency: string;
  description: string;
  project: string;
  paid_amount: number;
  outstanding: number;
  completed: boolean;
  agent: string;
  cancelled: boolean;
};


export type CustomerPaymentInputs = {
  date: number;
  customer: string;
  customer_name: string;
  project: string;
  project_name: string;
  related_payment: string;
  related_payment_paid_amount: string;
  related_payment_outstanding: string;
  account_received_in?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  currency: string;
  description: string;
  paid_amount: number;
  additional_bank_charges: number;
  outstanding: number;
  completed: boolean;
  agent: string;
  cancelled: boolean;
};

export type CustomerPaymentResponse = {
  payment_number: number;
  paid_amount: number;
};

export type AllCustomerPaymentInputs = {
  payment_number: number;
  customerPaymentData: CustomerPaymentInputs;
};

export type EditCustomerPaymentInputs = {
  customerPaymentId: number;
  customerPaymentData: CustomerPaymentInputs;
}

// -------- END ----------- CUSTOMER PAYMENT INPUT ----------------






//----------------BEGIN-----INVOICE PAYMENT INPUT-------------------

export type InvoicePaymentList = {
  date_created: string;
  invoice_payment_code: number;
  related_invoice: string;
  related_invoice_total: number;
  gross_paid: number;
  tax_amount: number;
  net_aggregate_paid: number;
  outstanding_amount: number;
  paid_by: string;
  cancelled: boolean;
  agent: string;
};

export type InvoicePaymentInputs = {
  date_created: string;
  related_invoice: number;
  related_invoice_details: string;
  account_received_in?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  currency: string;
  related_invoice_total: number;
  tax_inclusive: boolean;
  tax_amount: number;
  cancelled: boolean;
  related_invoice_payment?: Array<{
    payment_date?: string | null;
    payment_type?: keyof typeof PAYMENT_TYPE_OPTIONS | null;
    //payment_amount: number;
    tax_inclusive?: boolean | null;
    tax_amount?: number | null;
    total?: number | null;
    cancelled?: boolean | null;
  }> | null;
  gross_paid: number;
  net_aggregate_paid: number;
  outstanding_amount: number;
  paid_by: string;
  paid_by_name: string;
  agent: string;
};


export type InvoicePaymentResponse = {
  invoice_payment_code: number;
};

export type AllInvoicePaymentInputs = {
  invoice_payment_code: number;
  invoicePaymentData: InvoicePaymentInputs;
};

export type EditInvoicePaymentInputs = {
  invoicePaymentId: number;
  invoicePaymentData: InvoicePaymentInputs;
};

export type InvoicePaymentInterface = {
  invoice_payment_code: number;
  net_aggregate_paid: number;
  outstanding_amount: number;
};