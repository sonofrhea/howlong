import React, { useState } from "react";
import { buttons, forms, labelStyles, layout, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { details } from "../../Core/constants/Styles";
import { SupplierCreditNoteDetailsProps } from "../constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SCN-${currentYear}-`;
};


const formatSupplierInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};



const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};







const SupplierCreditNoteDetails: React.FC<SupplierCreditNoteDetailsProps> = ({
    supplierCreditNote,
    isLoading,
    onBack,
    onEdit,
    accounts,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const supplierCreditNoteId = supplierCreditNote?.credit_note_number;


    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching payment...</p>
            </div>
        );
    }

    if (!supplierCreditNote) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load payment details.</p>
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
            <div className="min-w-full mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    SUPPLIER CREDIT NOTE DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{supplierCreditNote.credit_note_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(supplierCreditNoteId)}
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
                        <p>
                            <p className={details.extraSmallUppercase}>Credit Note No</p>
                            {formatNumber()}{supplierCreditNote.credit_note_number}
                        </p>
                                                
                        <p>
                            <p className={details.extraSmallUppercase}>Date</p>
                            {formatDate(supplierCreditNote.date)}
                        </p>
                                                
                        <p>
                            <p className={details.extraSmallUppercase}>Account</p>
                            {supplierCreditNote.account?.account_code || 'N/A'} - ({supplierCreditNote.account?.account_name || 'N/A'})
                        </p>
                                                
                        <p>
                            <p className={details.extraSmallUppercase}>Reference Supplier</p>
                            {formatSupplierNumber()}{supplierCreditNote.supplier || 'N/A'} | {supplierCreditNote.supplier_name || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Reference Invoice</p>
                            {formatSupplierInvoiceNumber()}{supplierCreditNote.related_invoice || 'N/A'}
                        </p>
                                                
                        <p>
                            <p className={details.extraSmallUppercase}>Reference Invoice Total</p>
                            {supplierCreditNote.related_invoice_total || 'N/A'}
                        </p>
                                                
                        <p>
                            <p className={details.extraSmallUppercase}>Currency</p>
                            {supplierCreditNote.currency || 'N/A'}
                        </p>
                                                
                        <p>
                            <p className={details.extraSmallUppercase}>Agent</p>
                            {supplierCreditNote.agent || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Description</p>
                            {supplierCreditNote.description || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Cancelled</p>
                            {supplierCreditNote.cancelled ? 'Yes' : 'No'}
                        </p>
                    </div>
                    {/* LINES */}
                    {supplierCreditNote.related_credit_note && supplierCreditNote.related_credit_note.length > 0 && (
                    
                    <div className="p-6">
                        <div className="p-6 overflow-x-auto">
                            <table className={forms.body}>
                                <thead className={tables.header}>
                                    <tr>
                                        <th className={tables.headerCell}>Item</th>
                                        <th className={tables.headerCell}>Description</th>
                                        <th className={tables.headerCell}>Amount</th>
                                        <th className={tables.headerCell}>Tax %</th>
                                        <th className={tables.headerCell}>Sub-Total</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">

                                    {supplierCreditNote.related_credit_note.map((line: any, index: any) => (

                                        <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                            <td className={tables.cell}>SKU-{line.credit_note_item || '--'} | {line.credit_note_item_name || '--'}</td>
                                            <td className={tables.cell}>{line.description || '--'}</td>
                                            <td className={tables.cell}>{line.amount || '--'}</td>
                                            <td className={tables.cell}>{line.tax_amount || '--'}</td>
                                            <td className={tables.cell}>{line.current_total || '--'}</td>
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
                                    <div className="font-medium text-gray-800">{supplierCreditNote.gross_total || '--'}</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Tax %</div>
                                    <div className="font-medium text-gray-800">{supplierCreditNote.tax_amount || '--'}%</div>
                                </div>

                                <hr className="my-4 border-blue-200" />

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Net Total</div>
                                    <div className="font-medium text-gray-800">{supplierCreditNote.net_total || '--'}</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Cancelled</div>
                                    <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                            supplierCreditNote.cancelled
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                                 
                                        }`}>{supplierCreditNote.cancelled ? 'Yes' : 'No'}</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>

                <hr className="my-6 border-gray-200" />
                                                
                <p>
                    <p className={details.extraSmallUppercase}>Created by</p>
                    {supplierCreditNote.created_by || 'N/A'}
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
export default SupplierCreditNoteDetails;
