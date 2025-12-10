




// -------- BEGIN ----------- QUOTATIONS INPUT ----------------

export type QuotationInputs = {
  quotation_date: number; 
  valid_until: number;
  customer: string;
  customer_details: string;
  agent: string;
  project_description: string;
  related_quotation: Array<{
    item: string;
    description: string;
    quantity: number;
    unit_of_measure: string;
    unit_per_price: number;
    currency: string;
  }>
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

export type InvoiceInputs = {
  invoice_date: number;
  invoice_due_date: number;
  customer: string;
  customer_details: string;
  description: string;
  agent: string;
  tax_inclusive: boolean;
  tax_amount: number;
  project: string;
  related_invoice: Array<{
    item: string;
    description: string;
    quantity: number;
    unit_of_measure: string;
    unit_per_price: number;
    currency: string;
    discount: number;
  }>
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

// -------- END ----------- INVOICE INPUT ----------------










// -------- BEGIN ----------- CUSTOMER PAYMENT INPUT ----------------

export type CustomerPaymentInputs = {
  date: number;
  customer: string;
  project: string;
  project_name: string;
  currency: string;
  account_received_in: number;
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
