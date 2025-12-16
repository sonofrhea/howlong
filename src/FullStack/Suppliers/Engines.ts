import apiClient from '../../BaseEngine';





import { allSupplierCreditNoteInputs, allSupplierDebitNoteInputs,
     allSupplierInvoiceInputs, allSupplierPaymentInputs,
      SupplierCreditNoteInputs, allSupplierCategoryInputs,
       SupplierDebitNoteInputs,
        SupplierInvoiceInputs, SupplierCategoryInputs,
    SupplierPaymentInputs, SupplierPaymentResponse,
 } from './constants/Types';








// --------------------------------------------------------------------------------------------------------
                // SUPPLIER CATEGORIES


export const fetchSupplierCategories = async () => {
    const response = await apiClient.get('suppliers/suppliercategories/');
    return response.data;
};

export const fetchSupplierCategoryById = async (category_id: number) => {
    const response = await apiClient.get(`suppliers/suppliercategories/${category_id}/`);
    return response.data;
};

export const createSupplierCategory = async (supplierCategoryData: SupplierCategoryInputs) => {
    const response = await apiClient.post('suppliers/suppliercategories/', supplierCategoryData);
    return response.data;
};

export const updateSupplierCategory = async ({category_id, supplierCategoryData}: allSupplierCategoryInputs) => {
    const response = await apiClient.patch(`suppliers/suppliercategories/${category_id}`, supplierCategoryData);
    return response.data;
};

export const deleteSupplierCategory = async (category_id: number) => {
    apiClient.delete(`suppliers/suppliercategories/${category_id}/`);
    return true;
};




// --------------------------------------------------------------------------------------------------------
                // SUPPLIER PROFILE


export const fetchSupplierProfiles = async () => {
    const response = await apiClient.get('/suppliers/supplierprofiles/');
    return response.data;
};

export const fetchSupplierProfileById = async (supplier_code: number) => {
    const response = await apiClient.get(`/suppliers/supplierprofiles/${supplier_code}/`);
    return response.data;
};

export const createSupplierProfile = async (supplierProfileData) => {
    const response = await apiClient.post('/suppliers/supplierprofiles/', supplierProfileData);
    return response.data;
};

export const updateSupplierProfile = async ({supplier_code, supplierProfileData}) => {
    const response = await apiClient.put(`/suppliers/supplierprofiles/${supplier_code}`, supplierProfileData);
    return response.data;
};

export const deleteSupplierProfile = async (supplier_code) => {
    apiClient.delete(`/suppliers/supplierprofiles/${supplier_code}/`);
    return true;
};


// --------------------------------------------------------------------------------------------------------
                // SUPPLIER INVOICE



export const fetchSupplierInvoices = async () => {
    const response = await apiClient.get('/suppliers/supplierinvoices/');
    return response.data;
};

export const fetchSupplierInvoiceById = async (invoice_number: number) => {
    const response = await apiClient.get(`/suppliers/supplierinvoices/${invoice_number}/`);
    return response.data;
};

export const createSupplierInvoice = async (supplierInvoiceData: SupplierInvoiceInputs) => {
    const response = await apiClient.post('/suppliers/supplierinvoices/', supplierInvoiceData);
    return response.data;
};

export const updateSupplierInvoice = async ({invoice_number, supplierInvoiceData}: allSupplierInvoiceInputs) => {
    const response = await apiClient.put(`/suppliers/supplierinvoices/${invoice_number}`, supplierInvoiceData);
    return response.data;
};

export const deleteSupplierInvoice = async (invoice_number: number) => {
    apiClient.delete(`/suppliers/supplierinvoices/${invoice_number}/`);
    return true;
};



// --------------------------------------------------------------------------------------------------------
                // SUPPLIER PAYMENT



export const fetchSupplierPayments = async () => {
    const response = await apiClient.get('/suppliers/supplierpayments/');
    return response.data;
};

export const fetchSupplierPaymentById = async (payment_code: number): Promise<SupplierPaymentResponse> => {
    const response = await apiClient.get(`/suppliers/supplierpayments/${payment_code}/`);
    return response.data;
};

export const createSupplierPayment = async (supplierPaymentData: SupplierPaymentInputs) => {
    const response = await apiClient.post('/suppliers/supplierpayments/', supplierPaymentData);
    return response.data;
};

export const updateSupplierPayment = async ({payment_code, supplierPaymentData}: allSupplierPaymentInputs) => {
    const response = await apiClient.put(`/suppliers/supplierpayments/${payment_code}`, supplierPaymentData);
    return response.data;
};

export const deleteSupplierPayment = async (payment_code: number) => {
    apiClient.delete(`/suppliers/supplierpayments/${payment_code}/`);
    return true;
};

      
// --------------------------------------------------------------------------------------------------------
                // SUPPLIER CREDIT NOTE



export const fetchSupplierCreditNotes = async () => {
    const response = await apiClient.get('/suppliers/suppliercreditnotes/');
    return response.data;
};

export const fetchSupplierCreditNoteById = async (credit_note_number: number) => {
    const response = await apiClient.get(`/suppliers/suppliercreditnotes/${credit_note_number}/`);
    return response.data;
};

export const createSupplierCreditNote = async (supplierCreditNoteData: SupplierCreditNoteInputs) => {
    const response = await apiClient.post('/suppliers/suppliercreditnotes/', supplierCreditNoteData);
    return response.data;
};

export const updateSupplierCreditNote = async ({credit_note_number, supplierCreditNoteData}: allSupplierCreditNoteInputs) => {
    const response = await apiClient.patch(`/suppliers/suppliercreditnotes/${credit_note_number}`, supplierCreditNoteData);
    return response.data;
};

export const deleteSupplierCreditNote = async (credit_note_number: number) => {
    apiClient.delete(`/suppliers/suppliercreditnotes/${credit_note_number}/`);
    return true;
};


      
// --------------------------------------------------------------------------------------------------------
                // SUPPLIER DEBIT NOTE



export const fetchSupplierDebitNotes = async () => {
    const response = await apiClient.get('/suppliers/supplierdebitnotes/');
    return response.data;
};

export const fetchSupplierDebitNoteById = async (debit_note_number: number) => {
    const response = await apiClient.get(`/suppliers/supplierdebitnotes/${debit_note_number}/`);
    return response.data;
};

export const createSupplierDebitNote = async (supplierDebitNoteData: SupplierDebitNoteInputs) => {
    const response = await apiClient.post('/suppliers/supplierdebitnotes/', supplierDebitNoteData);
    return response.data;
};

export const updateSupplierDebitNote = async ({debit_note_number, supplierDebitNoteData}: allSupplierDebitNoteInputs) => {
    const response = await apiClient.patch(`/suppliers/supplierdebitnotes/${debit_note_number}`, supplierDebitNoteData);
    return response.data;
};

export const deleteSupplierDebitNote = async (debit_note_number: number) => {
    apiClient.delete(`/suppliers/supplierdebitnotes/${debit_note_number}/`);
    return true;
};


