import React, { useState } from "react";


import { Users, PackageOpen,
    ChartColumnIncreasing, Hotel,
    Landmark, Pickaxe,
    ShoppingCart, SquarePen, Cpu
 } from "lucide-react";

 import { iconStyles } from "./classStyles";


export const APP_ICONS = {
    customers: <Users strokeWidth={1.75} className={iconStyles.small} />,
    products: <PackageOpen strokeWidth={1.75} className={iconStyles.small}/>,
    sales: <ChartColumnIncreasing strokeWidth={1.75} className={iconStyles.small}/>,
    suppliers: <Hotel strokeWidth={1.75} className={iconStyles.small}/>,
    accounting: <Landmark strokeWidth={1.75} className={iconStyles.small}/>,
    projects: <Pickaxe strokeWidth={1.75} className={iconStyles.small}/>,
    purchases: <ShoppingCart strokeWidth={1.75} className={iconStyles.small}/>,
    reports: <SquarePen strokeWidth={1.75} className={iconStyles.small}/>,
    core: <Cpu strokeWidth={1.75} className={iconStyles.small}/>,
};
