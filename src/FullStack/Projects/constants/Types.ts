import React, { useState } from "react";

import { PROJECTS_ICONS } from "./ModuleIcons";
import { COUNTRY_OPTIONS, PROJECT_PHASE_OPTIONS, PROJECT_STATUS_OPTIONS, PROJECT_TYPE_OPTIONS } from "./Options";





export interface ProjectsModuleInterface {
    id: keyof typeof PROJECTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};














// -------- BEGIN ----------- PROJECT PROFILE INPUT ----------------

export type ProjectsProfileList = {
  project_code: number;
  date: string;
  project_name: string;
  project_type: string;
  city: string;
  start_date: string;
  estimated_end_date: string;
  client_details: string;
  status: string;
}

export interface ProjectProfileInputs {
  date: string;
  project_name: string;
  project_description: string;
  project_type: keyof typeof PROJECT_TYPE_OPTIONS;
  status: keyof typeof PROJECT_STATUS_OPTIONS;

  address: string;
  country: keyof typeof COUNTRY_OPTIONS;
  city: string;
  state: string;
  zip_code: string;

  start_date: string;
  estimated_end_date: string;
  actual_end_date: string;
  duration: number;
  
  project_budget: number;
  actual_cost: number;
  variance: number;

  project_manager: string;
  superintendent: string;
  client_details: string;

  phases?: Array<{
    phase_description?: string;
    start_date?: string;
    current_phase?: keyof typeof PROJECT_PHASE_OPTIONS ;
    end_date?: string;
  }> | null; 
  created_by: string;
};

export type ProjectProfileResponse = {
  project_code: number;
  project_name: string;
}

export type AllProjectProfileInputs = {
  project_code: number;
  projectData: ProjectProfileInputs;
}

export type EditProjectProfileInputs = {
  projectId: number;
  projectData: ProjectProfileInputs;
}


// -------- END ----------- PROJECT INPUT ----------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// -------- BEGIN ----------- PROJECT DOCUMENTS INPUT --------------------------------------


export interface ProjectDocumentsInputs {
  project?: number | string;

  project_name: string;

  document_description: string;

  uploaded_by: string;

  document_lines: Array<{
    document_type: string;
    document_file: string;
    description: string;
  }>
  date_uploaded: string;
};

export interface ProjectDocumentsResponse {
  document_number: number;
}


// -------- END ----------- PROJECT DOCUMENTS -------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// -------- BEGIN ----------- BILL OF QUANTITIES INPUT --------------------------------------




// -------- END ----------- BILL OF QUANTITIES INPUT ------------------------------------------

export type BillofquantitiesList = {
  boq_number: number;
  date: string;
  project: string;
  project_name: string;
  boq_description: string;
  contingency_rate: number;
  net_estimation: number;
}

export type BillOfQuantitiesInputs = {
  date: string;
  project: string;
  project_name: string;
  boq_description: string;
  boq?: Array <{
    product_item: string | null;
    additional_item: string | null;
    unit_of_measurement: string | null;
    quantity: number | null;
    rate_per_unit: number | null;
  }> | null;
  gross_estimation: number;
  contingency_rate: number;
};


export type BillOfQuantitiesResponse = {
  boq_number: number;
}


export type AllBillOfQuantitiesInputs = {
  boq_number: number;
  billOfQuantitiesData: BillOfQuantitiesInputs;
};

export type EditBillOfQuantities = {
  billOfQuantityId: number;
  billOfQuantitiesData: BillOfQuantitiesInputs;
}
