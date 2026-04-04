import apiClient from '../../BaseEngine';

import { ProjectProfileInputs,
    AllProjectProfileInputs, EditProjectProfileInputs,
    BillOfQuantitiesInputs,
    AllBillOfQuantitiesInputs,
    JobCostLedgerInputs,
    AllJobCostLedgerInputs,
    SitesInputs,
    AllSiteInputs
 } from './constants/Types';








// --------------------------------------------------------------------------------------------------------
                // JOB COST CODES

export const fetchJobCostCodes = async () => {
    try {
        const response = await apiClient.get('/projects/jobcostcodes/');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}



// --------------------------------------------------------------------------------------------------------
            // PROJECTS PROFILE


export const fetchProjects = async () => {
  try {
    const response = await apiClient.get('/projects/project/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectById = async (project_code: number) => {
  try {
    const response = await apiClient.get(`/projects/project/${project_code}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProject = async (projectData: ProjectProfileInputs) => {
  try {
    const response = await apiClient.post('/projects/project/', projectData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProject = async ({ project_code, projectData }: AllProjectProfileInputs) => {
  try {
    const response = await apiClient.put(`/projects/project/${project_code}/`, projectData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProject = async (project_code: number) => {
  try {
    const response = await apiClient.delete(`/projects/project/${project_code}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};



// --------------------------------------------------------------------------------------------------------
            // PROJECT DOCUMENTS


export const fetchProjectDocuments = async () => {
  try {
    const response = await apiClient.get('/projects/projectdocuments/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectDocumentById = async (document_number: number) => {
  try {
    const response = await apiClient.get(`/projects/projectdocuments/${document_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProjectDocument = async (projectDocumentData: any) => {
  try {
    const response = await apiClient.post('/projects/projectdocuments/', projectDocumentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProjectDocument = async ({ document_number, projectDocumentData }: any) => {
  try {
    const response = await apiClient.put(`/projects/projectdocuments/${document_number}/`, projectDocumentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProjectDocument = async (document_number: number) => {
  try {
    const response = await apiClient.delete(`/projects/projectdocuments/${document_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// --------------------------------------------------------------------------------------------------------
            // BILL OF QUANTITIES


export const fetchBillOfQuantities = async () => {
  try {
    const response = await apiClient.get('/projects/billofquantities/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchBillOfQuantityById = async (boq_number: number) => {
  try {
    const response = await apiClient.get(`/projects/billofquantities/${boq_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createBillOfQuantity = async (billOfQuantitiesData: BillOfQuantitiesInputs) => {
  try {
    const response = await apiClient.post('/projects/billofquantities/', billOfQuantitiesData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateBillOfQuantity = async ({ boq_number, billOfQuantitiesData }: AllBillOfQuantitiesInputs) => {
  try {
    const response = await apiClient.put(`/projects/billofquantities/${boq_number}/`, billOfQuantitiesData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBillOfQuantity = async (boq_number: number) => {
  try {
    const response = await apiClient.delete(`/projects/billofquantities/${boq_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// --------------------------------------------------------------------------------------------------------
            // JOB COST LEDGER


export const fetchJobCostLedgers = async () => {
  try {
    const response = await apiClient.get('/projects/jobcostledger/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchJobCostLedgerById = async (job_cost_number: number) => {
  try {
    const response = await apiClient.get(`/projects/jobcostledger/${job_cost_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createJobCostLedger = async (jobCostLedgerData: JobCostLedgerInputs) => {
  try {
    const response = await apiClient.post('/projects/jobcostledger/', jobCostLedgerData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateJobCostLedger = async ({ job_cost_number, jobCostLedgerData }: AllJobCostLedgerInputs) => {
  try {
    const response = await apiClient.put(`/projects/jobcostledger/${job_cost_number}/`, jobCostLedgerData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteJobCostLedger = async (job_cost_number: number) => {
  try {
    const response = await apiClient.delete(`/projects/jobcostledger/${job_cost_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


export const fetchBoqLines = async (boq: number) => {
  try {
    const response = await apiClient.get(`/projects/jobcostledger/boq_lines/?boq=${boq}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}






// --------------------------------------------------------------------------------------------------------
                // SITES

export const fetchSites = async () => {
  try {
    const response = await apiClient.get('/projects/site/');
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchSiteById = async (site_number: number) => {
  try {
    const response = await apiClient.get(`/projects/site/${site_number}/`)
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const createSite = async (siteData: SitesInputs) => {
  try {
    const response = await apiClient.post('/projects/site/', siteData)
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateSite = async ({ site_number, siteData }: AllSiteInputs) => {
  try {
    const response = await apiClient.patch(`/projects/site/${site_number}/`, siteData)
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteSite = async (site_number: number) => {
  try {
    const response = await apiClient.delete(`/projects/site/${site_number}/`)
    return response.status;
  } catch (error) {
    throw error;
  }
}

