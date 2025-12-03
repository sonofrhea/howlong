import React, { useState } from "react";

import { REPORTS_ICONS } from "./ModuleIcons";


export interface ReportsModulesInterface {
    id: keyof typeof REPORTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};