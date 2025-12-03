import React, { useState } from "react";
import { SALES_ICONS } from "./ModuleIcons";




export interface SalesModulesInterface {
    id: keyof typeof SALES_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};