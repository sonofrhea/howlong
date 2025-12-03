import React, { useState } from "react";

import { PURCHASES_ICONS } from "./ModuleIcons";




export interface PurchaseModulesInterface {
    id: keyof typeof PURCHASES_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}