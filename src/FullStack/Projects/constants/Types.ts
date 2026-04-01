import React, { useState } from "react";

import { PROJECTS_ICONS } from "./ModuleIcons";
import { BILL_OF_QUANTITIES_OPTIONS, COST_TYPE_CHOICES_OPTIONS, COUNTRY_OPTIONS, 
  JOB_COST_LEDGER_STATUS_OPTIONS, 
  JOB_COST_LINES_STATUS_OPTIONS, PROJECT_PHASE_OPTIONS,
   PROJECT_STATUS_OPTIONS, PROJECT_TYPE_OPTIONS } from "./Options";
import { CustomerCreateResponse, CustomerInputs } from "../../Customers/constants/Types";
import { AgentInterface, BankInterface, CurrencyInterface } from "../../Core/constants/Types";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { SortConfig, SupplierProfileResponse } from "../../Suppliers/constants/Types";











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
  formatted_number: string;
  date: string;
  project_name: string;
  project_type: string;
  client_details: string;
    phases: Array<{
    phase_description: string;
    start_date: string;
    current_phase: typeof PROJECT_PHASE_OPTIONS[number];
    end_date: string;
  }>;
  city: string;
  start_date: string;
  estimated_end_date: string;
  status: string;
};


export type ProjectsProfileDetails = {
  project_code: number;
  formatted_number: string;
  date: string;
  project_name: string;
  project_description: string;
  project_type: string;
  status: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip_code: string;

  start_date: string;
  estimated_end_date: string;
  actual_end_date: string | null;

  duration: number;
  days_elapsed: number;
  early_completion: boolean;
  project_budget: string;
  actual_cost: string;
  variance: string;

  final_budget: string;

  project_manager: string;
  superintendent: string;
  project_client_name: string;

  phases: Array<{
    phase_description: string;
    start_date: string;
    current_phase: string;
    end_date: string | null;
  }>;

  created_by: string;
  date_created: string;
  updated_by: string;
  date_updated: string;
  version: number;
  company: string;
};


export type ProjectProfileInputs = {
  project_code: number;
  formatted_number?: string;
  date?: string;
  project_name?: string;
  project_description?: string;
  project_type?: typeof PROJECT_TYPE_OPTIONS[number];
  status?: typeof PROJECT_STATUS_OPTIONS[number];

  address?: string;
  country?: typeof COUNTRY_OPTIONS[number];
  city?: string;
  state?: string;
  zip_code?: string;

  start_date?: string;
  estimated_end_date?: string;
  actual_end_date?: string;
  duration?: number;
  
  project_budget?: number;
  actual_cost?: number;
  variance?: number;

  project_manager?: string;
  superintendent?: string;
  client_details?: string;

  phases?: Array<{
    id?: number;
    phase_description?: string;
    start_date?: string;
    current_phase?: typeof PROJECT_PHASE_OPTIONS[number];
    end_date?: string;
  }>; 
  created_by: string;
};

export type ProjectProfileResponse = {
  project_code?: number;
  project_name?: string;
  project_budget?: number;
  formatted_number?: string;
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
  onCancel: (projectId: number) => void;
  customers: CustomerCreateResponse[];
  agents: AgentInterface[];
};


export type ProjectProfileDetailsProps = {
  project: ProjectsProfileDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (customerId: number) => void;
};


export type ProjectProfileFormProps = {
  onSubmit: (data: ProjectProfileInputs) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  customers: CustomerCreateResponse[];
  agents: AgentInterface[];
  banks: BankInterface[];
  currencies: CurrencyInterface[];
  onCreateCustomer: (data: CustomerInputs) => void;
  isCreatingCustomer: boolean;
};


