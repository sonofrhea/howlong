import React, { useState } from "react";


import { iconStyles } from "./Styles";


import { FileText, Table, Table2, TrafficCone,

 } from "lucide-react";









export const PROJECTS_ICONS = {
    projects: <TrafficCone size={40} strokeWidth={1.75} className={iconStyles.small} />,
    projectDocuments: <FileText size={40} strokeWidth={1.75} className={iconStyles.small} />,
    jobCostLedger: <Table size={40} strokeWidth={1.75} className={iconStyles.small} />,
    billOfQuantities: <Table2 size={40} strokeWidth={1.75} className={iconStyles.small} />
};