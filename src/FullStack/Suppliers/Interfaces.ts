



// -------- BEGIN ----------- SUPPLIER PAYMENT INPUT ----------------

export type SupplierPaymentInputs = {
  supplier: string;
  supplier_name: string;
  date_created: string;
  account_code: {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  currency: string;
  related_payment: Array <{
    related_invoice: string;
    payment_amount: number;
    additional_payment: number;
    payment_date: string;
    payment_type: string;
  }>
};

export type SupplierPaymentResponse = {
  payment_code: number;
};

export type allSupplierPaymentInputs = {
  payment_code: number;
  supplierPaymentData: SupplierPaymentInputs;
};

export type EditSupplierPayment = {
  supplierPaymentId: number;
  supplierPaymentData: SupplierPaymentInputs;
};


// -------- END ----------- SUPPLIER PAYMENT INPUT ----------------













// -------- BEGIN ----------- SUPPLIER INVOICE INPUT ----------------

export type SupplierInvoiceInputs = {
  invoice_date: string;
  invoice_due_date: string;
  supplier: string;
  supplier_name: string;
  supplier_details: string;
  currency: string;
  purchase_account: {
    account_code: number;
    account_name: string;
    account_type: string;
  },
  agent: string;
  product: string;
  related_invoice: Array <{
    item_name: string;
    description: string;
    quantity: number;
    unit_of_measure: string;
    unit_per_price: number;
    tax_inclusive: boolean;
    tax_amount: number;
  }>
  date_created: string;
};

export type SupplierInvoiceResponse = {
  invoice_number: number;
};

export type allSupplierInvoiceInputs = {
  invoice_number: number;
  supplierInvoiceData: SupplierInvoiceInputs;
};

export type EditSupplierInvoiceInputs = {
  supplierInvoiceId: number;
  supplierInvoiceData: SupplierInvoiceInputs;
};

// -------- END ----------- SUPPLIER INVOICE INPUT ----------------





// -------- BEGIN ----------- SUPPLIER DEBIT NOTE INPUT ----------------



export type SupplierDebitNoteInputs = {
  date: string;
  description: string;
  supplier: string;
  supplier_name: string;
  account: {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  currency: string;
  related_invoice: string;
  related_debit_note: Array <{
    description: string;
    amount: number;
    tax_inclusive: boolean;
    tax_amount: number;
  }>
  agent: string;
  cancelled: boolean;
};

export type SupplierDebitNoteResponse = {
  debit_note_number: number;
}

export type allSupplierDebitNoteInputs = {
  debit_note_number: number;
  supplierDebitNoteData: SupplierDebitNoteInputs;
}

export type EditSupplierDebitNoteInputs = {
  supplierDebitNoteId: number;
  supplierDebitNoteData: SupplierDebitNoteInputs;
};


  // -------- END ----------- SUPPLIER DEBIT NOTE INPUT ----------------









// -------- BEGIN ----------- SUPPLIER CREDIT NOTE INPUT ----------------



export type SupplierCreditNoteInputs = {
  date: string;
  supplier: string;
  supplier_name: string;
  description: string;
  account: {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  related_invoice: string;
  related_credit_note: Array <{
    credit_note_item_name: string;
    amount: number;
    tax_inclusive: boolean;
    tax_amount: number;
  }>
  currency: string;
  agent: string;
  cancelled: boolean;
};

export type SupplierCreditNoteResponse = {
  credit_note_number: number;
}

export type allSupplierCreditNoteInputs = {
  credit_note_number: number;
  supplierCreditNoteData: SupplierCreditNoteInputs;
}

export type EditSupplierCreditNoteInputs = {
  supplierCreditNoteId: number;
  supplierCreditNoteData: SupplierCreditNoteInputs;
}

  // -------- END ----------- SUPPLIER CREDIT NOTE INPUT ----------------

