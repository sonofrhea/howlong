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
  try {
    const response = await apiClient.get('/sales/quotation/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchQuotationById = async (quotation_number: number) => {
  try {
    const response = await apiClient.get(`/sales/quotation/${quotation_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createQuotation = async (quotationData: QuotationInputs) => {
  try {
    const response = await apiClient.post('/sales/quotation/', quotationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editQuotation = async ({ quotation_number, quotationData }: AllQuotationInputs) => {
  try {
    const response = await apiClient.patch(`/sales/quotation/${quotation_number}/`, quotationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateQuotation = async ({ quotation_number, quotationData }: AllQuotationInputs) => {
  try {
    const response = await apiClient.put(`/sales/quotation/${quotation_number}/`, quotationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuotation = async (quotation_number: number) => {
  try {
    const response = await apiClient.delete(`/sales/quotation/${quotation_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};





export const sendQuotation = async (quotation_number: number) => {
  try {
    const response = await apiClient.post(`/sales/quotation/${quotation_number}/send/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};






// --------------------------------------------------------------------------------------------------------
      // INVOICE


export const fetchInvoices = async () => {
  try {
    const response = await apiClient.get('/sales/invoice/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchInvoiceById = async (invoice_number: number) => {
  try {
    const response = await apiClient.get(`/sales/invoice/${invoice_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createInvoice = async (invoiceData: InvoiceInputs) => {
  try {
    const response = await apiClient.post('/sales/invoice/', invoiceData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editInvoice = async ({ invoice_number, invoiceData }: AllInvoiceInputs) => {
  try {
    const response = await apiClient.patch(`/sales/invoice/${invoice_number}/`, invoiceData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateInvoice = async ({ invoice_number, invoiceData }: AllInvoiceInputs) => {
  try {
    const response = await apiClient.put(`/sales/invoice/${invoice_number}/`, invoiceData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteInvoice = async (invoice_number: number) => {
  try {
    const response = await apiClient.delete(`/sales/invoice/${invoice_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};






// --------------------------------------------------------------------------------------------------------
        // INVOICE PAYMENT

        
export const fetchInvoicePayments = async () => {
  try {
    const response = await apiClient.get('/sales/invoicepayment/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchInvoicePaymentById = async (invoice_payment_code: number) => {
  try {
    const response = await apiClient.get(`/sales/invoicepayment/${invoice_payment_code}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createInvoicePayment = async (invoicePaymentData: InvoicePaymentInputs) => {
  try {
    const response = await apiClient.post('/sales/invoicepayment/', invoicePaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editInvoicePayment = async ({ invoice_payment_code, invoicePaymentData }: AllInvoicePaymentInputs) => {
  try {
    const response = await apiClient.patch(`/sales/invoicepayment/${invoice_payment_code}/`, invoicePaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateInvoicePayment = async ({ invoice_payment_code, invoicePaymentData }: AllInvoicePaymentInputs) => {
  try {
    const response = await apiClient.put(`/sales/invoicepayment/${invoice_payment_code}/`, invoicePaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteInvoicePayment = async (invoice_payment_code: number) => {
  try {
    const response = await apiClient.delete(`/sales/invoicepayment/${invoice_payment_code}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};



// --------------------------------------------------------------------------------------------------------
        // CUSTOMER PAYMENT



export const fetchCustomerPayments = async () => {
  try {
    const response = await apiClient.get('/sales/customerpayment/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCustomerPaymentById = async (payment_number: number) => {
  try {
    const response = await apiClient.get(`/sales/customerpayment/${payment_number}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCustomerPayment = async (customerPaymentData: CustomerPaymentInputs) => {
  try {
    const response = await apiClient.post('/sales/customerpayment/', customerPaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editCustomerPayment = async ({ payment_number, customerPaymentData }: AllCustomerPaymentInputs) => {
  try {
    const response = await apiClient.patch(`/sales/customerpayment/${payment_number}/`, customerPaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomerPayment = async ({ payment_number, customerPaymentData }: AllCustomerPaymentInputs) => {
  try {
    const response = await apiClient.put(`/sales/customerpayment/${payment_number}/`, customerPaymentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCustomerPayment = async (payment_number: number) => {
  try {
    const response = await apiClient.delete(`/sales/customerpayment/${payment_number}/`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};
