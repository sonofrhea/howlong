import React, { useState } from "react";
import { ACCOUNTING_ICONS } from "./ModuleIcons";








export interface AccountingModuleInterface {
    id: keyof typeof ACCOUNTING_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}
