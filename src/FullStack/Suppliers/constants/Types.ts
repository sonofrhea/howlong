import React, { useState } from "react";
import { SUPPLIERS_ICONS } from "./ModuleIcons";



export interface SuppliersModulesInterface {
    id: keyof typeof SUPPLIERS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};




