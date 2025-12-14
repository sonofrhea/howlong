import React, { useState } from "react";


import { iconStyles } from "./Styles"; 

import { UserRoundPen, ListPlus,
    TicketCheck, HandCoins,
    BanknoteArrowDown, BanknoteArrowUp,
    Users
 } from "lucide-react";




export const SUPPLIERS_ICONS = {
    suppliersCategory: <Users size={40} strokeWidth={1.75} className={iconStyles.small} />,
    suppliersProfile: <UserRoundPen size={40} strokeWidth={1.75} className={iconStyles.small} />,
    suppliersInvoice: <TicketCheck size={40} strokeWidth={1.75} className={iconStyles.small} />,
    suppliersPayment: <HandCoins size={40} strokeWidth={1.75} className={iconStyles.small} />,
    suppliersDebitNote: <BanknoteArrowDown size={40} strokeWidth={1.75} className={iconStyles.small} />,
    suppliersCreditNote: <BanknoteArrowUp size={40} strokeWidth={1.75} className={iconStyles.small} />,
};
