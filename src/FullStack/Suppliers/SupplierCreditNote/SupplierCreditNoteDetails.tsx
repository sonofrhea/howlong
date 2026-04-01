import React, { useState } from "react";
import { buttons, forms, labelStyles, layout, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { details } from "../../Core/constants/Styles";
import { SupplierCreditNoteDetailsProps } from "../constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";

const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};







const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
                                    {supplierCreditNote.formatted_number}
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
                            <a className={details.extraSmallUppercase}>Credit Note No</a><br />
                            {supplierCreditNote.formatted_number}
                        </p>
                                                
                        <p>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {formatDate(supplierCreditNote.date)}
                        </p>
                                                
                        <p>
                            <a className={details.extraSmallUppercase}>Account</a><br />
                            {supplierCreditNote.account?.account_code || 'N/A'} - ({supplierCreditNote.account?.account_name || 'N/A'})
                        </p>
                                                
                        <p>
                            <a className={details.extraSmallUppercase}>Reference Supplier</a><br />
                            {supplierCreditNote.supplier?.formatted_number || 'N/A'} | {supplierCreditNote.supplier?.supplier_name || 'N/A'}
                        </p>
                        
                        <p>
                            <a className={details.extraSmallUppercase}>Reference Invoice</a><br />
                            {supplierCreditNote.related_invoice?.formatted_number || 'N/A'}
                        </p>
                                                
                        <p>
                            <a className={details.extraSmallUppercase}>Reference Invoice Total</a><br />
                            {supplierCreditNote.related_invoice_total || 'N/A'}
                        </p>
                                                
                        <p>
                            <a className={details.extraSmallUppercase}>Currency</a><br />
                            {supplierCreditNote.currency || 'N/A'}
                        </p>
                                                
                        <p>
                            <a className={details.extraSmallUppercase}>Agent</a><br />
                            {supplierCreditNote.agent || 'N/A'}
                        </p>
                        
                        <p>
                            <a className={details.extraSmallUppercase}>Description</a><br />
                            {supplierCreditNote.description || 'N/A'}
                        </p>
                        
                        <p>
                            <a className={details.extraSmallUppercase}>Cancelled</a><br />
                            <div className={`inline-flex items-center px-5! py-0! rounded text-xs font-medium ${
                                supplierCreditNote.cancelled
                                    ? 'bg-red-100 text-red-800 border-red-200'
                                    : 'bg-green-100 text-green-800 border-green-200'
                                        
                            }`}>{supplierCreditNote.cancelled ? 'Yes' : 'No'}</div>
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
                                        <th className={tables.headerCell}>Taxable</th>
                                        <th className={tables.headerCell}>SST %</th>
                                        <th className={tables.headerCell}>SST Amount</th>
                                        <th className={tables.headerCell}>Total</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">

                                    {supplierCreditNote.related_credit_note.map((line, index) => (

                                        <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                            <td className={tables.cell}>{line.credit_note_item?.formatted_number || '--'} | {line.credit_note_item_name || '--'}</td>
                                            <td className={tables.cell}>{line.description}</td>
                                            <td className={tables.cell}>{line.amount}</td>
                                            <td className={`inline-flex items-center px-5! py-0! rounded text-sm ${
                                                line.taxable
                                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                                    : 'bg-green-100 text-green-800 border border-green-200'
                                            }`}>{line.taxable ? 'Yes' : 'No'}</td>
                                            <td className={tables.cell}>{line.sst_percent}</td>
                                            <td className={tables.cell}>{line.sst_amount}</td>
                                            <td className={tables.cell}>{line.current_total}</td>
                                            <td className={`inline-flex items-center px-5! py-0! rounded text-sm ${
                                                line.cancelled
                                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                                    : 'bg-green-100 text-green-800 border border-green-200'
                                            }`}>{line.cancelled ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                            <div className="w-full sm:w-1/2 lg:w-1/3">
                                <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-gray-300 shadow-lg">

                                    <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                        <div>Gross Paid</div>
                                        <div className="font-medium text-gray-800">{supplierCreditNote.gross_total}</div>
                                    </div>

                                    <hr className="my-2 border-blue-200" />

                                    <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                        <div>Tax %</div>
                                        <div className="font-medium text-gray-800">{supplierCreditNote.tax_percent || '--'}%</div>
                                    </div>

                                    <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                        <div>Tax Amount</div>
                                        <div className="font-medium text-gray-800">{supplierCreditNote.tax_amount}</div>
                                    </div>

                                    <hr className="my-2 border-blue-200" />
                                    
                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Net Paid</div>
                                        <div className="font-medium text-gray-800">{supplierCreditNote.net_total}</div>
                                    </div>

                                    <hr className="my-2 border-blue-200" />
                                    
                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Outstanding</div>
                                        <div className="font-medium text-gray-800">{supplierCreditNote.outstanding}</div>
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
                        <a className={details.extraSmallUppercase}>Created by</a><br />
                        {supplierCreditNote.created_by || 'N/A'}
                    </p>
    
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {supplierCreditNote.updated_by || 'N/A'}
                    </p>
    
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatUpdatedDate(supplierCreditNote.date_updated) || 'N/A'}
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
export default SupplierCreditNoteDetails;
