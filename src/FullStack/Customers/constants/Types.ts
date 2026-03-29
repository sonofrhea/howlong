
import { CUSTOMERS_ICONS } from "./ModuleIcons";



import { ID_TYPE_CHOICES,
  TAX_ID_CHOICES,
  BANK_TYPE_CHOICES,
  STATUS_CHOICES,
  REFUND_TYPE_OPTIONS,
  EINVOICE_SUPPLY_TYPE_CHOICES,
  EINVOICE_PAYMENT_MODE_CHOICES,
  LHDN_TAX_TYPE_CHOICES,
  SST_DIRECTION
 } from "./Options";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, BankInterface, CurrencyInterface } from "../../Core/constants/Types";
import { CustomerPaymentResponse, lhdnClassificationCodesInterface } from "../../Sales/Constants/Types";
import { JournalHeaderInputs } from "../../Accounting/Constants/Types";
import { SortConfig } from "../../Suppliers/constants/Types";
import { EINVOICE_STATUS_CHOICES, EINVOICE_TYPE_CHOICES,
  PAYMENT_MODE_CHOICES, SUPPLY_TYPE_CHOICES } from "../../EInvoice/constants/Options";




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
    country: string | null;
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
    buy: number;
    sell: number;
  } | undefined;

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

  tin_validated: boolean;
  tin_validated_at: string;
  buyer_type: string;

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
  id_type: typeof ID_TYPE_CHOICES[number] | null;
  id_number: string;
  preferred_currency: {
    currency_code?: string | undefined;
    currency_name: string;
    currency_symbol: string;
    country: string;
    buy: number;
    sell: number;
  } | undefined;
  gst_number: string | null;
  tax_id_type: typeof TAX_ID_CHOICES[number] | null;
  tax_number: string | null;
  tourism_number: string | null;
  expiration_date: string;
  service_tax_number: string | null;
  buyer_type: string | null;
  taxpayers_qr_code?: File | null;
  customer_bank_name: string | null;
  customer_bank_account_number: number | null;
  bank_account_type: typeof BANK_TYPE_CHOICES[number] | null;
  swift_code: string | null;
  is_active: boolean;
  status: typeof STATUS_CHOICES[number] | null;
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
  id_type: typeof ID_TYPE_CHOICES[number] | null;
  id_number: string;
  preferred_currency: {
    currency_code: string | null;
    currency_name: string | null;
    currency_symbol: string | null;
    country: string | null;
    buy: number | null;
    sell: number | null;
  } | null;
  customer_bank_name: string;
  customer_bank_account_number: string;
  bank_account_type: typeof BANK_TYPE_CHOICES[number] | null;
  swift_code: string;
  is_active: boolean;
  gst_number: string;
  tax_id_type: typeof TAX_ID_CHOICES[number] | null;
  tax_number: string;
  tourism_number: string;
  expiration_date: string;
  service_tax_number: string;
  buyer_type: string | null;
  status: typeof STATUS_CHOICES[number] | null;
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
  onValidateTIN: (customerId: number) => void;
  isValidatingTIN: boolean;
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
  net_total: number;
  debit_note_outstanding: number;
  cancelled: boolean;
  agent: string;
};


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
  initial_paid_amount: number;
  amount_owed: number;
  debit_note_details?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    taxable?: boolean;
    sst_direction?: typeof SST_DIRECTION[number];
    sst_percent?: number;
    cancelled?: boolean | null;
    einvoice_classification_code?: number | null;
    einvoice_tax_type?: typeof LHDN_TAX_TYPE_CHOICES[number]['value'] | null;
    einvoice_tax_exemption_reason?: string | null;
  }> | null;
  taxable: boolean;
  tax_percent: number | 0.00;
  net_total: number | 0.00;
  agent: string;
  currency: string | null;
  cancelled: boolean;
  einvoice_supply_type?: typeof EINVOICE_SUPPLY_TYPE_CHOICES[number];
  einvoice_payment_mode?: typeof EINVOICE_PAYMENT_MODE_CHOICES[number]['value'];
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
  initial_paid_amount: number;
  amount_owed: number;
  gross_total: number;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  net_total: number;
  debit_note_details: Array<{
    date: string;
    description: string;
    amount: number;
    taxable: boolean;
    sst_direction: typeof SST_DIRECTION[number];
    sst_percent: number;
    sst_amount: number;
    current_total: number;
    cancelled: boolean;
    einvoice_classification_code: number;
    einvoice_tax_type: string;
    einvoice_tax_exemption_reason: string;
  }>;
  aggregate_total: number;
  debit_note_outstanding: number;
  total_plus_initial: number;
  cancelled: boolean;
  lhdn_uuid: string;
  lhdn_long_uid: string;
  lhdn_submission_uid: string;
  einvoice_status: typeof EINVOICE_STATUS_CHOICES[number];
  einvoice_validation_errors: string;
  einvoice_submitted_at: string;
  einvoice_status_last_checked: string;
  einvoice_type?: typeof EINVOICE_TYPE_CHOICES[number]['value'];
  einvoice_supply_type?: typeof SUPPLY_TYPE_CHOICES[number];
  einvoice_payment_mode?: typeof PAYMENT_MODE_CHOICES[number]['value'];
  agent: string;
  created_by: string;
  updated_by: string;
  date_updated: string;
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
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
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
  einvoiceEnabled: boolean;
  onSubmitSuccess: () => void;
  onCancelSuccess: () => void;
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
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
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
  credit_note_outstanding: number;
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
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    current_total: number;
    cancelled: boolean;
    einvoice_classification_code: number;
    einvoice_tax_type: string;
    einvoice_tax_exemption_reason: string;
  }> | null;
  related_payment: string;
  related_payment_amount: string;
  account?: {
      account_code?: number | null;
      account_name?: string | null;
      account_type?: string | null;
  } | null;
  gross_total: number;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  paid_amount: number;
  aggregate_total: number;
  credit_note_outstanding: number;
  cancelled: boolean;
  agent: string;
  created_by: string;
  updated_by: string;
  date_updated: string;
  lhdn_uuid: string;
  lhdn_long_uid: string;
  lhdn_submission_uid: string;
  einvoice_status: typeof EINVOICE_STATUS_CHOICES[number];
  einvoice_validation_errors: string;
  einvoice_submitted_at: string;
  einvoice_status_last_checked: string;
  einvoice_type?: typeof EINVOICE_TYPE_CHOICES[number]['value'];
  einvoice_supply_type?: typeof SUPPLY_TYPE_CHOICES[number];
  einvoice_payment_mode?: typeof PAYMENT_MODE_CHOICES[number]['value'];
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
    taxable?: boolean;
    sst_percent?: number | 0.00;
    cancelled?: boolean | null;
    einvoice_classification_code?: number | null;
    einvoice_tax_type?: typeof LHDN_TAX_TYPE_CHOICES[number]['value'] | null;
    einvoice_tax_exemption_reason?: string | null;
  }> | null;
  taxable: boolean;
  tax_percent?: number | 0.00;
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
  einvoice_supply_type: typeof EINVOICE_SUPPLY_TYPE_CHOICES[number] | null;
  einvoice_payment_mode: typeof EINVOICE_PAYMENT_MODE_CHOICES[number]['value'] | null;
};

