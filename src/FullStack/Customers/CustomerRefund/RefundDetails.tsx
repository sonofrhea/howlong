import React, { useState } from "react";

import { buttons, details, forms, 
    labelStyles, 
    layout, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { CustomerRefundDetailsProps } from "../constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};


const formatCreditNoteNumber = () => {
        const currentYear = new Date().getFullYear();
        return `CN-${currentYear}-`;
};



const formatCustomerNumber = () => {
        const currentYear = new Date().getFullYear();
        return `CV-${currentYear}-`;
};

const formatRefundNumber = () => {
    const currentYear = new Date().getFullYear();
    return `REF-${currentYear}-`;
};












const RefundDetails: React.FC<CustomerRefundDetailsProps> = ({
    refund,
    isLoading,
    onBack,
    onEdit,
    accounts, onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);

    
    if (isLoading) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Fetching refund data...</p>
            </div>
        );
    }

    if (!refund) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load refund details.</p>
                <button 
                    onClick={onBack}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
                            <div className={layout.redBadge}>
                                <p className={text.badgeLarge}>
                                    CUSTOMER REFUND DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatRefundNumber()}{refund.refund_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(refund.refund_number)}
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
                            <p className={details.extraSmallUppercase}>Refund No.</p>
                            {formatRefundNumber()}{refund.refund_number}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Date</p>
                            {formatDate(refund.date)}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Account</p>
                            {refund.payment_account?.account_code || 'N/A'} ({refund.payment_account?.account_name || 'N/A'})
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Pay To...</p>
                            {formatCustomerNumber()}{refund.pay_to} | {refund.pay_to_name || 'N/A'}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Related Credit Note</p>
                            {formatCreditNoteNumber()}{refund.related_credit_note || 'N/A'} | Outstanding: 
                            {refund.related_credit_note_outstanding || 'N/A'}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Expected Refund</p>
                            {refund.expected_refund}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Currency</p>
                            {refund.currency || 'N/A'}
                        </p>

                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Agent</p>
                            {refund.agent || 'N/A'}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {refund.related_customer_refund && refund.related_customer_refund.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Date</th>
                                            <th className={tables.headerCell}>Amount Issued</th>
                                            <th className={tables.headerCell}>Extra Charges</th>
                                            <th className={tables.headerCell}>Payment Type</th>
                                            <th className={tables.headerCell}>Total Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {refund.related_customer_refund.map((line: any, index: any) => (
                                            <tr key={index} className={tables.row}>
                                                <td className={tables.cell}>{formatDate(line.date)}</td>
                                                <td className={tables.cell}>{line.refund_amount}</td>
                                                <td className={tables.cell}>{line.additional_charges}</td>
                                                <td className={tables.cell}>{line.payment_type}</td>
                                                <td className={tables.cell}>{line.total_amount}</td>
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
                                            <div className="font-medium text-gray-800">{refund.gross_total}</div>
                                        </div>

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-gray-800">{refund.tax_amount}%</div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total Refunded:</div>
                                            <div className="font-medium text-black">
                                                {refund.net_refunded}
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Outstanding:</div>
                                            <div className="font-medium text-black">
                                                {refund.outstanding}
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
                    <p className={details.extraSmallUppercase}>Created by</p>
                    {refund.created_by || 'N/A'}
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
export default RefundDetails;
