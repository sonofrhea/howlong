import React, { useEffect } from "react";


import { buttons, details, forms, 
    labelStyles, 
    layout, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";






const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};


const formatDebitNoteNumber = () => {
    const currentYear = new Date().getFullYear();
    return `DN-${currentYear}-`;
};


const formatCustomerNumber = () => {
        const currentYear = new Date().getFullYear();
        return `CV-${currentYear}-`;
};
















const DebitNoteDetails: React.FC<any> = ({ debitNote, isLoading, onBack, onEdit, onCancel }) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Fetching debit note data...</p>
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
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
                                    DEBIT NOTE DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatDebitNoteNumber()}{debitNote.debit_note_number}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 mt-1">Details</p>
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
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Debit Note No.</p>
                            {formatDebitNoteNumber()}{debitNote.debit_note_number}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Date</p>
                            {debitNote.date}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Account</p>
                            {debitNote.account?.account_code || 'N/A'} ({debitNote.account?.account_name || 'N/A'})
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Bill To...</p>
                            {formatCustomerNumber()}{debitNote.customer} | {debitNote.customer_name || 'N/A'}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Related Payment</p>
                            POST-{debitNote.related_payment} | Paid Amount: {debitNote.related_payment_amount}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Paid Amount</p>
                            {debitNote.paid_amount}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Currency</p>
                            {debitNote.currency || 'N/A'}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Agent</p>
                            {debitNote.agent || 'N/A'}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {debitNote.debit_note_details && debitNote.debit_note_details.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Date</th>
                                            <th className={tables.headerCell}>Description</th>
                                            <th className={tables.headerCell}>Amount</th>
                                            <th className={tables.headerCell}>Tax Inclusive?</th>
                                            <th className={tables.headerCell}>Tax %</th>
                                            <th className={tables.headerCell}>Current Total</th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {debitNote.debit_note_details.map((line: any, index: any) => (
                                            <tr key={index} className={tables.row}>
                                                <td className={tables.cell}>{line.date}</td>
                                                <td className={tables.cell}>{line.description}</td>
                                                <td className={tables.cell}>{line.amount}</td>
                                                <td className={tables.cell}>{line.tax_inclusive ? 'Yes' : 'No'}</td>
                                                <td className={tables.cell}>{line.tax_amount}%</td>
                                                <td className={tables.cell}>{line.current_total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                                <div className="w-full sm:w-1/2 lg:w-1/3">
                                    <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-gray-300 shadow-lg">

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total:</div>
                                            <div className="font-medium text-black">
                                                {debitNote.aggregate_total}
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Outstanding:</div>
                                            <div className="font-medium text-black">
                                                {debitNote.debit_note_outstanding}
                                            </div>
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

export default DebitNoteDetails;

