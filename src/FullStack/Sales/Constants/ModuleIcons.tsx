import React, { useState } from "react";


import { iconStyles } from "./Styles";

import { Banknote, Coins, PrinterCheck, 
    ScrollText, 
} from "lucide-react";









export const SALES_ICONS = {
    quotations: <ScrollText strokeWidth={1.75} className={iconStyles.small} />,
    invoice: <PrinterCheck strokeWidth={1.75} className={iconStyles.small} />,
    invoicePayments: <Banknote strokeWidth={1.75} className={iconStyles.small} />,
    customerPayment: <Coins strokeWidth={1.75} className={iconStyles.small} />,
};
