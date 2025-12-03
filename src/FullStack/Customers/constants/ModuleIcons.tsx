import React, { useState } from "react";


import { iconStyles } from "./Styles";

import { HandCoins, ReceiptJapaneseYen,
     ReceiptTurkishLira,
     Users,
 } from "lucide-react";








export const CUSTOMERS_ICONS = {
    customerslist: <Users size={40} strokeWidth={0.75} className={iconStyles.small} />,
    customersDebitNote: <ReceiptJapaneseYen size={40} strokeWidth={0.75} className={iconStyles.small} />,
    customersCreditNote: <ReceiptTurkishLira size={40} strokeWidth={0.75} className={iconStyles.small} />,
    customersRefund: <HandCoins size={40} strokeWidth={0.75} className={iconStyles.small} />,
};