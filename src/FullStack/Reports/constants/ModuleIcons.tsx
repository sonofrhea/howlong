import React, { useState } from "react";


import { iconStyles } from "./Styles";


import { BanknoteX, Bitcoin, ClipboardPlus, Landmark,
     NotepadText, Printer, Shapes 
} from "lucide-react";







export const REPORTS_ICONS = {
    generalLedger: <ClipboardPlus strokeWidth={1.75} className={iconStyles.small} />,
    trialBalance: <Shapes strokeWidth={1.75} className={iconStyles.small} />,
    incomeStatement: <NotepadText strokeWidth={1.75} className={iconStyles.small} />,
    balanceSheet: <Landmark strokeWidth={1.75} className={iconStyles.small} />,
    cashFlow: <Bitcoin strokeWidth={1.75} className={iconStyles.small} />,
    receiptRecords: <Printer strokeWidth={1.75} className={iconStyles.small} />,
    overdueReceivables: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>,
};