export type ProjectProfileTableProps = {
  projects: ProjectsProfileList[];
  onProjectClick: (projectId: number) => void;
  onEditProjectsProfile: (projectId: number, project: ProjectsProfileList) => void;
  onDeleteProjectsProfile: (projectId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
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
  formatted_number?: string;

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
  formatted_number: string;
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


export type BillOfquantitiesList = {
  boq_number: number;
  formatted_number: string;
  date: string;
  project: ProjectProfileResponse;
  project_name: string;
  status: string;
  boq_description: string;
  gross_estimation: number;
  contingency_percentage: number;
  net_estimation: number;
};


export type BillOfQuantitiesDetails = {
  boq_number: number;
  formatted_number: string;
  date: string;
  project: ProjectProfileResponse;
  project_name: string;
  status: string;
  boq_description: string;

  boq: Array<{
    product_item: ProductItemCreateResponse;
    product_item_name: string;
    additional_item: string;
    unit_of_measurement: string;
    quantity: string;
    rate_per_unit: string;
    estimated_amount: string;
  }>;

  gross_estimation: string;
  contingency_included: boolean;
  contingency_percentage: string;
  net_estimation: string;

  created_by: string;
  date_created: string;
  updated_by: string;
  date_updated: string;

  company: string;
};


export type BillOfQuantitiesInputs = {
  boq_number: number;
  formatted_number?: string;
  date?: string;
  project?: string;
  project_name?: string;
  status?: typeof BILL_OF_QUANTITIES_OPTIONS[number];
  boq_description?: string;
  boq?: Array <{
    id?: number;
    product_item?: number;
    additional_item?: string;
    unit_of_measurement?: string;
    quantity?: number;
    rate_per_unit?: number;
  }>;
  gross_estimation?: number;
  contingency_included?: boolean;
  contingency_percentage?: number;
};


export type BillOfQuantitiesResponse = {
  boq_number: number;
  project_name: string;
  gross_estimation: number;
  contingency_rate: number;
  net_estimation: number;
  formatted_number: string;
};


export type BillOfQuantitiesLineResponse = {
  id: number;
  product_item: number;
  product_item_name: string;
  additional_item: string;
  unit_of_measurement: string;
  quantity: number;
  rate_per_unit: number;
  estimated_amount: number;
};


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
  onCancel: (billOfQuantityId: number) => void;
  agents: AgentInterface[];
  projects: ProjectProfileResponse[];
  products: ProductItemCreateResponse[];
};


export type BillOfQuantitiesTableProps = {
  billOfQuantities: BillOfquantitiesList[];
  onBillOfQuantityClick: (billOfQuantityId: number) => void;
  onEditBillOfQuantity: (billOfQuantityId: number, billOfQuantity: BillOfquantitiesList) => void;
  onDeleteBillOfQuantity: (billOfQuantityId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};



export type BillOfQuantitiesDetailsProps = {
  billOfQuantity: BillOfQuantitiesDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (billOfQuantityId: number) => void;
};


export type BillOfQuantitiesFormProps = {
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
  formatted_number: string;
  date: string;
  project: ProjectProfileResponse;
  project_name: string;
  description: string;
  boq_estimated_amount: number;
  total_actual_cost: number;
  net_variance: number;
  status: string;
};


export type JobCostLedgerDetails = {
  job_cost_number: number;
  formatted_number: string;
  project: ProjectProfileResponse;
  project_name: ProjectProfileResponse;
  project_budget: ProjectProfileResponse;
  date: string;
  description: string;
  status: string;

  job_cost_ledger_lines: Array<{
    boq_line: number;
    cost_code: {
      job_cost_code: number;
      job_cost_description: string;
    };
    supplier: SupplierProfileResponse;
    boq_line_item: string;
    description: string;
    cost_type: string;
    status: string;
    cost: string;
    taxable: boolean;
    sst_percent: number;
    sst_amount: number;
    total_cost: string;
    total_paid: string;
    estimated: string;
    variance: string;
    cancelled: boolean;
  }>;

  boq: BillOfQuantitiesResponse;
  boq_estimated_amount: string;
  total_actual_cost: string;

  created_by: string;
  net_variance: string;

  date_created: string;
  date_updated: string;
  updated_by: string;

  company: string;
};



export type JobCostLedgerInputs = {
  job_cost_number: number;
  formatted_number?: string;
  project?: number;
  project_name?: string;
  date?: string;
  description?: string;
  status?: typeof JOB_COST_LEDGER_STATUS_OPTIONS[number];
  boq?: number;
  boq_estimated_amount?: number;
  job_cost_ledger_lines?: Array<{
    id?: number;
    boq_line?: number;
    boq_additional?: string;
    cost_code?: {
      job_cost_code?: number;
      job_cost_description?: string;
    };
    description?: string;
    supplier?: string;
    cost_type?: typeof COST_TYPE_CHOICES_OPTIONS[number];
    status?: typeof JOB_COST_LINES_STATUS_OPTIONS[number];
    cost?: number;
    taxable?: boolean;
    sst_percent?: number;
    cancelled?: boolean;
  }>;
  total_actual_cost?: string;
  net_variance?: string;
  date_created?: string;
  project_budget?: string;
};


export type JobCostLedgerResponse = {
  job_cost_number: number;
  formatted_number: string;
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
  onCancel: (jobCostLedgerId: number) => void;
  suppliers: SupplierProfileResponse[];
  jobCostCodes: JobCostCodesInterface[];
  billOfQuantities: BillOfQuantitiesResponse[];
  agents: AgentInterface[];
  projects: ProjectProfileInputs[];
  boqLines: BillOfQuantitiesLineResponse[];
  setSelectedBoqId: (boq: number) => void;
};



export type JobCostLedgerDetailsProps = {
  jobCostLedger: JobCostLedgerDetails;
  isLoading: boolean;
  onBack?: () => void;
  onEdit: (jobCostLedgerId: number) => void;
};


export type JobCostLedgerFormProps = {
  onSubmit: (data: JobCostLedgerInputs) => void;
  isSubmitting: boolean;
  onCancel: (jobCostLedgerId: number) => void;
  suppliers: SupplierProfileResponse[];
  jobCostCodes: JobCostCodesInterface[];
  billOfQuantities: BillOfQuantitiesResponse[];
  agents: AgentInterface[];
  projects: ProjectProfileInputs[];
  boqLines: BillOfQuantitiesLineResponse[];
  setSelectedBoqId: (boq: number) => void;
};


export type JobCostLedgerListProps = {
  jobCostLedgers: JobCostLedgerList[];
  onJobCostLedgerClick: (jobCostLedgerId: number) => void;
  onEditJobCostLedger: (jobCostLedgerId: number, jobCostLedger: JobCostLedgerList) => void;
  onDeleteJobCostLedger: (jobCostLedgerId: number) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: string) => void;
};


// -------- END ----------- JOB COST LEDGER INPUT ------------------------------------------
