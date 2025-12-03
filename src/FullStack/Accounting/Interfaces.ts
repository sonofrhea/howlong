
import { ID_TYPE_CHOICES,
  TAX_ID_CHOICES,
  BANK_TYPE_CHOICES,
  STATUS_CHOICES
 } from "./Constants/options";


















// GENERAL




export interface ProductGroupInterface {
  group_code: number;
  group_name: string;
};

export interface ProductItemInterface {
  item_code: number;
  item_description: string;
};

export interface QuotationInterface {
  quotation_number: number;
};

export interface CustomerInterface {
  customer_number: number;
  customer_name: string;
};

export interface ProjectInterface {
  project_code: number;
  project_name: string;
};







// -------- BEGIN ----------- CUSTOMER INPUT ----------------

export type CustomerInputs = {
  customer_name: string;
  company_name: string;
  control_account: {
    account_code: number;
    account_name: string;
    account_type: string;
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
  id_type: typeof ID_TYPE_CHOICES[number]['value'] | null;
  id_file: File | null;
  preferred_currency: {
    currency_code: string;
    currency_name: string;
    currency_symbol: string;
    country: string;
    buy: number;
    sell: number;
  };
  gst_number: string;
  tax_id_type: typeof TAX_ID_CHOICES[number]['value'] | null;
  tax_number: string;
  tourism_number: string;
  expiration_date: string;
  service_tax_number: string;
  taxpayers_qr_code: File | null;
  customer_bank_name: string;
  customer_bank_account_number: number;
  bank_account_type: typeof BANK_TYPE_CHOICES[number]['value'] | null;
  swift_code: string;
  is_active: boolean;
  status: typeof STATUS_CHOICES[number]['value'] | null;
  remark: string;
  date_created: string;
};

export type CustomerCreateResponse = {
  customer_number: number;
};

export type allCustomerInputs = {
    customer_number: CustomerCreateResponse;
    customerData: CustomerInputs;
}; 

// -------- END ----------- CUSTOMER INPUT ----------------
