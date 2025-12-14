import React, { useState } from "react";


import { iconStyles } from "./styles";


import { BookOpenText, ShoppingCart } from "lucide-react";








export const PURCHASES_ICONS = {
    companyPurchaseInvoice: <BookOpenText strokeWidth={1.75} className={iconStyles.small} />,
    companyPurchaseOrder: <ShoppingCart strokeWidth={1.75} className={iconStyles.small} />,
};
