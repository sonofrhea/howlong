import React from "react"
import { ControlAccountInterface } from "./ChartOfAccounts/Interfaces"
import { CurrencyInterface } from "./Core/constants/Types"
import { InvoiceInterface, InvoicePaymentInterface } from "./Sales/Constants/Types"
import { SupplierInvoiceResponse } from "./Suppliers/constants/Types"
import { CompanyPurchaseInvoiceResponse } from "./Purchases/constants/Types"
import { ProjectProfileResponse } from "./Projects/constants/Types"




export const controlAccountHandler = (accounts: ControlAccountInterface[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountCode = Number(e.target.value)
    const selectedAccount = accounts.find(a => a.account_code === accountCode)
    console.log("✅ Found Account:", selectedAccount);

    if (selectedAccount) {
      setValue("account_received_in.account_name", selectedAccount.account_name)
      setValue("account_received_in.account_type", selectedAccount.account_type)
    }
  }
}


export const invoicePaymentHandler = (invoicePayments: InvoicePaymentInterface[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentCode = Number(e.target.value)
    const selectedPayment = invoicePayments.find(p => p.invoice_payment_code === paymentCode)
    console.log("✅ Found Payment:", selectedPayment);

    if (selectedPayment) {
      setValue("related_payment_paid_amount", selectedPayment.net_aggregate_paid)
      setValue("related_payment_outstanding", selectedPayment.outstanding_amount)
    }
  }
}


export const invoiceHandler = (invoices: InvoiceInterface[], setValue: any) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedInvoiceNumber = Number(e.target.value);
        const selectedInvoice = invoices.find(a => a.invoice_number === selectedInvoiceNumber)
        console.log("✅ Found Invoice:", selectedInvoice);

        if (selectedInvoice) {
            setValue("related_invoice_total", selectedInvoice.net_total);
        }
    }
}



export const currencyHandler = (currencies: CurrencyInterface[], setValue: any) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCurrency = currencies.find(c => c.currency_code)
        console.log("✅ Found Currency:", selectedCurrency);

        if (selectedCurrency) {
            setValue("preferred_currency.currency_name", selectedCurrency.currency_name);
            setValue("preferred_currency.currency_symbol", selectedCurrency.currency_symbol);
            setValue("preferred_currency.country", selectedCurrency.country);
            setValue("preferred_currency.buy", selectedCurrency.buy);
            setValue("preferred_currency.sell", selectedCurrency.sell);
        }
    }
}


export const purchaseAccountHandler = (accounts: ControlAccountInterface[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountCode = Number(e.target.value)
    const selectedAccount = accounts.find(a => a.account_code === accountCode)
    console.log("✅ Found Account:", selectedAccount);

    if (selectedAccount) {
      setValue("purchase_account.account_name", selectedAccount.account_name)
      setValue("purchase_account.account_type", selectedAccount.account_type)
    }
  }
}


export const SupplierAccountHandler = (accounts: ControlAccountInterface[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountCode = Number(e.target.value)
    const selectedAccount = accounts.find(a => a.account_code === accountCode)
    console.log("✅ Found Account:", selectedAccount);

    if (selectedAccount) {
      setValue("account_code.account_name", selectedAccount.account_name)
      setValue("account_code.account_type", selectedAccount.account_type)
    }
  }
}


export const supplierRelatedInvoice = (supplierInvoices: SupplierInvoiceResponse[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const invoiceNumber = Number(e.target.value)
    const selectedInvoice = supplierInvoices.find(a => a.invoice_number === invoiceNumber)

    if (selectedInvoice) {
      setValue("invoice_amount", selectedInvoice.aggregate_total)
    }
  }
}




export const supplierDebitNoteAccountHandler = (accounts: ControlAccountInterface[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountCode = Number(e.target.value)
    const selectedAccount = accounts.find(a => a.account_code === accountCode)
    console.log("✅ Found Account:", selectedAccount);

    if (selectedAccount) {
      setValue("account.account_name", selectedAccount.account_name)
      setValue("account.account_type", selectedAccount.account_type)
    }
  }
}


export const supplierDebitNoteInvoiceTotal = (supplierInvoices: SupplierInvoiceResponse[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const invoiceNumber = Number(e.target.value)
    const selectedInvoice = supplierInvoices.find(a => a.invoice_number === invoiceNumber)
    console.log("✅ Found Invoice:", selectedInvoice);

    if (selectedInvoice) {
      setValue("related_invoice_total", selectedInvoice.aggregate_total)
    }
  }
}



export const supplierCreditNoteInvoiceTotal = (supplierInvoices: SupplierInvoiceResponse[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const invoiceNumber = Number(e.target.value)
    const selectedInvoice = supplierInvoices.find(a => a.invoice_number === invoiceNumber)
    console.log("✅ Found Invoice:", selectedInvoice);

    if (selectedInvoice) {
      setValue("related_invoice_total", selectedInvoice.aggregate_total)
    }
  }
}






export const companyPurchaseAccountHandler = (accounts: ControlAccountInterface[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountCode = Number(e.target.value)
    const selectedAccount = accounts.find(a => a.account_code === accountCode)
    console.log("✅ Found Account:", selectedAccount);

    if (selectedAccount) {
      setValue("account.account_name", selectedAccount.account_name)
      setValue("account.account_type", selectedAccount.account_type)
    }
  }
}



export const companyPurchaseInvoiceTotal = (purchaseInvoices: CompanyPurchaseInvoiceResponse[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const invoiceNumber = Number(e.target.value)
    const selectedInvoice = purchaseInvoices.find(a => a.purchase_invoice_number === invoiceNumber)
    console.log("✅ Found Invoice:", selectedInvoice);

    if (selectedInvoice) {
      setValue("invoice_total", selectedInvoice.net_total)
    }
  }
}



export const billofQuantitiesProjectName = (projects: ProjectProfileResponse[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectCode = Number(e.target.value)
    const selectedProject = projects.find(a => a.project_code === projectCode)
    console.log("✅ Found Project:", selectedProject);

    if (selectedProject) {
      setValue('project_name', selectedProject.project_name)
    }
  }
}