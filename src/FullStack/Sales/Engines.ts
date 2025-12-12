import apiClient from '../../BaseEngine';

import { AllQuotationInputs, AllInvoicePaymentInputs, 
    QuotationInputs, AllInvoiceInputs, 
    InvoicePaymentInputs,
    InvoiceInputs,
    CustomerPaymentResponse,
    CustomerPaymentInputs,
    AllCustomerPaymentInputs} from './Constants/Types';










// --------------------------------------------------------------------------------------------------------
            // QUOTATIONS

export const fetchQuotations = async () => {
    const response = await apiClient.get('/sales/quotation/');
    return response.data;
};

export const fetchQuotationById = async (quotation_number: number) => {
    const response = await apiClient.get(`/sales/quotation/${quotation_number}/`);
    return response.data;
};

export const createQuotation = async (quotationData: QuotationInputs) => {
    const response = await apiClient.post('/sales/quotation/', quotationData);
    return response.data;
};

export const editQuotation = async ({ quotation_number, quotationData }: AllQuotationInputs) => {
    const response = await apiClient.patch(`/sales/quotation/${quotation_number}/`, quotationData);
    return response.data;
};

export const updateQuotation = async ({ quotation_number, quotationData }: AllQuotationInputs) => {
    const response = await apiClient.put(`/sales/quotation/${quotation_number}/`, quotationData);
    return response.data;
}

export const deleteQuotation = async (quotation_number: number) => {
    apiClient.delete(`/sales/quotation/${quotation_number}/`);
    return true;
};






// --------------------------------------------------------------------------------------------------------
      // INVOICE


export const fetchInvoices = async () => {
    const response = await apiClient.get('/sales/invoice/');
    return response.data;
};

export const fetchInvoiceById = async (invoice_number: number) => {
    const response = await apiClient.get(`/sales/invoice/${invoice_number}/`);
    return response.data;
};

export const createInvoice = async (invoiceData: InvoiceInputs) => {
    const response = await apiClient.post('/sales/invoice/', invoiceData);
    return response.data;
};

export const editInvoice = async ({ invoice_number, invoiceData }: AllInvoiceInputs) => {
    const response = await apiClient.patch(`/sales/invoice/${invoice_number}/`, invoiceData);
    return response.data;
};

export const updateInvoice = async ({ invoice_number, invoiceData }: AllInvoiceInputs) => {
    const response = await apiClient.put(`/sales/invoice/${invoice_number}/`, invoiceData);
    return response.data;
}

export const deleteInvoice = async (invoice_number: number) => {
    apiClient.delete(`/sales/invoice/${invoice_number}/`);
    return true;
};






// --------------------------------------------------------------------------------------------------------
        // INVOICE PAYMENT

        
export const fetchInvoicePayments = async () => {
    const response = await apiClient.get('/sales/invoicepayment/');
    return response.data;
};

export const fetchInvoicePaymentById = async (invoice_payment_code: number) => {
    const response = await apiClient.get(`/sales/invoicepayment/${invoice_payment_code}/`);
    return response.data;
};

export const createInvoicePayment = async (invoicePaymentData: InvoicePaymentInputs) => {
    const response = await apiClient.post('/sales/invoicepayment/', invoicePaymentData);
    return response.data;
};

export const editInvoicePayment = async (
    { invoice_payment_code, invoicePaymentData }: AllInvoicePaymentInputs) => {
    const response = await apiClient.patch(`/sales/invoicepayment/${invoice_payment_code}/`, invoicePaymentData);
    return response.data;
};

export const updateInvoicePayment = async (
    { invoice_payment_code, invoicePaymentData }: AllInvoicePaymentInputs) => {
    const response = await apiClient.put(`/sales/invoicepayment/${invoice_payment_code}/`, invoicePaymentData);
    return response.data;
}

export const deleteInvoicePayment = async (invoice_payment_code: number) => {
    apiClient.delete(`/sales/invoicepayment/${invoice_payment_code}/`);
    return true;
}



// --------------------------------------------------------------------------------------------------------
        // CUSTOMER PAYMENT



export const fetchCustomerPayments = async () => {
    const response = await apiClient.get('/sales/customerpayment/');
    return response.data;
};

export const fetchCustomerPaymentById = async (payment_number: number) => {
    const response = await apiClient.get(`/sales/customerpayment/${payment_number}/`);
    return response.data;
};

export const createCustomerPayment = async (customerPaymentData: CustomerPaymentInputs) => {
    const response = await apiClient.post('/sales/customerpayment/', customerPaymentData);
    return response.data;
};

export const editCustomerPayment = async ({ payment_number, customerPaymentData }: AllCustomerPaymentInputs) => {
    const response = await apiClient.patch(`/sales/customerpayment/${payment_number}/`, customerPaymentData);
    return response.data;
};

export const updateCustomerPayment = async ({ payment_number, customerPaymentData }: AllCustomerPaymentInputs) => {
    const response = await apiClient.put(`/sales/customerpayment/${payment_number}/`, customerPaymentData);
    return response.data;
}

export const deleteCustomerPayment = async (payment_number: number) => {
    apiClient.delete(`/sales/customerpayment/${payment_number}/`);
    return true;
};
