import React, { useState } from "react";

import { CUSTOMERS_ICONS } from "./ModuleIcons";






export interface CustomersModuleInterface {
    id: keyof typeof CUSTOMERS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};