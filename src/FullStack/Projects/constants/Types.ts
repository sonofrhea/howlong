import React, { useState } from "react";

import { PROJECTS_ICONS } from "./ModuleIcons";





export interface ProjectsModuleInterface {
    id: keyof typeof PROJECTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};














// -------- BEGIN ----------- PROJECT PROFILE INPUT ----------------


export interface ProjectProfileInputs {
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
  actual_end_date: string;

  duration: number;
  project_budget: number;
  actual_cost: number;
  variance: number;

  project_manager: string;
  superintendent: string;
  client_details: string;

  phases: Array<{
    phase_description: string;
    start_date: string;
    current_phase: boolean;
    end_date: string;
  }>
  created_by: string;
  date_created: string;
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
