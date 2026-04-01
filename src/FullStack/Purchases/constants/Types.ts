import React, { ReactNode, useState } from "react";

import { PURCHASES_ICONS } from "./ModuleIcons";

import { PURCHASE_INVOICE_STATUS, PURCHASE_ORDER_STATUS } from "./options";
import { AgentInterface } from "../../Core/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { SortConfig, SupplierProfileResponse } from "../../Suppliers/constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { JournalHeaderInputs } from "../../Accounting/Constants/Types";


export interface PurchaseModulesInterface {
    id: keyof typeof PURCHASES_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}



















// -------- BEGIN ----------- COMPANY PURCHASE INVOICE INPUT ----------------

export type CompanyPurchaseInvoiceList = {
  purchase_invoice_number: number;
  formatted_number: string;
  date: string;
  supplier_name: string;
  address: string;
  description: string;
  status: string;
  net_total: string;
  cancelled: boolean;
};


export type CompanyPurchaseInvoiceDetails = {
  purchase_invoice_number: number;
  formatted_number: string;
  date: string;
  supplier: number;
  supplier_name: string;
  address: string;
  description: string;
  status: string;

  gross_total: string;
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  net_total: string;

  agent: string;
  cancelled: boolean;

  related_invoice: Array<{
    product_item_name: string;
    description: string;
    quantity: string;
    base_unit_of_measure: string;
    price: string;
    total: string;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    sub_total: number;
    cancelled: boolean;
  }>;

  created_by: string;
  date_updated: string;
  updated_by: string;
  company: string;
};

export type CompanyPurchaseInvoiceInputs = {
  purchase_invoice_number: number;
  formatted_number: string;
  date?: string;
  supplier?: number;
  supplier_name?: string;
  address?: string;
  description?: string;
  status?: typeof PURCHASE_INVOICE_STATUS[number];
  agent?: string;
  related_invoice?: Array <{
    product_item?: string;
    description?: string;
    quantity?: number;
    base_unit_of_measure?: string;
    price?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled?: boolean;
  }>;
  taxable?: boolean;
  tax_percent?: number;
  cancelled?: boolean;
};

export type CompanyPurchaseInvoiceResponse = {
  purchase_invoice_number: number;
  formatted_number: string;
  net_total: number;
};

export type AllCompanyPurchaseInvoiceInputs = {
  purchase_invoice_number: number;
  companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs;
};

export type EditCompanyPurchaseInvoiceInputs = {
  companyPurchaseInvoiceId: number;
  companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs;
};

export type CompanyPurchaseInvoiceProps = {
  companyPurchaseInvoice: CompanyPurchaseInvoiceInputs;
  onSubmit: (data: CompanyPurchaseInvoiceInputs) => void;
  isSubmitting: boolean;
  onCancel: (companyPurchaseInvoiceId: number) => void;
  agents: AgentInterface[];
  products: ProductItemCreateResponse[];
  suppliers: SupplierProfileResponse[];
};


