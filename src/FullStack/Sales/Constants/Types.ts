import React, { useState } from "react";
import { SALES_ICONS } from "./ModuleIcons";

import { EINVOICE_STATUS_CHOICES, EINVOICE_TYPE_CHOICES, LHDN_TAX_TYPE_CHOICES,
  PAYMENT_MODE_CHOICES, PAYMENT_STATUS_CHOICES, PAYMENT_TYPE_OPTIONS, SUPPLY_TYPE_CHOICES } from "./Options";
import { CustomerCreateResponse, CustomerInputs } from "../../Customers/constants/Types";
import { AgentInterface, BankInterface, CurrencyInterface } from "../../Core/constants/Types";
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

export type lhdnClassificationCodesInterface = {
  code: number;
  description: string;
};









// -------- BEGIN ----------- QUOTATIONS INPUT ----------------

export type QuotationList = {
  quotation_number: number;
  formatted_number: string;
  quotation_date: string;
  valid_until: string;
  customer: CustomerCreateResponse;
  project_description: string;
  cancelled: boolean;
  net_total: number;
  agent: string;
}

export type QuotationInputs = {
  quotation_number: number;
  formatted_number?: string;
  quotation_date?: string; 
  valid_until?: string;
  customer?: CustomerCreateResponse;
  customer_details?: string;
  agent?: string;
  project_description: string;
  related_quotation?: Array<{
    id?: number;
    item?: string;
    description?: string;
    quantity?: number;
    unit_of_measure?: string;
    price_per_unit?: number;
    currency?: string;
    cancelled?: boolean;
    taxable?: boolean;
    sst_percent?: number;
  }>;
  taxable?: boolean;
  tax_percent?: number;
  discount?: boolean;
  discount_percent?: number;
  cancelled?: boolean;
};

