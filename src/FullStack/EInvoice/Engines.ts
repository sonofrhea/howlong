import apiClient from '../../BaseEngine';
import { EInvoiceCancelRequest, EInvoiceSubmission, EInvoiceSubmitResponse,
    LHDNClassificationCode, 
    TINValidationResponse} from './constants/Types';







// ---- LHDN CLASSIFICATION CODES ------------------------------------


export const fetchLHDNClassificationCodes = async (): Promise<LHDNClassificationCode[]> => {
    try {
        const response = await apiClient.get('/sales/lhdn-classification-codes/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};



// ---- SUBMIT EINVOICE ----------------------------------------------------

export const submitInvoiceToLHDN = async (invoice_number: number): Promise<EInvoiceSubmitResponse> => {
    const response = await apiClient.post(`/sales/invoice/${invoice_number}/submit_einvoice/`);
    return response.data;
};

export const submitCreditNoteToLHDN = async (credit_note_number: number): Promise<EInvoiceSubmitResponse> => {
    const response = await apiClient.post(`/customers/customercreditnote/${credit_note_number}/submit_einvoice/`);
    return response.data;
};

export const submitDebitNoteToLHDN = async (debit_note_number: number): Promise<EInvoiceSubmitResponse> => {
    const response = await apiClient.post(`/customers/customerdebitnote/${debit_note_number}/submit_einvoice/`);
    return response.data;
};

export const submitRefundToLHDN = async (refund_number: number): Promise<EInvoiceSubmitResponse> => {
    const response = await apiClient.post(`/customers/customerrefund/${refund_number}/submit_einvoice/`);
    return response.data;
};




// ---- CANCEL EINVOICE ----------------------------------------------------

export const cancelInvoiceFromLHDN = async ({
    invoice_number, reason
}: {
    invoice_number: number; reason: string;}): Promise<{ message: string }> => {
    const response = await apiClient.post(`/sales/invoice/${invoice_number}/cancel_einvoice/`, 
        { reason } as EInvoiceCancelRequest);
    return response.data;
}



export const cancelCreditNoteFromLHDN = async ({
    credit_note_number, reason
}: {
    credit_note_number: number; reason: string;}): Promise<{ message: string }> => {
    const response = await apiClient.post(`/customers/customercreditnote/${credit_note_number}/cancel_einvoice/`, 
        { reason } as EInvoiceCancelRequest);
    return response.data;
}


export const cancelDebitNoteFromLHDN = async ({
    debit_note_number, reason
}: {
    debit_note_number: number; reason: string;}): Promise<{ message: string }> => {
    const response = await apiClient.post(`/customers/customerdebitnote/${debit_note_number}/cancel_einvoice/`, 
        { reason } as EInvoiceCancelRequest);
    return response.data;
}


export const cancelRefundFromLHDN = async ({
    refund_number, reason
}: {
    refund_number: number; reason: string;}): Promise<{ message: string }> => {
    const response = await apiClient.post(`/customers/customerrefund/${refund_number}/cancel_einvoice/`, 
        { reason } as EInvoiceCancelRequest);
    return response.data;
}




// ---- VALIDATE TIN --------------------------------------------------------------------------------

export const validateCustomerTIN = async (customer_number: number): Promise<TINValidationResponse> => {
    const response = await apiClient.post(`/customers/customerprofile/${customer_number}/validate_tin/`);
    return response.data;
}



// ---- SUBMISSION HISTORY ------------------------------------------------------------------------------

export const fetchEInvoiceSubmissions = async (): Promise<EInvoiceSubmission[]> => {
    try {
        const response = await apiClient.get('/sales/invoicesubmission/');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchEInvoiceSubmissionById = async (id: number): Promise<EInvoiceSubmission> => {
    const response = await apiClient.get(`/sales/invoicesubmission/${id}/`);
    return response.data;
};



// ---- COMPANY EINVOICE SETTINGS ----

export const testEInvoiceCredentials = async (): Promise<{ message: string }> => {
    const response = await apiClient.post('/core/company/test_einvoice_credentials/');
    return response.data;
};


