import React, { useState } from "react";


import { iconStyles } from "./Styles";

import { Banknote, Coins, PrinterCheck, 
    ScrollText, 
} from "lucide-react";









export const SALES_ICONS = {
    quotations: <ScrollText className={iconStyles.small} />,
    invoice: <PrinterCheck className={iconStyles.small} />,
    invoicePayments: <Banknote className={iconStyles.small} />,
    customerPayment: <Coins className={iconStyles.small} />,
};
