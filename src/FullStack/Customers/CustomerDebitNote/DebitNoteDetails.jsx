import React from "react";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};


const DebitNoteDetails = ({ debitNote, isLoading, onBack, onEdit, onCancel }) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading customer details...</p>
            </div>
        );
    }

    if (!debitNote) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Debit Note Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load debit note details.</p>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{debitNote.customer?.customer_name}</h2>
                        <p className="text-gray-600">{debitNote.formatted_debit_note_number}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${debitNote.date ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {formatDate(debitNote.date)}
                    </span>
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

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-sm text-purple-600 font-medium">Currency</div>
                        <div className="text-lg font-semibold text-gray-800">{debitNote.currency?.currency_symbol || debitNote.currency || 'Not provided'}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div>
                            <div className="text-sm text-purple-600 font-medium">Related Customer</div>
                            <h2 className="text-xl font-semibold text-gray-800">{debitNote.customer?.customer_name}</h2>
                            <p className="text-gray-600">{debitNote.customer?.formatted_customer_number}</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Content */}
            <div className="bg-gray-100 p-6 font-sans text-gray-800 ">
                <div className="">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8">

                        {/* Header */}
                        <div className="flex items-start justify-between gap-6 border-b pb-4 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold">DN</div>
                            <div>
                            <h3 className="text-xl font-semibold text-gray-800">Debit Note Information</h3>
                            <p className="text-sm text-gray-500">Detailed line breakdown</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Reference</p>
                            <p className="text-lg font-semibold">#{debitNote?.formatted_debit_note_number}</p>
                            <p className="text-sm text-gray-500">Date: {formatDate(debitNote.date_created)}</p>
                        </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                        <table className="w-full text-sm table-auto border-collapse">
                            <thead>
                            <tr className="text-left text-xs text-gray-500 uppercase border-b">
                                <th className="pb-3 text-center">Sales Account</th>
                                <th className="pb-3 text-center">Item Description</th>
                                <th className="pb-3 text-center">Tax Inclusive?</th>
                                <th className="pb-3 text-center">Tax Amount</th>
                                <th className="pb-3 text-center">Amount</th>
                                <th className="pb-3 text-center">Current Total</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y">
                            {debitNote.debit_note_header.map((header, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-4">
                                    <div className="font-mono text-gray-800">{header.account?.account_code || 'Not provided'}</div>
                                    <div className="text-xs text-gray-500">{header.account?.account_name || 'Not provided'}</div>
                                </td>
                                <td className="py-4">
                                    <div className="font-medium text-gray-800">{header.item?.formatted_item_code || 'Not provided'}</div>
                                    <div className="text-xs text-gray-500">{header.description || 'Not provided'}</div>
                                </td>
                                <td className="py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${header.tax_inclusive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {header.tax_inclusive ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td className="py-4 ">{header.tax_amount || 'Not provided'}</td>
                                <td className="py-4 ">{header.amount || 'Not provided'}</td>
                                <td className="py-4 ">{header.current_total || 'Not provided'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>

                        {/* Footer Summary */}
                        <div className="mt-6 flex flex-col md:flex-row items-end justify-end gap-6">
                        <div className="w-full md:w-1/2 lg:w-2/5">
                            <div className="rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between text-sm text-gray-600 pb-2">
                                <span>Agent</span>
                                <span className="font-medium">{debitNote.agent?.username || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 pb-2">
                                <span>Created By</span>
                                <span className="font-medium">{debitNote.created_by?.username || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 pb-2">
                                <span>Date Created</span>
                                <span className="font-medium">{formatDate(debitNote.date_created) || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 pb-2">
                                {debitNote.debit_note_header.map((header, index) => (
                                    <div key={index}>
                                        <div className="">
                                            <span className="">Aggregate Total</span>
                                            <span className="text-lg font-semibold text-gray-800">
                                                {header.aggregate_total || '0.00'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Notes */}
                        <div className="mt-6 text-sm text-gray-500">
                        <p>Notes</p>
                        <p className="text-xs">Please ensure all debit note details are reviewed before approval.</p>
                        </div>

                    </div>

                    <div className="bg-gray-100 p-4 flex items-center justify-between text-sm text-gray-600">
                        <div>Generated by Asiko ERP</div>
                        <button onClick={() => window.print()} className="px-3 py-1 rounded-md bg-white border text-sm">Print</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DebitNoteDetails;