export type CompanyPurchaseInvoiceTableProps = {
  companyPurchaseInvoices: CompanyPurchaseInvoiceList[];
  onCompanyPurchaseInvoiceClick: (companyPurchaseInvoiceId: number) => void;
  onEditCompanyPurchaseInvoice: (companyPurchaseInvoiceId: number, companyPurchaseInvoice: CompanyPurchaseInvoiceList) => void;
  onDeleteCompanyPurchaseInvoice: (companyPurchaseInvoiceId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};


export type CompanyPurchaseInvoiceDetailsProps = {
  companyPurchaseInvoice: CompanyPurchaseInvoiceDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (companyPurchaseInvoiceId: number) => void;
};


export type CompanyPurchaseInvoiceFormProps = {
  onSubmit: (data: CompanyPurchaseInvoiceInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  agents: AgentInterface[];
  products: ProductItemCreateResponse[];
  suppliers: SupplierProfileResponse[];
};


// -------- END ----------- COMPANY PURCHASE INVOICE INPUT ----------------








// -------- BEGIN ----------- COMPANY PURCHASE ORDER INPUT ----------------

export type CompanyPurchaseOrderList = {
  purchase_order_number: number;
  formatted_number: string;
  date: string;
  supplier_name: string;
  invoice_total: number;
  related_invoice_total: number;
  net_total_paid: number;
  outstanding_amount: number;
  status: string;
  cancelled: boolean;
}

export type CompanyPurchaseOrderInputs = {
  purchase_order_number: number;
  formatted_number: string;
  date: string;
  supplier: string;
  supplier_name: string;
  account? : {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
  address?: string;
  related_invoice?: string;
  related_invoice_total?: number;
  invoice_total?: number;
  description?: string;
  related_purchase?: Array <{
    payment_date?: string;
    total_paid?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled?: boolean;
  }>;
  status?: typeof PURCHASE_ORDER_STATUS[number];
  agent?: string;
  cancelled?: boolean;
  taxable?: boolean;
  tax_percent?: number;
};

export type CompanyPurchaseOrderDetails = {
  purchase_order_number: number;
  formatted_number: string;
  date: string;
  supplier: string;
  supplier_name: string;
  account : {
    account_code?: number;
    account_name?: string;
    account_type?: string;
  };
  address: string;
  related_invoice: CompanyPurchaseInvoiceResponse;
  description: string;
  invoice_total: number;
  related_invoice_total: number;
  gross_paid: number;
  related_purchase: Array<{
    payment_date: string;
    total_paid: number;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    cancelled: boolean;
    sub_total: number;
}>
  taxable: boolean;
  tax_percent: number;
  tax_amount: number;
  net_total_paid: number;
  outstanding_amount: number;
  cancelled: boolean;
  status: string;
  agent: string;
  created_by: string;
  date_updated: string;
  updated_by: string;
  date_created: string;
};


export type CompanyPurchaseOrderResponse = {
  purchase_order_number: number;
  formatted_number: string;
};


export type AllCompanyPurchaseOrderInputs = {
  purchase_order_number: number;
  companyPurchaseOrderData: CompanyPurchaseOrderInputs;
};

export type EditCompanyPurchaseOrderInputs = {
  CompanyPurchaseOrderId: number;
  companyPurchaseOrderData: CompanyPurchaseOrderInputs;
};

export type CompanyPurchaseOrderProps = {
  companyPurchaseOrder: CompanyPurchaseOrderInputs;
  onSubmit: (data: CompanyPurchaseOrderInputs) => void;
  isSubmitting: boolean;
  onCancel: (CompanyPurchaseOrderId: number) => void;
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  supplierProfiles: SupplierProfileResponse[];
  purchaseInvoices: CompanyPurchaseInvoiceResponse[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type CompanyPurchaseOrderDetailsProps = {
  companyPurchaseOrder: CompanyPurchaseOrderDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (CompanyPurchaseOrderId: number) => void;
  accounts: ControlAccountInterface[];
  onCreateJournalEntry: (data: JournalHeaderInputs) => void;
  isCreatingJournalEntry: boolean;
};


export type CompanyPurchaseOrderFormProps = {
  onSubmit: (data: CompanyPurchaseOrderInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  supplierProfiles: SupplierProfileResponse[];
  purchaseInvoices: CompanyPurchaseInvoiceResponse[];
};



export type CompanyPurchaseOrderTableProps = {
  companyPurchaseOrders: CompanyPurchaseOrderList[];
  onCompanyPurchaseOrderClick: (CompanyPurchaseOrderId: number) => void;
  onEditCompanyPurchaseOrder: (CompanyPurchaseOrderId: number, companyPurchaseOrder: CompanyPurchaseOrderList) => void;
  onDeleteCompanyPurchaseOrder: (CompanyPurchaseOrderId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};


// -------- END ----------- COMPANY PURCHASE ORDER INPUT ----------------




