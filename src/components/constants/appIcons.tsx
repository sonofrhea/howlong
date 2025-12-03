import React, { useState } from "react";


import { Users, PackageOpen,
    ChartColumnIncreasing, Hotel,
    Landmark, Pickaxe,
    ShoppingCart, SquarePen, Cpu
 } from "lucide-react";

 import { iconStyles } from "./classStyles";


export const APP_ICONS = {
    customers: <Users className={iconStyles.small} />,
    products: <PackageOpen className={iconStyles.small}/>,
    sales: <ChartColumnIncreasing className={iconStyles.small}/>,
    suppliers: <Hotel className={iconStyles.small}/>,
    accounting: <Landmark className={iconStyles.small}/>,
    projects: <Pickaxe className={iconStyles.small}/>,
    purchases: <ShoppingCart className={iconStyles.small}/>,
    reports: <SquarePen className={iconStyles.small}/>,
    core: <Cpu className={iconStyles.small}/>,
};
