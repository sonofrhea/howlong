import React, { useState } from "react";
import { buttons, details, forms, 
    labelStyles, layout, tables, text } from "../constants/styles";
import { SquarePen } from "lucide-react";
import { CompanyPurchaseOrderDetailsProps } from "../constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";


const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PI-${currentYear}-`;
};


const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};

const formatPurchaseInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PI-${currentYear}-`;
};









const CompanyPurchaseOrderDetails: React.FC<CompanyPurchaseOrderDetailsProps> = ({
    companyPurchaseOrder,
    isLoading,
    onBack,
    onEdit,
    accounts,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const CompanyPurchaseOrderId = companyPurchaseOrder?.purchase_order_number;

    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching Invoice...</p>
            </div>
        );
    }

    if (!companyPurchaseOrder) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Purchase Order Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load purchase order.</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }


    return(
        <div className="w-full mx-auto page bg-white shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    COMPANY PURCHASE ORDER DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{companyPurchaseOrder.purchase_order_number}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(CompanyPurchaseOrderId)}
                            
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                        </button>
                    <button
                        onClick={() => setIsJournalEntryOpen(true)}
                        className="bg-purple-900 text-white px-4 py-2 hover:bg-amber-900 rounded-lg flex items-center gap-2"
                    >
                        + Create Journal Entry
                    </button>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <div className="grid grid-cols-3 gap-6">
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Debit Note No.</p>
                            {formatNumber()}{companyPurchaseOrder.purchase_order_number}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Date</p>
                            {formatDate(companyPurchaseOrder.date)}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Account</p>
                            {companyPurchaseOrder.account?.account_code || 'N/A'} ({companyPurchaseOrder.account?.account_name || 'N/A'})
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Supplier</p>
                            {formatSupplierNumber()}{companyPurchaseOrder.supplier} | {companyPurchaseOrder.supplier_name}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Related Purchase Invoice</p>
                            {formatPurchaseInvoiceNumber()}{companyPurchaseOrder.related_invoice} | Total: {companyPurchaseOrder.invoice_total}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Related Invoice Total</p>
                            {companyPurchaseOrder.invoice_total}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Description</p>
                            {companyPurchaseOrder.description}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Status</p>
                            {companyPurchaseOrder.status}
                        </p>

                    </div>

                    <hr className="my-6 border-gray-200" />

                    {/* LINES */}
                    {companyPurchaseOrder.related_purchase && companyPurchaseOrder.related_purchase.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Payment Date</th>
                                            <th className={tables.headerCell}>Total Paid</th>
                                            <th className={tables.headerCell}>Tax Inclusive</th>
                                            <th className={tables.headerCell}>SST %</th>
                                            <th className={tables.headerCell}>SubTotal<br></br>(After SST)</th>
                                            <th className={tables.headerCell}>Cancelled</th>
                                        </tr>
                                    </thead>
                                    <tbody className={tables.body}>
                                        {companyPurchaseOrder.related_purchase.map((line: any, index: any) => (
                                            <tr key={index} className={tables.row}>
                                                <td className={tables.cell}>{formatDate(line.payment_date)}</td>
                                                <td className={tables.cell}>{line.total_paid}</td>
                                                <td className={tables.cell}>{line.tax_inclusive ? 'Yes' : 'No'}</td>
                                                <td className={tables.cell}>{line.tax_amount}</td>
                                                <td className={tables.cell}>{line.sub_total}</td>
                                                <td className={tables.cell}>{line.cancelled ? 'Yes' : 'No'}</td>
                                            </tr>
                                        ))} 
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                                <div className="w-full sm:w-1/2 lg:w-1/3">
                                    <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-gray-300 shadow-lg">


                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Gross Total</div>
                                            <div className="font-medium text-black">{companyPurchaseOrder.gross_paid}</div>
                                        </div>

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-black">{companyPurchaseOrder.tax_amount}%</div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total:</div>
                                            <div className="font-medium text-black">
                                                {companyPurchaseOrder.net_total_paid}
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Outstanding:</div>
                                            <div className="font-medium text-black">
                                                {companyPurchaseOrder.outstanding_amount}
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <hr className="my-6 border-gray-200" />
                
                <p className={labelStyles}>
                    <p className={details.extraSmallUppercase}>Created By</p>
                    {companyPurchaseOrder.created_by || 'N/A'}
                </p>

                <hr className="my-6 border-gray-200" />
                
                <p className={labelStyles}>
                    <p className={details.extraSmallUppercase}>Payment receipt</p>
                    {companyPurchaseOrder.payment_receipt ? (
                        <div>
                        <p>📄 {companyPurchaseOrder.payment_receipt.name}</p>
                        <p>Size: {(companyPurchaseOrder.payment_receipt.size / 1024).toFixed(2)} KB</p>
                        <a
                            href={URL.createObjectURL(companyPurchaseOrder.payment_receipt)}
                            download={companyPurchaseOrder.payment_receipt.name}
                            className="text-blue-500 underline"
                        >
                            Download Receipt
                        </a>
                        </div>
                    ) : (
                        'N/A'
                    )}
                </p>

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
export default CompanyPurchaseOrderDetails;
