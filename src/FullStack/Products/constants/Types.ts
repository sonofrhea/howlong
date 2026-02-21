import React, { useState } from "react";

import { PRODUCTS_ICONS } from "./ModuleIcons";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { COSTING_METHOD_OPTIONS } from "./options";
import { SortConfig } from "../../Suppliers/constants/Types";





export interface ProductsModuleInterface {
    id: keyof typeof PRODUCTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}















// -------- BEGIN ----------- PRODUCT GROUP INPUT ----------------

export type ProductGroupList = {
  group_code: number;
  group_name: string;
  description: string;
  costing_method: typeof COSTING_METHOD_OPTIONS[number];
  sales_code: number;
  purchase_code: number;
  cash_sales_code: number;
  cash_purchase_code: number;
  sales_return_code: number;
  purchase_return_code: number;
  balance_sheet_stock: number;
};


export type ProductGroupDetails = {
  group_code: number;
  group_name: string;
  description: string;
  costing_method: string;
  sales_code: number;
  purchase_code: number;
  cash_sales_code: number;
  cash_purchase_code: number;
  sales_return_code: number;
  purchase_return_code: number;
  balance_sheet_stock: number;
  active: boolean;
  created_by: string;
  date_created: string
};


export type ProductGroupInputs = {
  group_code: number;
  group_name: string;
  description: string;
  costing_method: string;
  sales_code: number;
  purchase_code: number;
  cash_sales_code: number;
  cash_purchase_code: number;
  sales_return_code: number;
  purchase_return_code: number;
  balance_sheet_stock: number;
  active: boolean;
  date_created: number;
};

export type ProductGroupCreateResponse = {
  group_code: number;
  group_name: string;
  description: string;
};

export type AllProductGroupInputs = {
  group_code: number;
  productGroupData: ProductGroupInputs;
};

export type EditProductGroupInputs = {
  productGroupId: number;
  productGroupData: ProductGroupInputs;
};

export type ProductGroupProps = {
  productGroup: ProductGroupInputs;
  onSubmit: (data: ProductGroupInputs) => void;
  isSubmitting: boolean;
  onCancel: (productGroupId: number) => void;
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
};


export type ProductGroupFormProps = {
  onSubmit: (data: ProductGroupInputs) => void;
  isSubmitting: boolean;
  onBack?: () => void;
  onCancel: (productGroupId: number) => void;
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
};

export type ProductGroupDetailsProps = {
  productGroup: ProductGroupDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (productGroupId: number) => void;
};


export type ProductGroupTableProps = {
  productGroups: ProductGroupList[];
  onProductGroupClick: (productGroupId: number) => void;
  onEditProductGroup: (productGroupId: number, productGroup: ProductGroupList) => void;
  onDeleteProductGroup: (productGroupId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};

// -------- END ----------- PRODUCT GROUP INPUT ----------------










// -------- BEGIN ----------- PRODUCT ITEM INPUT ----------------

export type ProductItemList = {
  item_code: number;
  item_description: string;
  product_group: string;
  product_serial_number: number;
  reference_price: number;
  quantity_available: number;
  currency: string;
  supplier_name: number;
  active: boolean;
}



export type ProductItemInputs = {
  item_code: number;
  item_description: string;
  product_group: string;
  product_serial_number: number;
  product_photo?: File | null;
  base_unit_of_measure: string;
  reference_cost: number;
  reference_price: number;
  quantity_available: number;
  currency: string;
  supplier_name: number;
  active: boolean;
  additional_photos?: Array<{
    additional_photo?: File | null;
    description?: string | null;
  }> | null;
  date_created: string;
};

export type ProductItemCreateResponse = {
  item_code: number;
  item_description: string;
}

export type AllProductItemInputs = {
  item_code: number;
  productItemData: ProductItemInputs;
}

export type EditProductItemInputs = {
  productItemId: number;
  productItemData: ProductItemInputs;
}

export type ProductItemProps = {
  productItem: ProductItemInputs;
  onSubmit: (data: ProductItemInputs) => void;
  isSubmitting: boolean;
  onCancel: (productItemId: number) => void;
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  currencies: CurrencyInterface[];
  productGroups: ProductGroupCreateResponse[];
};


export type ProductItemFormProps = {
  onSubmit: (data: ProductItemInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  accounts: ControlAccountInterface[];
  agents: AgentInterface[];
  currencies: CurrencyInterface[];
  productGroups: ProductGroupCreateResponse[];
};


export type ProductItemTableProps = {
  productItems: ProductItemList[];
  onProductItemClick: (productItemId: number) => void;
  onEditProductItem: (productItemId: number, productItem: ProductItemList) => void;
  onDeleteProductItem: (productItemId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};

// -------- END ----------- PRODUCT ITEM INPUT ----------------

