import React, { useState } from "react";

import { iconStyles } from "./Styles";

import { ArrowLeftRight, Bitcoin, 
    CirclePoundSterling, Landmark,
     Notebook,
     ReceiptSwissFranc, 
 } from "lucide-react";









export const ACCOUNTING_ICONS = {
    journal: <Notebook size={40} strokeWidth={0.75} className={iconStyles.small} />,
    incomeAndExpenses: <ArrowLeftRight size={40} strokeWidth={0.75} className={iconStyles.small} />,
    cashbook: <CirclePoundSterling size={40} strokeWidth={0.75} className={iconStyles.small} />,
    paymentVoucher: <Bitcoin size={40} strokeWidth={0.75} className={iconStyles.small} />,
    receiptVoucher: <ReceiptSwissFranc size={40} strokeWidth={0.75} className={iconStyles.small} />,
    bankStatement: <Landmark size={40} strokeWidth={0.75} className={iconStyles.small} />,
};
