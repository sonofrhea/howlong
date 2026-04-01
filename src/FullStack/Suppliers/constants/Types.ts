import { JournalHeaderInputs } from "../../Accounting/Constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, BankInterface, CurrencyInterface } from "../../Core/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { SUPPLIERS_ICONS } from "./ModuleIcons";

import { BANK_TYPE_CHOICES, COUNTRY_OPTIONS, 
  PAYMENT_TYPE_OPTIONS, 
  STATUS_CHOICES, 
  TAX_ID_CHOICES } from "./options"



export interface SuppliersModulesInterface {
    id: keyof typeof SUPPLIERS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};



export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}






// -------- BEGIN ----------- SUPPLIER CATEGORY INPUT ----------------

export type SupplierCategoryList = {
  date_created: string;
  category_id: number;
  formatted_number: string;
  category: string;
  description: string;
  created_by: string;
}

export type SupplierCategoryInputs = {
  category_id: number;
  formatted_number?: string;
  date_created?: string;
  category?: string;
  description?: string;
  created_by?: string;
};

export type SupplierCategoryResponse = {
  category_id: number;
  category: number;
  formatted_number: string;
  description: string;
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
  onCancel: (supplierCategoryId: number) => void;
  agents: AgentInterface[];
};

export type SupplierCategoryTableProps = {
  supplierCategories: SupplierCategoryList[];
  onSupplierCategoryClick: (supplierCategoryId: number) => void;
  onEditSupplierCategory: (supplierCategoryId: number, supplierCategory: SupplierCategoryList) => void;
  onDeleteSupplierCategory: (supplierCategoryId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};


export type SupplierCategoryFormProps = { 
  onSubmit: (data: SupplierCategoryInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel?: () => void;
  agents: AgentInterface[];
};


export type SupplierCategoryEditProps = {
  supplierCategory: SupplierCategoryInputs;
  onSubmit: (data: SupplierCategoryInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
};


// -------- END ----------- SUPPLIER CATEGORY INPUT ----------------










// -------- BEGIN ----------- SUPPLIER PROFILE INPUT ----------------

export type SupplierProfileList = {
  supplier_code: number;
  formatted_number: string;
  supplier_name: string;
  company_name: string;
  industry_code: string;
  category: string;
  city: string;
  registration_number: number;
  status: string;
  remark: string;
  is_active: boolean;
};


export type SupplierProfileDetails = {
  supplier_code: number;
  formatted_number: string;
  supplier_name: string;
  company_name: string;
  category_name: SupplierCategoryResponse;
  industry_code: string | null;

  preferred_currency: {
    currency_code: string;
    currency_name: string;
    currency_symbol: string;
    country: string;
    buy: string;
    sell: string;
  };

  address: string;
  country: string;
  post_code: string;
  city: string;
  state: string;

  mobile_number: string;
  home_number: string;
  fax: string;
  email: string;

  account_open_date: string;
  registration_number: string;
  status: string;

  gst_number: string;
  tax_id_type: string;
  brn_number: string;
  tax_number: string;
  tourism_number: string;
  expiration_date: string;
  service_tax_number: string;

  supplier_bank_name: string;
  remark: string;
  supplier_bank_account_number: string;
  bank_account_type: string;

  is_active: boolean;

  created_by: string;
  date_created: string;
  updated_by: string;
  date_updated: string;
  company: string;
};

export type SupplierProfileInputs = {
  supplier_code: number;
  formatted_number?: string;
  supplier_name?: string;
  company_name: string;
  category: number;
  preferred_currency?: {
    currency_code: string;
    currency_name: string;
    currency_symbol: string;
    country: string;
    buy: number;
    sell: number;
  };
  address: string;
  country: typeof COUNTRY_OPTIONS[number];
  post_code: string;
  city: string;
  state: string;
  mobile_number: number;
  home_number: number;
  fax: string
  email: string;
  account_open_date: string;
  registration_number: number;
  status: typeof STATUS_CHOICES[number];
  gst_number: number;
  tax_id_type: typeof TAX_ID_CHOICES[number];
  brn_number: number;
  tax_number: number;
  tourism_number: number;
  expiration_date: string;
  service_tax_number: number;
  supplier_bank_name: string;
  remark: string;
  supplier_bank_account_number: number;
  bank_account_type: typeof BANK_TYPE_CHOICES[number];
  is_active: boolean;
  created_by: string;
  date_created: string;
};

export type SupplierProfileResponse = {
  supplier_code: number;
  supplier_name: string;
  formatted_number?: string;
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
  onCancel: (supplierProfileId: number) => void;
  agents: AgentInterface[];
  supplierCategories: SupplierCategoryResponse[];
  banks: BankInterface[];
  currencies: CurrencyInterface[];
};


export type SupplierProfileTableProps = {
  supplierProfiles: SupplierProfileList[];
  onSupplierProfileClick: (supplierProfileId: number) => void;
  onEditSupplierProfile: (supplierProfileId: number, supplierProfile: SupplierProfileList) => void;
  onDeleteSupplierProfile: (supplierProfileId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};


export type SupplierProfileFormProps = {
  onSubmit: (data: SupplierProfileInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  agents: AgentInterface[];
  supplierCategories: SupplierCategoryResponse[];
  banks: BankInterface[];
  currencies: CurrencyInterface[];
};


export type SupplierDetailsProps = {
  supplierProfile: SupplierProfileDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (supplierProfileId: number) => void;
};

// -------- END ----------- SUPPLIER PROFILE INPUT ----------------



































// -------- BEGIN ----------- SUPPLIER PAYMENT INPUT ----------------

export type SupplierPaymentList = {
  payment_code: number;
  formatted_number: string;
  date_created: string;
  supplier: SupplierProfileResponse;
  aggregate_total: number;
  cancelled: boolean;
  outstanding_amount: number;
  currency: string;
  created_by: string;
}

export type SupplierPaymentInputs = {
  payment_code: number;
  formatted_number?: string;
  supplier?: number;
  account_code?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };

  currency?: number;
  related_invoice?: number;
  invoice_amount?: string;

  related_payment?: Array<{
    id?: number;
    payment_date?: string;
    payment_method?: typeof PAYMENT_TYPE_OPTIONS[number];
    taxable?: boolean;
    sst_percent?: number;
    payment_amount?: number;
    cancelled?: boolean;
  }>;

  taxable?: boolean;
  tax_percent?: number;
  cancelled?: boolean;

  payment_receipt?: File;
  date_created: string;
}


export type SupplierPaymentDetails = {
  payment_code: number;
  formatted_number: string;

  supplier: SupplierProfileResponse;
  supplier_name: string;

  account_code: {
    account_code: number;
    account_name: string;
    account_type: string;
  };

  currency: number;
  related_invoice: SupplierInvoiceResponse;

  invoice_amount: string;

  related_payment: Array<{
    payment_date: string;
    payment_method: string;
    payment_amount: string;
    taxable: boolean;
    sst_percent: number;
    sst_amount: string;
    current_total: string;
    cancelled: boolean;
  }>;

  net_paid: string;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  aggregate_total: string;
  cancelled: boolean;

  outstanding_amount: string;

  payment_receipt: File;

  created_by: number;
  date_created: string;
  updated_by: number;
  date_updated: string;

  version: number;
  company: number;
}

export type SupplierPaymentResponse = {
  payment_code: number;
  formatted_number: string;
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
  onCancel: (supplierPaymentId: number) => void;
  agents: AgentInterface[];
  supplierInvoices: SupplierInvoiceResponse[];
  supplierProfiles: SupplierProfileResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type SupplierPaymentDetailsProps = {
  supplierPayment: SupplierPaymentDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (supplierPaymentId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type SupplierPaymentTableProps = {
  supplierPayments: SupplierPaymentList[];
  onSupplierPaymentClick: (supplierPaymentId: number) => void;
  onEditSupplierPayment: (supplierPaymentId: number, supplierPayment: SupplierPaymentList) => void;
  onDeleteSupplierPayment: (supplierPaymentId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};


export type SupplierPaymentFormProps = {
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
  formatted_number: string;
  invoice_date: string;
  invoice_due_date: string;
  product: string;
  supplier: string;
  aggregate_total: number;
  cancelled: boolean;
  agent: string;
};


export type SupplierInvoiceDetails = {
  invoice_number: number;
  formatted_number: string;
  invoice_date: string;
  invoice_due_date: string;
  currency: string

  purchase_account: {
    account_code: number;
    account_name: string;
    account_type: string;
  },

  supplier_name: SupplierProfileResponse;
  supplier_details: string;

  related_invoice: Array<{
    item: ProductItemCreateResponse;
    item_name: string;
    description: string;
    quantity: string;
    unit_of_measure: string;
    price_per_unit: string;
    total: string;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    sub_total: string;
    cancelled: boolean;
  }>,

  gross_total: string;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  cancelled: boolean;
  aggregate_total: string;

  agent: string;
  product: string;
  created_by: string
  date_created: string;
  date_updated: string;
  updated_by: string;
};


export type SupplierInvoiceInputs = {
  invoice_number: number;
  formatted_number?: string;
  invoice_date?: string;
  invoice_due_date?: string;
  supplier?: number;
  supplier_name?: string;
  supplier_details?: string;
  currency?: string;
  purchase_account?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
  agent?: string;
  product?: string;
  related_invoice?: Array <{
    id?: number;
    item?: number;
    description?: string;
    quantity?: number;
    unit_of_measure?: string;
    price_per_unit?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled?: boolean;
  }>;
  taxable?: boolean;
  tax_percent?: number;
  cancelled?: boolean;
  date_created?: string;
};

export type SupplierInvoiceResponse = {
  invoice_number: number;
  formatted_number: string;
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


export type SupplierInvoiceFormProps = {
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


export type SupplierInvoiceDetailsProps = {
  supplierInvoice: SupplierInvoiceDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (supplierInvoiceId: number) => void;
};

export type SupplierInvoiceProps = {
  supplierInvoice: SupplierInvoiceInputs;
  onSubmit: (data: SupplierInvoiceInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel: (supplierInvoiceId: number) => void;
  agents: AgentInterface[];
  productItems: ProductItemCreateResponse[];
  supplierProfiles: SupplierProfileResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
};

export type SupplierInvoiceTableProps = {
  supplierInvoices: SupplierInvoiceList[];
  onSupplierInvoiceClick: (supplierInvoiceId: number) => void;
  onEditSupplierInvoice: (supplierInvoiceId: number, supplierInvoice: SupplierInvoiceList) => void;
  onDeleteSupplierInvoice: (supplierInvoiceId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};

// -------- END ----------- SUPPLIER INVOICE INPUT ----------------





// -------- BEGIN ----------- SUPPLIER DEBIT NOTE INPUT ----------------

export type SupplierDebitNoteList = {
  debit_note_number: number;
  formatted_number: string;
  date: string;
  supplier: SupplierProfileResponse;
  supplier_name: string;
  related_invoice: SupplierInvoiceResponse;
  net_total: number;
  cancelled: boolean;
}


export type SupplierDebitNoteInputs = {
  debit_note_number: number;
  formatted_number?: string;
  date?: string;
  description?: string;
  supplier?: number;
  supplier_name?: string;
  account?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
  currency: string;
  related_invoice: number;
  related_invoice_total: string;
  related_debit_note?: Array <{
    id?: number;
    debit_note_item?: number;
    description?: string;
    amount?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled: boolean;
  }>;
  agent?: string;
  taxable?: boolean;
  tax_percent?: number;
  cancelled?: boolean;
};


export type SupplierDebitNoteDetails = {
  debit_note_number: number;
  formatted_number: string;
  date: string;
  supplier: SupplierProfileResponse;
  supplier_name: string;
  description: string;
  account: {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  gross_total: number;
  related_invoice: SupplierInvoiceResponse;
  related_invoice_total: number;
  related_debit_note: Array<{
    debit_note_item: ProductItemCreateResponse;
    debit_note_item_name: string;
    description: string;
    amount: number;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    current_total: number;
    cancelled: boolean;
}>;
  agent: string;
  created_by: string;
  currency: string;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  cancelled: boolean;
  net_total: number;
  date_created: string;
  date_updated: string;
  updated_by: string;
};


export type SupplierDebitNoteResponse = {
  debit_note_number: number;
  formatted_number: string;
}

export type allSupplierDebitNoteInputs = {
  debit_note_number: number;
  supplierDebitNoteData: SupplierDebitNoteInputs;
}

export type EditSupplierDebitNoteInputs = {
  supplierDebitNoteId: number;
  supplierDebitNoteData: SupplierDebitNoteInputs;
};


export type SupplierDebitNoteFormProps = {
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

export type SupplierDebitNoteProps = {
  supplierDebitNote: SupplierDebitNoteInputs;
  onSubmit: (data: SupplierDebitNoteInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel: (supplierDebitNoteId: number) => void;
  agents: AgentInterface[];
  productItems: ProductItemCreateResponse[];
  SupplierProfiles: SupplierProfileResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  SupplierInvoices: SupplierInvoiceResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type SupplierDebitNoteDetailsProps = {
  supplierDebitNote: SupplierDebitNoteDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (supplierDebitNoteId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type SupplierDebitNoteTableProps = {
  supplierDebitNotes: SupplierDebitNoteList[];
  onSupplierDebitNoteClick: (supplierDebitNoteId: number) => void;
  onEditSupplierDebitNote: (supplierDebitNoteId: number, supplierDebitNote: SupplierDebitNoteList) => void;
  onDeleteSupplierDebitNote: (supplierDebitNoteId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};

  // -------- END ----------- SUPPLIER DEBIT NOTE INPUT ----------------









// -------- BEGIN ----------- SUPPLIER CREDIT NOTE INPUT ----------------

export type SupplierCreditNoteList = {
  credit_note_number: number;
  formatted_number: string;
  date: string;
  supplier: SupplierProfileResponse;
  supplier_name: string;
  related_invoice: SupplierInvoiceResponse;
  net_total: number;
  cancelled: boolean;
}


export type SupplierCreditNoteInputs = {
  credit_note_number: number;
  formatted_number: string;
  date?: string;
  supplier?: number;
  supplier_name?: string;
  description?: string;
  account?: {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
  related_invoice?: string;
  related_invoice_total?: number;
  related_credit_note?: Array <{
    id?: number;
    credit_note_item?: number;
    description?: string;
    amount?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled?: boolean;
  }>;
  currency?: string;
  taxable?: boolean;
  tax_percent?: number;
  agent?: string;
  cancelled?: boolean;
};

export type SupplierCreditNoteDetails = {
  credit_note_number: number;
  formatted_number: string;
  date: string;
  supplier: SupplierProfileResponse;
  supplier_name: string;
  description: string;
  account?: {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  gross_total: number;
  related_invoice: SupplierInvoiceResponse;
  related_invoice_total: number;
  related_credit_note: Array<{
    credit_note_item: ProductItemCreateResponse;
    credit_note_item_name: string;
    description: string;
    amount: number;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    current_total: number;
    cancelled: boolean;
  }>
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  cancelled: boolean;
  net_total: number;
  outstanding: number;
  agent: string;
  created_by: string;
  currency: string;
  date_created: string;
  date_updated: string;
  updated_by: string;
};

export type SupplierCreditNoteResponse = {
  credit_note_number: number;
  formatted_number: string;
}

export type allSupplierCreditNoteInputs = {
  credit_note_number: number;
  supplierCreditNoteData: SupplierCreditNoteInputs;
}

export type EditSupplierCreditNoteInputs = {
  supplierCreditNoteId: number;
  supplierCreditNoteData: SupplierCreditNoteInputs;
}

export type SupplierCreditNoteEditProps = {
  supplierCreditNote: SupplierCreditNoteInputs;
  onSubmit: (data: SupplierCreditNoteInputs) => void;
  isSubmitting: boolean;
  onCancel: (supplierCreditNoteId: number) => void;
  supplierInvoices: SupplierInvoiceResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  supplierProfiles: SupplierProfileResponse[];
  productItems: ProductItemCreateResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};

export type SupplierCreditNoteDetailsProps = {
  supplierCreditNote: SupplierCreditNoteDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (supplierCreditNoteId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type SupplierCreditNoteTableProps = {
  supplierCreditNotes: SupplierCreditNoteList[];
  onSupplierCreditNoteClick: (supplierCreditNoteId: number) => void;
  onEditSupplierCreditNote: (supplierCreditNoteId: number, supplierCreditNote: SupplierCreditNoteList) => void;
  onDeleteSupplierCreditNote: (supplierCreditNoteId: number) => void;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
  sortConfig: SortConfig;
};


export type SupplierCreditNoteFormProps = {
  onSubmit: (data: SupplierCreditNoteInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  supplierInvoices: SupplierInvoiceResponse[];
  currencies: CurrencyInterface[];
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  supplierProfiles: SupplierProfileResponse[];
  productItems: ProductItemCreateResponse[];
};


  // -------- END ----------- SUPPLIER CREDIT NOTE INPUT ----------------

