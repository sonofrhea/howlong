import React from "react";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SCN-${currentYear}-`;
};



const SupplierCreditNoteDetails = ({ supplierCreditNote, isLoading, onBack, onEdit }) => {


    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading payment...</p>
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
        <div className="bg-gray-100">
            <div className="w-[100%] mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div>
                        <p className="text-sm text-gray-500 mt-1">Official Payment Documentation</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={onEdit}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold">DN</div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">SUPPLIER CREDIT NOTE</h1>
                            <p className="text-sm text-gray-500">Debit Note</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="inline-block bg-rose-50 border border-rose-100 px-4 py-2 rounded-lg">
                            <div className="text-xs text-rose-700 uppercase tracking-wide">Debit Note</div>
                            <div className="text-lg font-bold text-rose-800">{formatNumber()}{supplierCreditNote.credit_note_number}</div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            <div><strong>Date:</strong> <span>{formatDate(supplierCreditNote.date)}</span></div>
                            <div><strong>Reference Invoice:</strong> <span>{supplierCreditNote.related_invoice.invoice_number}</span></div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            <div><strong>Account:</strong> <span>{supplierCreditNote.account.account_code} - {supplierCreditNote.account.account_name}</span></div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            <div><strong>Currency:</strong> <span>{supplierCreditNote.currency}</span></div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            <div><strong>Cancelled:</strong>
                                <span>{supplierCreditNote.cancelled ? ' true ' : ' false '}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-b border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm text-gray-500 uppercase">Related Supplier</h3>
                        <p className="mt-2 text-gray-800 font-medium">{supplierCreditNote.supplier_name}</p>
                    </div>

                    <div>
                        <h3 className="text-sm text-gray-500 uppercase">Agent</h3>
                        <p className="mt-2 text-gray-800 font-medium">{supplierCreditNote.agent}</p>
                    </div>
                </div>

                <div className="p-6">
                    <h4 className="text-sm text-gray-500 uppercase">Description</h4>
                    <p className="mt-2 text-sm text-gray-700">{supplierCreditNote.description}</p>
                </div>

                {/* LINES */}
                {supplierCreditNote.related_credit_note && supplierCreditNote.related_credit_note.length > 0 && (

                    <div className="p-6 overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-100">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Item</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Description</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">

                                {supplierCreditNote.related_credit_note.map((line, index) => (

                                    <tr key={index}>
                                        <td className="px-4 py-3 text-sm text-gray-600">{line.item}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800">{line.description}</td>
                                        <td className="px-4 py-3 text-sm text-center text-gray-600">{line.amount}</td>
                                    </tr>
                                ))}
                                    <tr>
                                        <td colspan="1"></td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Tax Inclusive</td>
                                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">
                                            {supplierCreditNote.related_credit_note.tax_inclusive ? 'true' : 'false'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colspan="1"></td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Tax</td>
                                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">RM {supplierCreditNote.related_credit_note[0].tax_amount}</td>
                                    </tr>

                                    <tr className="border-t">
                                        <td colspan="1"></td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Subtotal</td>
                                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">RM {supplierCreditNote.related_credit_note[0].current_total}</td>
                                    </tr>

                                    <tr>
                                        <td colspan="1"></td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Total Amount</td>
                                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">RM {supplierCreditNote.related_credit_note[0].aggregate_total}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SupplierCreditNoteDetails;
