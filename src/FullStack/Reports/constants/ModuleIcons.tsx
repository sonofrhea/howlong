import React, { useState } from "react";


import { iconStyles } from "./Styles";


import { Bitcoin, ClipboardPlus, Landmark,
     NotepadText, Printer, Shapes 
} from "lucide-react";







export const REPORTS_ICONS = {
    generalLedger: <ClipboardPlus className={iconStyles.small} />,
    trialBalance: <Shapes className={iconStyles.small} />,
    incomeStatement: <NotepadText className={iconStyles.small} />,
    balanceSheet: <Landmark className={iconStyles.small} />,
    cashFlow: <Bitcoin className={iconStyles.small} />,
    receiptRecords: <Printer className={iconStyles.small} />,
};
