import React, { useState } from "react";

import { PURCHASES_ICONS } from "./ModuleIcons";




export interface PurchaseModulesInterface {
    id: keyof typeof PURCHASES_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}



















// -------- BEGIN ----------- COMPANY PURCHASE INVOICE INPUT ----------------

export type CompanyPurchaseInvoiceInputs = {
  date: string;
  supplier: string;
  supplier_name: string;
  address: string;
  description: string;
  status: string;
  agent: string;
  related_invoice: Array <{
    product_item: string;
    description: string;
    quantity: number;
    base_unit_of_measure: string;
    price: number;
    tax_inclusive: boolean;
    tax: number;
    cancelled: boolean;
  }>;
  tax_inclusive: boolean;
  tax: number;
  cancelled: boolean;
};

export type CompanyPurchaseInvoiceResponse = {
  purchase_invoice_number: number | string;
};

export type AllCompanyPurchaseInvoiceInputs = {
  purchase_invoice_number: number | string;
  companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs;
};

export type EditCompanyPurchaseInvoiceInputs = {
  companyPurchaseInvoiceId: number | string;
  companyPurchaseInvoiceData: CompanyPurchaseInvoiceInputs;
}


// -------- END ----------- COMPANY PURCHASE INVOICE INPUT ----------------








// -------- BEGIN ----------- COMPANY PURCHASE ORDER INPUT ----------------

export type CompanyPurchaseOrderInputs = {
  date: string;
  supplier: string;
  account : {
    account_code: number;
    account_name: string;
    account_type: string;
  };
  address: string;
  related_invoice: string;
  related_invoice_total: number;
  description: string;
  related_purchase: Array <{
    payment_date: string;
    total_paid: number;
    tax_inclusive: boolean;
    tax: number;
    cancelled: boolean;
  }>
  status: string;
  agent: string;
  cancelled: boolean;
  tax_inclusive: boolean;
  tax: number;
};


export type CompanyPurchaseOrderResponse = {
  purchase_order_number: number | string;
};


export type AllCompanyPurchaseOrderInputs = {
  purchase_order_number: number | string;
  companyPurchaseOrderData: CompanyPurchaseOrderInputs;
};

export type EditCompanyPurchaseOrderInputs = {
  CompanyPurchaseOrderId: number | string;
  companyPurchaseOrderData: CompanyPurchaseOrderInputs;
}


// -------- END ----------- COMPANY PURCHASE ORDER INPUT ----------------