export type CreditNoteInputs = {
  date: string;
  customer: string;
  customer_name: string;
  credit_note_lines?: Array<{
    date?: string | null;
    description?: string | null;
    amount?: number | null;
    taxable?: boolean;
    sst_percent?: number | 0.00;
    sst_amount?: number | 0.00;
    cancelled?: boolean | null;
    einvoice_classification_code?: number | null;
    einvoice_tax_type?: typeof LHDN_TAX_TYPE_CHOICES[number]['value'] | null;
    einvoice_tax_exemption_reason?: string | null;
  }> | null;
  taxable: boolean;
  tax_percent?: number | 0.00;
  tax_amount?: number | 0.00;
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
  einvoice_supply_type: typeof EINVOICE_SUPPLY_TYPE_CHOICES[number] | null;
  einvoice_payment_mode: typeof EINVOICE_PAYMENT_MODE_CHOICES[number]['value'] | null;
};


export type CreditNoteCreateResponse = {
  credit_note_number: number;
  credit_note_outstanding: number;
  aggregate_total: number;
};

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
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
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
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
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
  einvoiceEnabled: boolean;
  onSubmitSuccess: () => void;
  onCancelSuccess: () => void;
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
  net_total: number;
  outstanding: number;
  cancelled: boolean;
  agent: string;
};


