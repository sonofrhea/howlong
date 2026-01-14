import React, { useState } from "react";

import { PROJECTS_ICONS } from "./ModuleIcons";
import { COST_TYPE_CHOICES_OPTIONS, COUNTRY_OPTIONS, 
  JOB_COST_LEDGER_STATUS_OPTIONS, 
  JOB_COST_LINES_STATUS_OPTIONS, PROJECT_PHASE_OPTIONS,
   PROJECT_STATUS_OPTIONS, PROJECT_TYPE_OPTIONS } from "./Options";
import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { AgentInterface } from "../../Core/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";











export type JobCostCodesInterface = {
  job_cost_code: number;
  job_cost_description: string;
}











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
  project_code: number;
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
  project_budget: number;
}

export type AllProjectProfileInputs = {
  project_code: number;
  projectData: ProjectProfileInputs;
}

export type EditProjectProfileInputs = {
  projectId: number;
  projectData: ProjectProfileInputs;
};

export type ProjectProfileProps = {
  project: ProjectProfileInputs;
  onSubmit: (data: ProjectProfileInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  customers: CustomerCreateResponse[];
  agents: AgentInterface[];
};


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
  boq_number: number;
  date: string;
  project: string;
  project_name: string;
  boq_description: string;
  boq?: Array <{
    product_item: string | null;
    additional_item: string | null;
    unit_of_measurement: string | null;
    quantity: number;
    rate_per_unit: number;
  }> | null;
  gross_estimation: number;
  contingency_rate: number;
};


export type BillOfQuantitiesResponse = {
  boq_number: number;
  project_name: string;
  net_estimation: number;
}


export type AllBillOfQuantitiesInputs = {
  boq_number: number;
  billOfQuantitiesData: BillOfQuantitiesInputs;
};

export type EditBillOfQuantities = {
  billOfQuantityId: number;
  billOfQuantitiesData: BillOfQuantitiesInputs;
}

export type BillOfQuantitiesProps = {
  billOfQuantity: BillOfQuantitiesInputs;
  onSubmit: (data: BillOfQuantitiesInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  agents: AgentInterface[];
  projects: ProjectProfileResponse[];
  products: ProductItemCreateResponse[];
};


// -------- END ----------- BILL OF QUANTITIES INPUT ------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// -------- BEGIN ----------- JOB COST LEDGER INPUT --------------------------------------

export type JobCostLedgerList = {
  job_cost_number: number;
  date: string;
  project: string;
  description: string;
  boq_estimated_amount: number;
  total_actual_cost: number;
  net_variance: number;
  status: string;
};


export type JobCostLedgerInputs = {
  job_cost_number: number;
  project: string;
  date: string;
  description: string;
  status: typeof JOB_COST_LEDGER_STATUS_OPTIONS;
  boq_estimation: string | null;
  boq_estimated_amount: number | null;
  job_cost_ledger?: Array<{
    cost_code?: {
      job_cost_code?: number | null;
      job_cost_description?: string | null;
    } | null;
    description: string | null;
    supplier: string | null;
    cost_type: typeof COST_TYPE_CHOICES_OPTIONS,
    status: typeof JOB_COST_LINES_STATUS_OPTIONS,
    cost: number | null;
    tax: number | null;
  }> | null;
  date_created: string | null;
  project_budget: string | null;
};


export type JobCostLedgerResponse = {
  job_cost_number: number;
};

export type AllJobCostLedgerInputs = {
  job_cost_number: number;
  jobCostLedgerData: JobCostLedgerInputs;
};


export type EditJobCostLedger = {
  jobCostLedgerId: number;
  jobCostLedgerData: JobCostLedgerInputs;
};


export type JobCostLedgerProps = {
  jobCostLedger: JobCostLedgerInputs;
  onSubmit: (data: JobCostLedgerInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  suppliers: SupplierProfileResponse[];
  jobCostCodes: JobCostCodesInterface[];
  billOfQuantities: BillOfQuantitiesResponse[];
  agents: AgentInterface[];
  projects: ProjectProfileInputs[];
};


// -------- END ----------- JOB COST LEDGER INPUT ------------------------------------------
