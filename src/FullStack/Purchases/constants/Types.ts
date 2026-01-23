import React, { ReactNode, useState } from "react";

import { PURCHASES_ICONS } from "./ModuleIcons";

import { PURCHASE_INVOICE_STATUS, PURCHASE_ORDER_STATUS } from "./options";
import { AgentInterface } from "../../Core/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";
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

export type CompanyPurchaseInvoiceInputs = {
  purchase_invoice_number: number;
  date: string;
  supplier: string;
  supplier_name: string;
  address: string;
  description: string;
  status: typeof PURCHASE_INVOICE_STATUS[number]['value'] | null;
  agent: string;
  related_invoice?: Array <{
    product_item?: string | null;
    description?: string | null;
    quantity?: number | null;
    base_unit_of_measure?: string | null;
    price?: number | null;
    tax_inclusive?: boolean;
    tax?: number | null;
    cancelled?: boolean;
  }> | null;
  tax_inclusive: boolean;
  tax: number;
  cancelled: boolean;
};

export type CompanyPurchaseInvoiceResponse = {
  purchase_invoice_number: number;
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
  onCancel?: () => void;
  agents: AgentInterface[];
  products: ProductItemCreateResponse[];
  suppliers: SupplierProfileResponse[];
};


// -------- END ----------- COMPANY PURCHASE INVOICE INPUT ----------------








// -------- BEGIN ----------- COMPANY PURCHASE ORDER INPUT ----------------

export type CompanyPurchaseOrderList = {
  purchase_order_number: number;
  date: string;
  supplier_name: string;
  invoice_total: number;
  net_total_paid: number;
  outstanding_amount: number;
  status: string;
  cancelled: boolean;
}

export type CompanyPurchaseOrderInputs = {
  purchase_order_number: number;
  date: string;
  supplier: string;
  supplier_name: string;
  account? : {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  address: string;
  related_invoice: string;
  related_invoice_total: number;
  invoice_total: number;
  description: string;
  payment_receipt: File | null;
  related_purchase: Array <{
    payment_date: string;
    total_paid: number;
    tax_inclusive: boolean;
    tax_amount: number;
    cancelled: boolean;
  }>
  status: typeof PURCHASE_ORDER_STATUS[number]['value'] | null;
  agent: string;
  cancelled: boolean;
  tax_inclusive: boolean;
  tax_amount: number;
};

export type CompanyPurchaseOrderDetails = {
  purchase_order_number: number;
  date: string;
  supplier: string;
  supplier_name: string;
  account? : {
    account_code?: number | null;
    account_name?: string | null;
    account_type?: string | null;
  } | null;
  address: string;
  related_invoice: string;
  description: string;
  payment_receipt: File;
  invoice_total: number;
  gross_paid: number;
  tax_inclusive: boolean;
  tax_amount: number;
  related_purchase: Array<{
    payment_date: string;
    total_paid: number;
    tax_inclusive: boolean;
    tax_amount: number;
    cancelled: boolean;
    sub_total: number;
}>
  net_total_paid: number;
  outstanding_amount: number;
  cancelled: boolean;
  status: string;
  agent: string;
  created_by: string;
};


export type CompanyPurchaseOrderResponse = {
  purchase_order_number: number;
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
  onCancel?: () => void;
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


// -------- END ----------- COMPANY PURCHASE ORDER INPUT ----------------




