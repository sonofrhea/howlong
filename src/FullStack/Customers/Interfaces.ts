
import { ID_TYPE_CHOICES,
  TAX_ID_CHOICES,
  BANK_TYPE_CHOICES,
  STATUS_CHOICES
 } from "../Customers/CustomerProfile/constants/Options";
















// -------- BEGIN ----------- CUSTOMER INPUT ----------------

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
};

export type CustomerCreateResponse = {
  customer_number: number;
};

export type AllCustomerInputs = {
    customer_number: number;
    customerData: CustomerInputs;
};

export type EditCustomerInputs = {
    customerId: number;
    customerData: CustomerInputs;
};

// -------- END ----------- CUSTOMER INPUT ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------CUSTOMER DEBIT NOTE----------------
