import { COUNTRY_OPTIONS, TAX_ID_CHOICES } from "../../Customers/constants/Options";
import { CORE_ICONS } from "./ModuleIcons";
import { BANK_TYPE_CHOICES, ROLES_OPTIONS } from "./Options";









export interface coreModuleInterface {
    id: keyof typeof CORE_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};










export interface CurrencyInterface {
  currency_code: string;
  currency_name: string;
  currency_symbol: string;
  country: string;
  buy: number;
  sell: number;
};



export interface BankInterface {
  bank_alias: string;
  bank_name: string;
  swift_code: string;
};



export interface AgentInterface {
  id: number;
  name: string;
  email: string;
};

export type Role = {
  name: typeof ROLES_OPTIONS[number]['value'] | null;
};





export type CompanyProfileDetails = {
  id: number;
  name: string;
  registration_number: string;
  industry_code: string | null;
  address: string;
  country: string;
  post_code: string;
  city: string;
  state: string;
  email: string;
  mobile_number: string;
  tin_number: string;
  tax_id_type: string;

  preferred_currency: {
    currency_code: string;
    currency_name: string;
    currency_symbol: string;
    country: string;
    buy: string;
    sell: string;
  } | undefined;

  company_bank_name: string | null;
  company_bank_account_number: string | null;
  bank_account_type: string;
  remark: string;
  company_logo: string;
  is_active: boolean;
  created_at: string;
  trial_started_at: string;
  trial_ends_at: string;
  is_paid: boolean;
  subscription_started_at: string;
  subscription_ends_at: string;

  user_set: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    date_joined: string;
    last_login: string;
  }>;
};


export type CompanyProfileInputs = {
  id: number;
  name: string;
  registration_number: string;
  industry_code: string | null;
  address: string;
  country: typeof COUNTRY_OPTIONS[number];
  post_code: string;
  city: string;
  state: string;
  email: string;
  mobile_number: string;
  tin_number: string;
  tax_id_type: typeof TAX_ID_CHOICES[number];

  preferred_currency: {
    currency_code?: string | undefined;
    currency_name: string;
    currency_symbol: string;
    country: string;
    buy: string;
    sell: string;
  } | undefined;

  company_bank_name: string | null;
  company_bank_account_number: string | null;
  bank_account_type: typeof BANK_TYPE_CHOICES[number];
  remark: string;
  company_logo: File | undefined;
  is_active: boolean;
  created_at: string;
  trial_started_at: string;
  trial_ends_at: string;
  is_paid: boolean;
  subscription_started_at: string;
  subscription_ends_at: string;

  user_set: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    date_joined: string;
    last_login: string;
  }>;
};


export type CompanyProfileDetailsProps = {
  company: CompanyProfileDetails;
  isLoading: boolean;
  onEdit: () => void;
};


export type CompanyProfileEditProps = {
  company: CompanyProfileInputs;
  onSubmit: (data: CompanyProfileInputs) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  currencies: CurrencyInterface[];
  banks: BankInterface[];
};







// ------------------------------------------------------------------------------------
          // USER

export type UserProfileInputs = {
  id: number;
  name: string | null;
  email: string;

  company: {
    name: string;
    registration_number: string;
    industry_code: string;
    country: string;
  };

  role: {
    name: string;
  };

  is_active: boolean;
  date_joined: string;
  last_login: string;
};



export type UserProfileDetails = {
  id: number;
  name: string;
  email: string;

  company: {
    name: string;
    registration_number: string;
    industry_code: string;
    country: string;
  };

  role: {
    name: string;
  };

  is_active: boolean;
  date_joined: string;
  last_login: string;
};


export type UserProfileDetailsProps = {
  userProfile: UserProfileDetails;
  isLoading: boolean;
  onEdit: () => void;
};


export type UserProfileEditProps = {
  userProfile: UserProfileInputs;
  onSubmit: (data: UserProfileInputs) => void;
  isSubmitting: boolean;
  onCancel: () => void;
};



// ------------------------------------------------------------------------------------
          // BANKS

export type BanksTableProps = {
  banks: BankInterface[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};



// ------------------------------------------------------------------------------------
          // CURRENCIES


export type CurrencyTableProps = {
  currencies: CurrencyInterface[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

