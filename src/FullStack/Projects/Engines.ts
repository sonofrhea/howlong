import apiClient from '../../BaseEngine';

import { ProjectProfileInputs,
    AllProjectProfileInputs, EditProjectProfileInputs
 } from './Interfaces';



apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});















// --------------------------------------------------------------------------------------------------------
            // PROJECTS PROFILE


export const fetchProjects = async () => {
    const response = await apiClient.get('/projects/project/');
    return response.data;
};

export const fetchProjectById = async (project_code: number) => {
    const response = await apiClient.get(`/projects/project/${project_code}/`);
    return response.data;
};

export const createProject = async (projectData: ProjectProfileInputs) => {
    const response = await apiClient.post('/projects/project/', projectData);
    return response.data;
};

export const updateProject = async ({project_code, projectData}: AllProjectProfileInputs) => {
    const response = await apiClient.put(`/projects/project/${project_code}`, projectData);
    return response.data;
};

export const deleteProject = async (project_code: number) => {
    apiClient.delete(`/projects/project/${project_code}/`);
    return true;
};



// --------------------------------------------------------------------------------------------------------
            // PROJECT DOCUMENTS


export const fetchProjectDocuments = async () => {
    const response = await apiClient.get('/projects/projectdocuments/');
    return response.data;
};

export const fetchProjectDocumentById = async (document_number: number) => {
    const response = await apiClient.get(`/projects/projectdocuments/${document_number}/`);
    return response.data;
};

export const createProjectDocument = async (projectDocumentData) => {
    const response = await apiClient.post('/projects/projectdocuments/', projectDocumentData);
    return response.data;
};

export const updateProjectDocument = async ({document_number, projectDocumentData}) => {
    const response = await apiClient.put(`/projects/projectdocuments/${document_number}`, projectDocumentData);
    return response.data;
};

export const deleteProjectDocument = async (document_number: number) => {
    apiClient.delete(`/projects/projectdocuments/${document_number}/`);
    return true;
};


// --------------------------------------------------------------------------------------------------------
            // BILL OF QUANTITIES


export const fetchBillOfQuantities = async () => {
    const response = await apiClient.get('/projects/billofquantities/');
    return response.data;
};

export const fetchBillOfQuantityById = async (boq_number: number) => {
    const response = await apiClient.get(`/projects/billofquantities/${boq_number}/`);
    return response.data;
};

export const createBillOfQuantity = async (billOfQuantitiesData) => {
    const response = await apiClient.post('/projects/billofquantities/', billOfQuantitiesData);
    return response.data;
};

export const updateBillOfQuantity = async ({boq_number, billOfQuantitiesData}) => {
    const response = await apiClient.put(`/projects/billofquantities/${boq_number}`, billOfQuantitiesData);
    return response.data;
};

export const deleteBillOfQuantity = async (boq_number: number) => {
    apiClient.delete(`/projects/billofquantities/${boq_number}/`);
    return true;
};


// --------------------------------------------------------------------------------------------------------
            // JOB COST LEDGER


export const fetchJobCostLedgers = async () => {
    const response = await apiClient.get('/projects/jobcostledger/');
    return response.data;
};

export const fetchJobCostLedgerById = async (job_cost_number: number) => {
    const response = await apiClient.get(`/projects/jobcostledger/${job_cost_number}/`);
    return response.data;
};

export const createJobCostLedger = async (jobCostLedgerData) => {
    const response = await apiClient.post('/projects/jobcostledger/', jobCostLedgerData);
    return response.data;
};

export const updateJobCostLedger = async ({job_cost_number, jobCostLedgerData}) => {
    const response = await apiClient.put(`/projects/jobcostledger/${job_cost_number}`, jobCostLedgerData);
    return response.data;
};

export const deleteJobCostLedger = async (job_cost_number: number) => {
    apiClient.delete(`/projects/jobcostledger/${job_cost_number}/`);
    return true;
};