export type CustomerRefundInputs = {
  date: string;
  pay_to: number | null;
  related_credit_note: number;
  related_credit_note_outstanding: number;
  payment_account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  expected_refund: number | null;
  related_customer_refund?: Array<{
    id?: number;
    date?: string;
    refund_amount?: number;
    taxable?: boolean;
    sst_percent?: number;
    payment_type?: typeof REFUND_TYPE_OPTIONS[number];
    cancelled?: boolean;
    einvoice_classification_code?: number;
    einvoice_tax_type?: typeof LHDN_TAX_TYPE_CHOICES[number]['value'] | null;
    einvoice_tax_exemption_reason?: string;
  }>;
  taxable?: boolean;
  tax_percent?: number | null;
  agent: string;
  currency: string | null;
  einvoice_supply_type: typeof EINVOICE_SUPPLY_TYPE_CHOICES[number] | null;
  einvoice_payment_mode: typeof EINVOICE_PAYMENT_MODE_CHOICES[number]['value'] | null;
};


export type CustomerRefundEditTypes = {
  refund_number: number;
  date: string;
  pay_to: number | null;
  related_credit_note: number;
  related_credit_note_outstanding: number;
  payment_account?: {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  expected_refund: number | null;
  related_customer_refund?: Array<{
    id?: number;
    date?: string;
    refund_amount?: number;
    taxable?: boolean;
    sst_percent?: number;
    payment_type?: typeof REFUND_TYPE_OPTIONS[number];
    cancelled?: boolean;
    einvoice_classification_code?: number;
    einvoice_tax_type?: typeof LHDN_TAX_TYPE_CHOICES[number]['value'] | null;
    einvoice_tax_exemption_reason?: string;
  }>;
  taxable?: boolean;
  tax_percent?: number | null;
  agent: string;
  currency: string | null;
  einvoice_supply_type: typeof EINVOICE_SUPPLY_TYPE_CHOICES[number] | null;
  einvoice_payment_mode: typeof EINVOICE_PAYMENT_MODE_CHOICES[number]['value'] | null;
};


export type CustomerRefundDetails = {
  refund_number: number;
  date: string;
  pay_to: number;
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
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  related_customer_refund?: Array<{
    date: string;
    refund_amount: number;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    total_amount: number;
    cancelled: boolean;
    payment_type: string;
    einvoice_classification_code: number;
    einvoice_tax_type: string;
    einvoice_tax_exemption_reason: string;
  }> | null;
  net_total: number;
  outstanding: number;
  cancelled: boolean;
  lhdn_uuid: string;
  lhdn_long_uid: string;
  lhdn_submission_uid: string;
  einvoice_status: typeof EINVOICE_STATUS_CHOICES[number];
  einvoice_validation_errors: string;
  einvoice_supply_type: string;
  einvoice_payment_mode: string;
  einvoice_submitted_at: string;
  einvoice_status_last_checked: string;
  agent: string;
  currency: string;
  created_by: string;
  updated_by: string;
  date_updated: string;
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
  refund: CustomerRefundEditTypes;
  onSubmit: (data: CustomerRefundEditTypes) => void;
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
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
};

export type CustomerRefundDetailsProps = {
  refund: CustomerRefundDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (refundId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
  einvoiceEnabled: boolean;
  onSubmitSuccess: () => void;
  onCancelSuccess: () => void;
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
  lhdnClassificationCodes: lhdnClassificationCodesInterface[];
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