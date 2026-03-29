import React, { useState } from "react";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `QT-${currentYear}-`;
};

const formatPaymentNumber = () => {
    return "PAY-";
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};

function formatInvoiceNumber(): React.ReactNode {
    const currentYear = new Date().getFullYear();
    return `INV-${currentYear}-`
};

function formatCustomerNumber(): React.ReactNode {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

import { buttons,  
    layout, tables, text } from "../Constants/Styles";
import { details, forms, 
    labelStyles } from "../Constants/Styles"
import { SquarePen } from "lucide-react";
import { InvoicePaymentDetailsProps } from "../Constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";


const formatUpdateDate = (dateString: string) => {
    return new Date(dateString).toLocaleString().split("T")[0];
};
















const InvoicePaymentDetails: React.FC<InvoicePaymentDetailsProps> = ({
    invoicePayment,
    isLoading,
    onBack,
    onEdit,
    accounts, onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const invoicePaymentId = invoicePayment?.invoice_payment_code


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Fetching invoice payment...</p>
            </div>
        );
    }

    if (!invoicePayment) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Quotation Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load quotation details.</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }











    return (
        <div className="w-full mx-auto page bg-white shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    INVOICE PAYMENT DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatPaymentNumber()}{invoicePayment.invoice_payment_code}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <a className="text-xs text-gray-500 mt-1">Payment Details</a>
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(invoicePaymentId)}
                            
                            className="bg-white border cursor-pointer border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm"
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                        </button>
                        <button
                            onClick={() => setIsJournalEntryOpen(true)}
                            className="bg-purple-800 text-white px-4 py-2 hover:bg-amber-900 rounded-lg flex items-center gap-2"
                        >
                            + Create Journal Entry
                        </button>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <div className="grid grid-cols-3 gap-6">
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Invoice Payment No.</a><br />
                            {formatPaymentNumber()}{invoicePayment.invoice_payment_code}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {formatDate(invoicePayment.date_created)}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Paid By</a><br />
                            {formatCustomerNumber()}{invoicePayment.paid_by || 'N/A'} | {invoicePayment.paid_by_name || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Related Invoice</a><br />
                            {formatInvoiceNumber()}{invoicePayment.related_invoice || 'N/A'} | Total: {invoicePayment.related_invoice_details}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Related Invoice Total</a><br />
                            {invoicePayment.related_invoice_total || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Currency</a><br />
                            {invoicePayment?.currency || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Account received in</a><br />
                            {invoicePayment.account_received_in?.account_code || 'N/A'} ({invoicePayment.account_received_in?.account_name || 'N/A'}) - {invoicePayment.account_received_in?.account_type || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Cancelled</a><br />
                            {invoicePayment.cancelled ? 'Yes' : 'No'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Agent</a><br />
                            {invoicePayment?.agent || 'N/A'}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {invoicePayment.related_invoice_payment && invoicePayment.related_invoice_payment.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Payment Date</th>
                                            <th className={tables.headerCell}>Payment Type</th>
                                            <th className={tables.headerCell}>Amount</th>
                                            <th className={tables.headerCell}>Taxable?</th>
                                            <th className={tables.headerCell}>SST %</th>
                                            <th className={tables.headerCell}>SST Amount</th>
                                            <th className={tables.headerCell}>Cancelled</th>
                                            <th className={tables.headerCell}>Current Total</th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {invoicePayment.related_invoice_payment.map((line, index) => (
                                            <tr key={index} className={tables.row}>
                                                <td className={tables.cell}>{formatDate(line.payment_date)}</td>
                                                <td className={tables.cell}>{line.payment_type || '--'}</td>
                                                <td className={tables.cell}>{line.total || '--'}</td>
                                                <td className={`inline-flex items-center px-5.5! py-0! rounded text-sm ${
                                                    line.taxable
                                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                                        : 'bg-green-100 text-green-800 border border-green-200'
                                                }`}>{line.taxable ? 'Yes' : 'No'}</td>
                                                <td className={tables.cell}>{line.sst_percent}%</td>
                                                <td className={tables.cell}>{line.sst_amount}</td>
                                                <td className={`inline-flex items-center px-5.5! py-0! rounded text-sm ${
                                                    line.taxable
                                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                                        : 'bg-green-100 text-green-800 border border-green-200'
                                                }`}>{line.cancelled ? 'Yes' : 'No'}</td>
                                                <td className={tables.cell}>{line.sub_total || '--'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                                <div className="w-full sm:w-1/2 lg:w-1/3">
                                    <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-gray-300 shadow-lg">

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Gross Total:</div>
                                            <div className="font-medium text-black">
                                                {invoicePayment.gross_paid}
                                            </div>
                                        </div>

                                        <hr className="my-4 border-blue-200" />

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Taxable?</div>
                                            <div className={`inline-flex items-center px-5.5! py-0! rounded text-sm ${
                                                    invoicePayment.taxable
                                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                                        : 'bg-green-100 text-green-800 border border-green-200'
                                                }`}>
                                                {invoicePayment.taxable ? 'Yes' : 'No'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Extra Tax %:</div>
                                            <div className="font-medium text-black">
                                                {invoicePayment.tax_percent}%
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax Amount:</div>
                                            <div className="font-medium text-black">
                                                {invoicePayment.tax_amount}
                                            </div>
                                        </div>

                                        <hr className="my-4 border-blue-200" />

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total:</div>
                                            <div className="font-medium text-black">
                                                {invoicePayment.net_aggregate_paid}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Outstanding:</div>
                                            <div className="font-medium text-black">
                                                {invoicePayment.outstanding_amount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <hr className="my-6 border-gray-200" />
                
                <div className="grid lg:grid-cols-5">
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Created By</a><br />
                        {invoicePayment?.created_by || 'N/A'}
                    </p>
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Date updated</a><br />
                        {formatUpdateDate(invoicePayment?.date_updated) || 'N/A'}
                    </p>
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {invoicePayment?.updated_by || 'N/A'}
                    </p>
                </div>

                <hr className="my-6 border-gray-200" />
            </div>
            <JournalEntryModal
                isOpen={isJournalEntryOpen}
                onClose={() => setIsJournalEntryOpen(false)}
                onCreate={onCreateJournalEntry}
                isSubmitting={isCreatingJournalEntry}
                accounts={accounts}
            />
        </div>
    );
};
export default InvoicePaymentDetails;
