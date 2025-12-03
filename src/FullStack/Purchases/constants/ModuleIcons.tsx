import React, { useState } from "react";


import { iconStyles } from "./styles";


import { BookOpenText, ShoppingCart } from "lucide-react";








export const PURCHASES_ICONS = {
    companyPurchaseInvoice: <BookOpenText className={iconStyles.small} />,
    companyPurchaseOrder: <ShoppingCart className={iconStyles.small} />,
};
