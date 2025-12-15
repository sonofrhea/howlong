import { ControlAccountInterface } from "./ChartOfAccounts/Interfaces"
import { CurrencyInterface } from "./Core/constants/Types"
import { InvoiceInterface, InvoicePaymentInterface } from "./Sales/Constants/Types"




export const controlAccountHandler = (accounts: ControlAccountInterface[], setValue: any) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const accountCode = Number(e.target.value)
    const selectedAccount = accounts.find(a => a.account_code === accountCode)
    
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

        if (selectedInvoice) {
            setValue("related_invoice_total", selectedInvoice.net_total);
        }
    }
}



export const currencyHandler = (currencies: CurrencyInterface[], setValue: any) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCurrency = currencies.find(c => c.currency_code)

        if (selectedCurrency) {
            setValue("preferred_currency.currency_name", selectedCurrency.currency_name);
            setValue("preferred_currency.currency_symbol", selectedCurrency.currency_symbol);
            setValue("preferred_currency.country", selectedCurrency.country);
            setValue("preferred_currency.buy", selectedCurrency.buy);
            setValue("preferred_currency.sell", selectedCurrency.sell);
        }
    }
}