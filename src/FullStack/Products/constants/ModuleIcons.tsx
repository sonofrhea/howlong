import React, { useState } from "react";

import { iconStyles } from "./Styles";

import { PackageSearch, SquareChartGantt } from "lucide-react";







export const PRODUCTS_ICONS = {
    productGroupsList: <SquareChartGantt size={40} strokeWidth={1.75} className={iconStyles.small} />,
    productItem: <PackageSearch size={40} strokeWidth={1.75} className={iconStyles.small} />,
};