export type QuotationDetails = {
  quotation_number: number;
  formatted_number: string;
  quotation_date: string;
  valid_until: string;
  customer: CustomerCreateResponse;
  customer_name: string;
  customer_details: string;
  agent: string;
  project_description: string;
  related_quotation?: Array<{
    item: ProductItemCreateResponse;
    item_name: string;
    item_photo: string;
    description: string;
    quantity: number;
    unit_of_measure: string;
    price_per_unit: number;
    currency: string;
    sub_total: string;
    cancelled: boolean;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;

  }> | null;
  discount: boolean;
  discount_percent: number;
  discount_amount: number;
  after_discount_totals: number;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  cancelled: boolean;
  gross_total: number;
  net_total: number;
  created_by: string;
  date_created: string;
  date_updated: string;
  updated_by: string;
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
  onCancel: (quotationId: number) => void;
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


export type QuotationFormProps = {
  onSubmit: (data: QuotationInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  agents: AgentInterface[];
  productItems: ProductItemCreateResponse[];
  banks: BankInterface[];
  onCreateCustomer: (data: CustomerInputs) => void;
  isCreatingCustomer: boolean;
};

export type PrintQuotationProps = {
  quotation: QuotationDetails
};

// -------- END ----------- QUOTATIONS INPUT ----------------









// -------- BEGIN ----------- INVOICE INPUT ----------------

export type InvoiceList = {
  invoice_number: number;
  formatted_number: string;
  invoice_date: string;
  invoice_due_date: string;
  payment_status: typeof PAYMENT_STATUS_CHOICES[number];
  related_quotation: number;
  customer: CustomerCreateResponse;
  description: string,
  net_total: number;
  outstanding: number;
  currency: string;
  cancelled: boolean;
  agent: string;
};


export type InvoiceDetails = {
  invoice_number: number;
  formatted_number: string;
  invoice_date: string;
  invoice_due_date: string;
  related_quotation: number;
  payment_status: typeof PAYMENT_STATUS_CHOICES[number];

  customer: CustomerCreateResponse;
  customer_name: string;
  customer_details: string;

  description: string;

  related_invoice: Array<{
    item: number;
    item_name: string;
    description: string;
    quantity: number;
    unit_of_measure: string;
    price_per_unit: number;
    total: number;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    sub_total: string;
    cancelled: boolean;
    einvoice_classification_code: number;
    einvoice_tax_type: string;
    einvoice_tax_exemption_reason: string;
  }>;

  currency: string;

  agent: string;
  project_name: string;

  discount: boolean;
  discount_percent: number;
  discount_amount: number;
  after_discount_totals: number;

  taxable: boolean;
  tax_percent: number;
  tax_amount: number;

  cancelled: boolean;
  lhdn_uuid: string;
  lhdn_long_uid: string;
  lhdn_submission_uid: string;
  einvoice_status: typeof EINVOICE_STATUS_CHOICES[number];
  einvoice_submitted_at: string;
  einvoice_status_last_checked: string;
  einvoice_validation_errors: string;
  einvoice_type?: typeof EINVOICE_TYPE_CHOICES[number]['value'];
  einvoice_supply_type?: typeof SUPPLY_TYPE_CHOICES[number];
  einvoice_payment_mode?: typeof PAYMENT_MODE_CHOICES[number]['value'];

  gross_total: number;
  net_total: number;
  outstanding: number;
  updated_by: string;
  created_by: string;
  date_updated: string;
};

export type InvoiceInputs = {
  invoice_number: number;
  formatted_number?: string;
  invoice_date?: string;
  invoice_due_date?: string;
  related_quotation?: number;
  payment_status?: typeof PAYMENT_STATUS_CHOICES[number];
  customer?: CustomerCreateResponse;
  customer_name?: string;
  customer_details?: string;
  description?: string;
  currency?: string;
  agent?: string;
  project?: string;
  project_name?: string;
  related_invoice?: Array<{
    item?: string;
    description?: string;
    quantity?: number;
    unit_of_measure?: string;
    price_per_unit?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled?: boolean;
    einvoice_classification_code?: number;
    einvoice_tax_type?: typeof LHDN_TAX_TYPE_CHOICES[number]['value'];
    einvoice_tax_exemption_reason?: string;
  }>;
  discount?: boolean;
  discount_percent?: number;
  taxable?: boolean;
  tax_percent?: number;
  cancelled?: boolean;
  einvoice_validation_errors?: string;
  einvoice_type?: typeof EINVOICE_TYPE_CHOICES[number]['value'];
  einvoice_supply_type?: typeof SUPPLY_TYPE_CHOICES[number];
  einvoice_payment_mode?: typeof PAYMENT_MODE_CHOICES[number]['value'];
  einvoice_payment_terms?: string;
  created_by: string;
};

export type InvoiceCreateResponse = {
  invoice_number: number;
  net_total: number;
  formatted_number: string;
  payment_status: typeof PAYMENT_STATUS_CHOICES[number];
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
  formatted_number: string;
  outstanding?: number;
};

export type InvoiceProps = {
  invoice: InvoiceInputs;
  onSubmit: (data: InvoiceInputs) => void;
  isSubmitting: boolean;
  onCancel: (invoiceId: number) => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  agents: AgentInterface[];
  projects: ProjectProfileResponse[];
  productItems: ProductItemCreateResponse[];
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
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


export type InvoiceFormProps = {
  onSubmit: (data: InvoiceInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  customers: CustomerCreateResponse[];
  currencies: CurrencyInterface[];
  agents: AgentInterface[];
  projects: ProjectProfileResponse[];
  productItems: ProductItemCreateResponse[];
  quotations: QuotationDetails[];
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
};


export type InvoiceDetailsProps = {
  invoice: InvoiceDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (invoiceId: number) => void;
  einvoiceEnabled: boolean;
  onSubmitSuccess: () => void;
  onCancelSuccess: () => void;
};
// -------- END ----------- INVOICE INPUT ----------------










// -------- BEGIN ----------- CUSTOMER PAYMENT INPUT ----------------

export type CustomerPaymentList = {
  payment_number: number;
  formatted_number: string;
  date: string;
  customer: CustomerCreateResponse;
  currency: string;
  description: string;
  project: ProjectProfileResponse;
  paid_amount: number;
  outstanding: number;
  completed: boolean;
  agent: string;
  cancelled: boolean;
};


export type CustomerPaymentInputs = {
  payment_number: number;
  formatted_number?: string;
  date?: string;
  customer?: CustomerCreateResponse;
  customer_name?: string;
  project?: number;
  project_name?: string;
  related_payment?: string;
  related_payment_paid_amount?: string;
  related_payment_outstanding?: string;
  account_received_in?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
  currency?: string;
  description?: string;
  paid_amount?: number;
  additional_bank_charges?: number;
  outstanding?: number;
  completed?: boolean;
  agent?: string;
  cancelled?: boolean;
};

export type CustomerPaymentDetails = {
  payment_number: number;
  formatted_number: string;
  date: string;
  customer_name: CustomerCreateResponse;
  project: ProjectProfileResponse;
  project_name: string;
  account_received_in?: {
    account_code: number;
    account_name: number;
    account_type: number;
  };
  currency: string;
  description: string;
  paid_amount: number;
  related_payment_paid_amount: number;
  outstanding: number;
  related_payment_outstanding: number;
  outstanding_paid: number;
  completed: boolean;
  cancelled: boolean;
  agent: string;
  created_by: string;
  date_updated: string;
  updated_by: string;
};

export type CustomerPaymentResponse = {
  payment_number: number;
  paid_amount: number;
  formatted_number: string;
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
  onCancel: (customerPaymentId: number) => void;
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
};


export type CustomerPaymentFormProps = {
  onSubmit: (data: CustomerPaymentInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  customers: CustomerCreateResponse[];
  invoicePayments: InvoicePaymentInterface[];
  projects: ProjectProfileResponse[];
};

// -------- END ----------- CUSTOMER PAYMENT INPUT ----------------






//----------------BEGIN-----INVOICE PAYMENT INPUT-------------------

export type InvoicePaymentList = {
  date_created: string;
  formatted_number: string;
  invoice_payment_code: number;
  related_invoice?: InvoiceCreateResponse;
  related_invoice_total: number;
  gross_paid: number;
  tax_percent: number;
  net_aggregate_paid: number;
  outstanding_amount: number;
  paid_by: CustomerCreateResponse;
  cancelled: boolean;
  agent: string;
};

export type InvoicePaymentInputs = {
  invoice_payment_code: number;
  formatted_number?: string;
  date_created?: string;
  related_invoice?: number;
  related_invoice_details?: string;
  account_received_in?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
  currency?: string;
  related_invoice_total?: number;
  taxable?: boolean;
  tax_percent?: number;
  cancelled?: boolean;
  related_invoice_payment?: Array<{
    payment_date?: string;
    payment_type?: typeof PAYMENT_TYPE_OPTIONS[number];
    total?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled?: boolean;
  }>;
  gross_paid?: number;
  net_aggregate_paid?: number;
  outstanding_amount?: number;
  paid_by?: CustomerCreateResponse;
  paid_by_name?: string;
  agent?: string;
};


export type InvoicePaymentDetails = {
  invoice_payment_code: number;
  formatted_number: string;
  related_invoice?: InvoiceCreateResponse;
  related_invoice_details: string;
  account_received_in: {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  gross_paid: number;
  currency: string;
  related_invoice_total: number;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  cancelled: boolean;
  net_aggregate_paid: number;
  related_invoice_payment?: Array<{
    payment_date: string;
    total: number;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    sub_total: number;
    cancelled: boolean;
    payment_type?: typeof PAYMENT_TYPE_OPTIONS[number];
}>;
  outstanding_amount: number;
  payment_receipt: File;
  paid_by: CustomerCreateResponse;
  paid_by_name: string;
  agent: string;
  created_by: string;
  date_created: string;
  date_updated: string;
  updated_by: string;
};


export type InvoicePaymentResponse = {
  invoice_payment_code: number;
  formatted_number: string;
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
  formatted_number: string;
  net_aggregate_paid: number;
  outstanding_amount: number;
  related_invoice_total: number;
};

export type InvoicePaymentProps = {
  invoicePayment: InvoicePaymentInputs;
  onSubmit: (data: InvoicePaymentInputs) => void;
  isSubmitting: boolean;
  onCancel: (invoicePaymentId: number) => void;
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


export type InvoicePaymentFormProps = {
  onSubmit: (data: InvoicePaymentInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  invoices: InvoiceCreateResponse[];
  customers: CustomerCreateResponse[];
};