import React, { useState } from "react";
import { SALES_ICONS } from "./ModuleIcons";

import { PAYMENT_TYPE_OPTIONS } from "./Options";
import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { ProjectProfileResponse } from "../../Projects/constants/Types";
import { JournalHeaderInputs } from "../../Accounting/Constants/Types";



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
  quotation_number: number;
  quotation_date: string; 
  valid_until: string;
  customer: string;
  customer_details: string;
  agent: string;
  project_description: string;
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
  discount: boolean;
  discount_amount: number;
  cancelled: boolean;
};

export type QuotationDetails = {
  quotation_number: number;
  quotation_date: string;
  valid_until: string;
  customer_name: string;
  customer_details: string;
  agent: string;
  project_description: string;
  related_quotation?: Array<{
    item?: string | null;
    item_name?: string | null;
    description?: string | null;
    quantity?: number | null;
    unit_of_measure?: string | null;
    price_per_unit?: number | null;
    currency?: string | null;
    sub_total?: string | null;
    cancelled?: boolean;
    version?: number | null;
  }> | null;
  discount: boolean;
  discount_amount: number;
  tax_inclusive: boolean;
  tax_amount: number;
  cancelled: boolean;
  gross_total: number;
  net_total: number;
  created_by: string;
  date_created: string;
}

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

interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

export type QuotationListProps = {
  quotations: QuotationList[];
  onQuotationClick: (quotationId: number) => void;
  onEditQuotation: (quotationId: number, quotation: QuotationList) => void;
  onDeleteQuotation: (quotationId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};

export type QuotationEditProps = {
  quotation: QuotationInputs;
  onSubmit: (data: QuotationInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  onSendQuotation: () => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  agents: AgentInterface[];
  productItems: ProductItemCreateResponse[];
};

export type QuotationDetailsProps = {
  quotation: QuotationDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (quotationId: number) => void;
  onSendQuotation: () => void;
};

export type PrintQuotationProps = {
  quotation: QuotationDetails
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
  invoice_number: number;
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
  net_total: number;
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

export type InvoiceProps = {
  invoice: InvoiceInputs;
  onSubmit: (data: InvoiceInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  agents: AgentInterface[];
  projects: ProjectProfileResponse[];
  productItems: ProductItemCreateResponse[];
};


export type InvoiceTableProps = {
  invoices: InvoiceList[];
  onInvoiceClick: (invoiceId: number) => void;
  onEditInvoice: (invoiceId: number, invoice: InvoiceList) => void;
  onDeleteInvoice: (invoiceId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};
// -------- END ----------- INVOICE INPUT ----------------










// -------- BEGIN ----------- CUSTOMER PAYMENT INPUT ----------------

export type CustomerPaymentList = {
  payment_number: number;
  date: string;
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
  payment_number: number;
  date: string;
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

export type CustomerPaymentDetails = {
  payment_number: number;
  date: string;
  customer_name: number;
  project_name: number;
  account_received_in?: {
    account_code: number | null;
    account_name: number | null;
    account_type: number | null;
  } | null;
  currency: string;
  description: string;
  paid_amount: number;
  related_payment_paid_amount: number;
  outstanding: number;
  related_payment_outstanding: number;
  completed: boolean;
  cancelled: boolean;
  agent: string;
  created_by: string;
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
};


export type CustomerPaymentProps = {
  customerPayment: CustomerPaymentInputs;
  onSubmit: (data: CustomerPaymentInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  customers: CustomerCreateResponse[];
  invoicePayments: InvoicePaymentInterface[];
  projects: ProjectProfileResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type CustomerPaymentDetailsProps = {
  customerPayment: CustomerPaymentDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (customerPaymentId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
}


export type CustomerPaymentTableProps = {
  customerPayments: CustomerPaymentList[];
  onCustomerPaymentClick: (customerPaymentId: number) => void;
  onEditCustomerPayment: (customerPaymentId: number, customerPayment: CustomerPaymentList) => void;
  onDeleteCustomerPayment: (customerPaymentId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
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
  invoice_payment_code: number;
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
    payment_type?: typeof PAYMENT_TYPE_OPTIONS[number]['value'] | null;
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


export type InvoicePaymentDetails = {
  invoice_payment_code: number;
  related_invoice: string;
  related_invoice_details: string;
  account_received_in?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  gross_paid: number | null;
  currency: string;
  related_invoice_total: number | null;
  tax_inclusive: boolean;
  tax_amount: number | null;
  cancelled: boolean;
  net_aggregate_paid: number | null;
  related_invoice_payment: Array<{
    payment_date?: string;
    total?: number | null;
    tax_inclusive?: boolean;
    tax_amount?: number | null;
    payment_amount?: number | null;
    cancelled?: boolean;
    payment_type?: typeof PAYMENT_TYPE_OPTIONS[number]['value'] | null;
}> | null;
  outstanding_amount: number | null;
  payment_receipt: File;
  paid_by: string;
  paid_by_name: string;
  agent: string;
  created_by: string;
  date_created: string;
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

export type InvoicePaymentProps = {
  invoicePayment: InvoicePaymentInputs;
  onSubmit: (data: InvoicePaymentInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  invoices: InvoiceCreateResponse[];
  customers: CustomerCreateResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type InvoicePaymentDetailsProps = {
  invoicePayment: InvoicePaymentDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (invoicePaymentId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type InvoicePaymentTableProps = {
  invoicePayments: InvoicePaymentList[];
  onInvoicePaymentClick: (invoicePaymentId: number) => void;
  onEditInvoicePayment: (invoicePaymentId: number, invoicePayment: InvoicePaymentList) => void;
  onDeleteInvoicePayment: (invoicePaymentId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};