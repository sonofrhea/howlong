import React from "react";


import { buttons, forms, labelStyles, 
    layout, spinningStyles, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { details } from "../../Core/constants/Styles";




const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SDN-${currentYear}-`;
};


const formatSupplierInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};



const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};












const SupplierDebitNoteDetails: React.FC<any> = ({ supplierDebitNote, isLoading, onBack, onEdit }) => {


    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <span className={spinningStyles.terminalBar.spinner}>↺</span>
                <p className="mt-3 text-gray-600">fetching payment...</p>
            </div>
        );
    }

    if (!supplierDebitNote) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Debit Note Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load debit note.</p>
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
                                    SUPPLIER DEBIT NOTE DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{supplierDebitNote.debit_note_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={onEdit}
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                        </button>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <div className="grid grid-cols-3 gap-6">
                        <p>
                            <p className={details.extraSmallUppercase}>Debit Note No</p>
                            {formatNumber()}{supplierDebitNote.debit_note_number}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Date</p>
                            {formatDate(supplierDebitNote.date)}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Account</p>
                            {supplierDebitNote.account.account_code} - ({supplierDebitNote.account.account_name})
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Reference Supplier</p>
                            {formatSupplierNumber()}{supplierDebitNote.supplier || 'N/A'} | {supplierDebitNote.supplier_name}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Reference Invoice</p>
                            {formatSupplierInvoiceNumber()}{supplierDebitNote.related_invoice || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Reference Invoice Total</p>
                            {supplierDebitNote.related_invoice_total || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Currency</p>
                            {supplierDebitNote.currency || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Agent</p>
                            {supplierDebitNote.agent || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Description</p>
                            {supplierDebitNote.description || 'N/A'}
                        </p>
                        
                        <p>
                            <p className={details.extraSmallUppercase}>Cancelled</p>
                            {supplierDebitNote.cancelled ? 'Yes' : 'No'}
                        </p>

                    </div>

                    {/* LINES */}
                    {supplierDebitNote.related_debit_note && supplierDebitNote.related_debit_note.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className={forms.body}>
                                <thead className={tables.header}>
                                    <tr>
                                        <th className={tables.headerCell}>Item</th>
                                        <th className={tables.headerCell}>Description</th>
                                        <th className={tables.headerCell}>Amount</th>
                                        <th className={tables.headerCell}>Tax %</th>
                                        <th className={tables.headerCell}>Current total</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">

                                    {supplierDebitNote.related_debit_note.map((line: any, index: any) => (
                                        <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                            <td className={tables.cell}>SKU-{line.debit_note_item || '--'} | {line.debit_note_item_name || '--'}</td>
                                            <td className={tables.cell}>{line.description || '--'}</td>
                                            <td className={tables.cell}>{line.amount || '--'}</td>
                                            <td className={tables.cell}>{line.tax_amount || '--'}%</td>
                                            <td className={tables.cell}>{line.current_total}</td>
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
                                    <div className="font-medium text-gray-800">{supplierDebitNote.gross_total || '--'}</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Tax %</div>
                                    <div className="font-medium text-gray-800">{supplierDebitNote.tax_amount || '--'}%</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Net Total</div>
                                    <div className="font-medium text-gray-800">{supplierDebitNote.net_total || '--'}</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Cancelled</div>
                                    <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                            supplierDebitNote.cancelled
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                                 
                                        }`}>{supplierDebitNote.cancelled ? 'Yes' : 'No'}</div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SupplierDebitNoteDetails;
