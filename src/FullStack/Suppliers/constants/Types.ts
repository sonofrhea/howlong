import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, BankInterface, CurrencyInterface } from "../../Core/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { SUPPLIERS_ICONS } from "./ModuleIcons";

import { BANK_TYPE_CHOICES, COUNTRY_OPTIONS, 
  STATUS_CHOICES, 
  TAX_ID_CHOICES } from "./options"



export interface SuppliersModulesInterface {
    id: keyof typeof SUPPLIERS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};








// -------- BEGIN ----------- SUPPLIER CATEGORY INPUT ----------------

export type SupplierCategoryList = {
  date_created: string;
  category_id: number;
  category: string;
  description: string;
  created_by: string;
}

export type SupplierCategoryInputs = {
  category_id: number;
  date_created: string;
  category: string;
  description: string;
  created_by: string;
};

export type SupplierCategoryResponse = {
  category_id: number;
  category: string;
}

export type allSupplierCategoryInputs = {
  category_id: number;
  supplierCategoryData: SupplierCategoryInputs;
}

export type editSupplierCategory = {
  supplierCategoryId: number;
  supplierCategoryData: SupplierCategoryInputs;
}

export type SupplierCategoryProps = { 
  supplierCategory: SupplierCategoryInputs;
  onSubmit: (data: SupplierCategoryInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  agents: AgentInterface[];
};


// -------- END ----------- SUPPLIER CATEGORY INPUT ----------------










// -------- BEGIN ----------- SUPPLIER PROFILE INPUT ----------------

export type SupplierProfileList = {
  supplier_code: number;
  supplier_name: string;
  company_name: string;
  category: string;
  city: string;
  registration_number: number;
  status: string;
  remark: string;
  is_active: boolean;
}

export type SupplierProfileInputs = {
  supplier_code: number;
  supplier_name: string;
  company_name: string;
  category: string;
  preferred_currency: {
    currency_code: string | null;
    currency_name: string | null;
    currency_symbol: string | null;
    country: string | null;
    buy: number | null;
    sell: number | null;
  };
  address: string;
  country: keyof typeof COUNTRY_OPTIONS;
  post_code: string;
  city: string;
  state: string;
  mobile_number: number;
  home_number: number;
  fax: string
  email: string;
  account_open_date: string;
  registration_number: number;
  status: keyof typeof STATUS_CHOICES;
  gst_number: number;
  tax_id_type: keyof typeof TAX_ID_CHOICES;
  brn_number: number;
  tax_number: number;
  taxpayers_qr_code: File | null;
  tourism_number: number;
  expiration_date: string;
  service_tax_number: number;
  supplier_bank_name: string;
  remark: string;
  supplier_bank_account_number: number;
  bank_account_type: keyof typeof BANK_TYPE_CHOICES;
  is_active: boolean;
  created_by: string;
  date_created: string;
};

export type SupplierProfileResponse = {
  supplier_code: number;
  supplier_name: string;
};

export type allSupplierProfileInputs = {
  supplier_code: number;
  supplierProfileData: SupplierProfileInputs;
};

export type EditSupplierProfile = {
  supplierProfileId: number;
  supplierProfileData: SupplierProfileInputs;
};

export type SupplierProfileProps = { 
  supplierProfile: SupplierProfileInputs;
  onSubmit: (data: SupplierProfileInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  agents: AgentInterface[];
  supplierCategories: SupplierCategoryResponse[];
  banks: BankInterface[];
  currencies: CurrencyInterface[];
};

// -------- END ----------- SUPPLIER PROFILE INPUT ----------------



































// -------- BEGIN ----------- SUPPLIER PAYMENT INPUT ----------------

export type SupplierPaymentList = {
  payment_code: number;
  date_created: string;
  supplier: string;
  aggregate_total: number;
  cancelled: boolean;
  outstanding_amount: number;
  currency: string;
  created_by: string;
}

export type SupplierPaymentInputs = {
  payment_code: number;
  date_created: string;
  supplier: string;
  supplier_name: string;
  account_code?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  currency: string;
  related_payment?: Array <{
    payment_date?: string | null;
    payment_type?: string | null;
    payment_amount?: number | null;
    additional_payment?: number | null;
    cancelled?: boolean | null;
  }> | null;
  related_invoice: string;
  agent: string;
  invoice_amount: number;
  tax_inclusive: boolean;
  tax_amount: number;
  cancelled: boolean;
  created_by: string;
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

export type SupplierPaymentProps = {
  supplierPayment: SupplierPaymentInputs;
  onSubmit: (data: SupplierPaymentInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  agents: AgentInterface[];
  supplierInvoices: SupplierInvoiceResponse[];
  supplierProfiles: SupplierProfileResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
};


// -------- END ----------- SUPPLIER PAYMENT INPUT ----------------













// -------- BEGIN ----------- SUPPLIER INVOICE INPUT ----------------

export type SupplierInvoiceList = {
  invoice_number: number;
  invoice_date: string;
  invoice_due_date: string;
  product: string;
  supplier: string;
  aggregate_total: number;
  cancelled: boolean;
  agent: string;
}

export type SupplierInvoiceInputs = {
  invoice_number: number;
  invoice_date: string;
  invoice_due_date: string;
  supplier: string;
  supplier_name: string;
  supplier_details: string;
  currency: string;
  purchase_account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  agent: string;
  product: string;
  related_invoice?: Array <{
    item_name?: string | null;
    description?: string | null;
    quantity?: number | null;
    unit_of_measure?: string | null;
    price_per_unit?: number | null;
    tax_inclusive?: boolean | null;
    tax_amount?: number | null;
    cancelled?: boolean | null;
  }> | null;
  tax_inclusive: boolean;
  tax_amount: number;
  cancelled: boolean;
  date_created: string;
};

export type SupplierInvoiceResponse = {
  invoice_number: number;
  supplier_name: string;
  aggregate_total: number;
};

export type allSupplierInvoiceInputs = {
  invoice_number: number;
  supplierInvoiceData: SupplierInvoiceInputs;
};

export type EditSupplierInvoiceInputs = {
  supplierInvoiceId: number;
  supplierInvoiceData: SupplierInvoiceInputs;
};

export type SupplierInvoiceProps = {
  supplierInvoice: SupplierInvoiceInputs;
  onSubmit: (data: SupplierInvoiceInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  agents: AgentInterface[];
  productItems: ProductItemCreateResponse[];
  supplierProfiles: SupplierProfileResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
};

// -------- END ----------- SUPPLIER INVOICE INPUT ----------------





// -------- BEGIN ----------- SUPPLIER DEBIT NOTE INPUT ----------------

export type SupplierDebitNoteList = {
  debit_note_number: number;
  date: string;
  supplier: string;
  supplier_name: string;
  related_invoice: string;
  net_total: number;
  cancelled: boolean;
}


export type SupplierDebitNoteInputs = {
  debit_note_number: number;
  date: string;
  description: string;
  supplier: string;
  supplier_name: string;
  account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  currency: string;
  related_invoice: string;
  related_invoice_total: string;
  related_debit_note: Array <{
    debit_note_item: string;
    description: string;
    amount: number;
    tax_inclusive: boolean;
    tax_amount: number;
    cancelled: boolean;
  }>
  agent: string;
  tax_inclusive: boolean;
  tax_amount: number;
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

export type SupplierDebitNoteProps = {
  supplierDebitNote: SupplierDebitNoteInputs;
  onSubmit: (data: SupplierDebitNoteInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  agents: AgentInterface[];
  productItems: ProductItemCreateResponse[];
  SupplierProfiles: SupplierProfileResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  SupplierInvoices: SupplierInvoiceResponse[];
};

  // -------- END ----------- SUPPLIER DEBIT NOTE INPUT ----------------









// -------- BEGIN ----------- SUPPLIER CREDIT NOTE INPUT ----------------

export type SupplierCreditNoteList = {
  credit_note_number: number;
  date: string;
  supplier: string;
  supplier_name: string;
  related_invoice: string;
  net_total: number;
  cancelled: boolean;
}


export type SupplierCreditNoteInputs = {
  credit_note_number: number;
  date: string;
  supplier: string;
  supplier_name: string;
  description: string;
  account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  related_invoice: string;
  related_invoice_total: number;
  related_credit_note: Array <{
    credit_note_item: string;
    description: string;
    amount: number;
    tax_inclusive: boolean;
    tax_amount: number;
    cancelled: boolean;
  }>
  currency: string;
  tax_inclusive: boolean;
  tax_amount: number;
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

export type SupplierCreditNoteFormProps = {
  supplierCreditNote: SupplierCreditNoteInputs;
  onSubmit: (data: SupplierCreditNoteInputs) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  supplierInvoices: SupplierInvoiceResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  supplierProfiles: SupplierProfileResponse[];
  productItems: ProductItemCreateResponse[];
};


  // -------- END ----------- SUPPLIER CREDIT NOTE INPUT ----------------

