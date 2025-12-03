import React, { useState } from "react";

import { PRODUCTS_ICONS } from "./ModuleIcons";





export interface ProductsModuleInterface {
    id: keyof typeof PRODUCTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}
