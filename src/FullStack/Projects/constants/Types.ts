import React, { useState } from "react";

import { PROJECTS_ICONS } from "./ModuleIcons";





export interface ProjectsModuleInterface {
    id: keyof typeof PROJECTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};