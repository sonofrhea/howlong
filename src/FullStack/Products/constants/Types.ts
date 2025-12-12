import React, { useState } from "react";

import { PRODUCTS_ICONS } from "./ModuleIcons";





export interface ProductsModuleInterface {
    id: keyof typeof PRODUCTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}















// -------- BEGIN ----------- PRODUCT GROUP INPUT ----------------

export type ProductGroupInputs = {
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
};

export type AllProductGroupInputs = {
  group_code: number;
  productGroupData: ProductGroupInputs;
};

export type EditProductGroupInputs = {
  productGroupId: number;
  productGroupData: ProductGroupInputs;
}

// -------- END ----------- PRODUCT GROUP INPUT ----------------










// -------- BEGIN ----------- PRODUCT ITEM INPUT ----------------

export type ProductItemInputs = {
  item_description: string;
  product_group: string;
  product_serial_number: number;
  product_photo: File | null;
  base_unit_of_measure: string;
  reference_cost: number;
  reference_price: number;
  quantity_available: number;
  supplier_name: number;
  active: boolean;
  additional_photos: Array<{
    additional_photo: File | null;
    description: string;
  }>
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

// -------- END ----------- PRODUCT ITEM INPUT ----------------

