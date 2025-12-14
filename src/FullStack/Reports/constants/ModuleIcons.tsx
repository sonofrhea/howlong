import React, { useState } from "react";


import { iconStyles } from "./Styles";


import { Bitcoin, ClipboardPlus, Landmark,
     NotepadText, Printer, Shapes 
} from "lucide-react";







export const REPORTS_ICONS = {
    generalLedger: <ClipboardPlus strokeWidth={1.75} className={iconStyles.small} />,
    trialBalance: <Shapes strokeWidth={1.75} className={iconStyles.small} />,
    incomeStatement: <NotepadText strokeWidth={1.75} className={iconStyles.small} />,
    balanceSheet: <Landmark strokeWidth={1.75} className={iconStyles.small} />,
    cashFlow: <Bitcoin strokeWidth={1.75} className={iconStyles.small} />,
    receiptRecords: <Printer strokeWidth={1.75} className={iconStyles.small} />,
};
