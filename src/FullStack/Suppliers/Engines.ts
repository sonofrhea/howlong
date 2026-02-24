import apiClient from '../../BaseEngine';





import { allSupplierCreditNoteInputs, allSupplierDebitNoteInputs,
     allSupplierInvoiceInputs, allSupplierPaymentInputs,
      SupplierCreditNoteInputs, allSupplierCategoryInputs,
       SupplierDebitNoteInputs, SupplierProfileInputs,
        SupplierInvoiceInputs, SupplierCategoryInputs,
    SupplierPaymentInputs, SupplierPaymentResponse,
    allSupplierProfileInputs
 } from './constants/Types';








// --------------------------------------------------------------------------------------------------------
                // SUPPLIER CATEGORIES


export const fetchSupplierCategories = async () => {
  try {
    const response = await apiClient.get('suppliers/suppliercategories/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSupplierCategoryById = async (category_id: number) => {
  try {
    const response = await apiClient.get(`suppliers/suppliercategories/${category_id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSupplierCategory = async (supplierCategoryData: SupplierCategoryInputs) => {
  try {
    const response = await apiClient.post('suppliers/suppliercategories/', supplierCategoryData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSupplierCategory = async ({ category_id, supplierCategoryData }: allSupplierCategoryInputs) => {
  try {
    const response = await apiClient.put(`suppliers/suppliercategories/${category_id}/`, supplierCategoryData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSupplierCategory = async (category_id: number) => {
  try {
    const response = await apiClient.delete(`suppliers/suppliercategories/${category_id}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};




// --------------------------------------------------------------------------------------------------------
                // SUPPLIER PROFILE


export const fetchSupplierProfiles = async () => {
  try {
    const response = await apiClient.get('/suppliers/supplierprofiles/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSupplierProfileById = async (supplier_code: number) => {
  try {
    const response = await apiClient.get(`/suppliers/supplierprofiles/${supplier_code}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSupplierProfile = async (supplierProfileData: SupplierProfileInputs | FormData) => {
  try {
    const response = await apiClient.post('/suppliers/supplierprofiles/', supplierProfileData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSupplierProfile = async ({ supplier_code, supplierProfileData }: allSupplierProfileInputs) => {
  try {
    const response = await apiClient.put(`/suppliers/supplierprofiles/${supplier_code}/`, supplierProfileData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSupplierProfile = async (supplier_code: number) => {
  try {
    const response = await apiClient.delete(`/suppliers/supplierprofiles/${supplier_code}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


// --------------------------------------------------------------------------------------------------------
                // SUPPLIER INVOICE



export const fetchSupplierInvoices = async () => {
  try {
    const response = await apiClient.get('/suppliers/supplierinvoices/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSupplierInvoiceById = async (invoice_number: number) => {
  try {
    const response = await apiClient.get(`/suppliers/supplierinvoices/${invoice_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSupplierInvoice = async (supplierInvoiceData: SupplierInvoiceInputs) => {
  try {
    const response = await apiClient.post('/suppliers/supplierinvoices/', supplierInvoiceData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSupplierInvoice = async ({ invoice_number, supplierInvoiceData }: allSupplierInvoiceInputs) => {
  try {
    const response = await apiClient.put(`/suppliers/supplierinvoices/${invoice_number}/`, supplierInvoiceData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSupplierInvoice = async (invoice_number: number) => {
  try {
    const response = await apiClient.delete(`/suppliers/supplierinvoices/${invoice_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};



// --------------------------------------------------------------------------------------------------------
                // SUPPLIER PAYMENT



export const fetchSupplierPayments = async () => {
  try {
    const response = await apiClient.get('/suppliers/supplierpayments/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSupplierPaymentById = async (payment_code: number) => {
  try {
    const response = await apiClient.get(`/suppliers/supplierpayments/${payment_code}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSupplierPayment = async (supplierPaymentData: SupplierPaymentInputs) => {
  try {
    const response = await apiClient.post('/suppliers/supplierpayments/', supplierPaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSupplierPayment = async ({ payment_code, supplierPaymentData }: allSupplierPaymentInputs) => {
  try {
    const response = await apiClient.put(`/suppliers/supplierpayments/${payment_code}/`, supplierPaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSupplierPayment = async (payment_code: number) => {
  try {
    const response = await apiClient.delete(`/suppliers/supplierpayments/${payment_code}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

      
// --------------------------------------------------------------------------------------------------------
                // SUPPLIER CREDIT NOTE



export const fetchSupplierCreditNotes = async () => {
  try {
    const response = await apiClient.get('/suppliers/suppliercreditnotes/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSupplierCreditNoteById = async (credit_note_number: number) => {
  try {
    const response = await apiClient.get(`/suppliers/suppliercreditnotes/${credit_note_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSupplierCreditNote = async (supplierCreditNoteData: SupplierCreditNoteInputs) => {
  try {
    const response = await apiClient.post('/suppliers/suppliercreditnotes/', supplierCreditNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSupplierCreditNote = async ({ credit_note_number, supplierCreditNoteData }: allSupplierCreditNoteInputs) => {
  try {
    const response = await apiClient.put(`/suppliers/suppliercreditnotes/${credit_note_number}/`, supplierCreditNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSupplierCreditNote = async (credit_note_number: number) => {
  try {
    const response = await apiClient.delete(`/suppliers/suppliercreditnotes/${credit_note_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


      
// --------------------------------------------------------------------------------------------------------
                // SUPPLIER DEBIT NOTE



export const fetchSupplierDebitNotes = async () => {
  try {
    const response = await apiClient.get('/suppliers/supplierdebitnotes/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSupplierDebitNoteById = async (debit_note_number: number) => {
  try {
    const response = await apiClient.get(`/suppliers/supplierdebitnotes/${debit_note_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSupplierDebitNote = async (supplierDebitNoteData: SupplierDebitNoteInputs) => {
  try {
    const response = await apiClient.post('/suppliers/supplierdebitnotes/', supplierDebitNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSupplierDebitNote = async ({ debit_note_number, supplierDebitNoteData }: allSupplierDebitNoteInputs) => {
  try {
    const response = await apiClient.put(`/suppliers/supplierdebitnotes/${debit_note_number}/`, supplierDebitNoteData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSupplierDebitNote = async (debit_note_number: number) => {
  try {
    const response = await apiClient.delete(`/suppliers/supplierdebitnotes/${debit_note_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};


