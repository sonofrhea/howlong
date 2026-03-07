import React, { useState } from "react";
import { buttons, details, labelStyles, layout, text } from "../Constants/Styles";
import { CustomerPaymentDetailsProps } from "../Constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";
import { SquarePen } from "lucide-react";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `QT-${currentYear}-`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-`;
};

const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};













const customerPayment: React.FC<CustomerPaymentDetailsProps> = ({
    customerPayment,
    isLoading,
    onBack,
    onEdit,
    accounts, onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const customerPaymentId = customerPayment?.payment_number;


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading payment...</p>
            </div>
        );
    }

    if (!customerPayment) {
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

    return (
        <div className="bg-gray-100">
            <div className="w-full mx-auto page bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">CUSTOMER PAYMENT</h1>
                        <p className="text-sm text-gray-500 mt-1">Official Record of Payment Already Posted</p>

                        <div className={layout.badge}>
                            <p className={text.badgeLarge}>
                                PAYMENT DETAILS
                            </p>
                            <p className={labelStyles}>
                                POST-{customerPayment.payment_number}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(customerPaymentId)}
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} 
                            className="cursor-pointer"/>
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

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <a className="text-center tracking-widest text-xs font-semibold uppercase">Payment No</a><br />
                        <p className="text-sm font-medium mb-4 text-gray-700">POST-{customerPayment.payment_number}</p>

                        <a className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Posted Date</a><br />
                        <p className="text-sm font-medium mb-4 text-gray-700">{formatDate(customerPayment.date)}</p>

                        <a className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Account received in</a><br />
                        <p className="text-sm font-medium text-gray-700">
                            {customerPayment.account_received_in?.account_code || 'N/A'} ({customerPayment.account_received_in?.account_name || 'N/A'})
                        </p>
                    </div>

                    <div>
                        <a className="text-center tracking-widest text-xs font-semibold uppercase ">Customer</a><br />
                        <p className="text-sm font-medium mb-4 text-gray-700">{customerPayment.customer_name || 'N/A'}</p>

                        <a className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Project</a><br />
                        <p className="text-sm font-medium mb-4 text-gray-700">{formatProjectNumber()}{customerPayment.project} | {customerPayment.project_name || 'N/A'}</p>

                        <a className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Completed</a><br />
                        <p className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                            customerPayment.completed ? 
                            'bg-green-100 text-green-900 drop-shadow-md shadow-inner border-collapse border-green-200' : 
                            'bg-red-100 text-red-900 drop-shadow-md shadow-inner border-collapse border-red-200'}
                            `}>
                            {customerPayment.completed ? 'Yes' : 'No'}
                        </p>                        
                    </div>

                    <div>
                        <a className="text-center tracking-widest text-xs font-semibold uppercase">Agent</a><br />
                        <p className="text-sm font-medium mb-4 text-gray-700">{customerPayment.agent}</p>

                        <a className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Currency</a><br />
                        <p className="text-sm font-medium mb-4 text-gray-700">{customerPayment.currency || 'N/A'}</p>

                        <a className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Cancelled</a><br />
                        <p className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                            customerPayment.cancelled ? 
                            'bg-red-100 text-red-900 drop-shadow-md shadow-inner border-collapse border-red-200' :
                            'bg-green-100 text-green-900 drop-shadow-md shadow-inner border-collapse border-green-200' 
                            }
                            `}>
                            {customerPayment.cancelled ? 'Yes' : 'No'}
                        </p>
                    </div>

                    <div>
                        <a className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Total invoices Outstanding</a><br />
                        <p className="text-sm font-medium mb-4 text-gray-700">{customerPayment.related_payment_outstanding || 'N/A'}</p>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="overflow-x-auto">
                    <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                        <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                        <tr>
                            <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Description</th>
                            <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Cancelled</th>
                            <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Paid Amount</th>
                        </tr>
                        </thead>
                        <tbody className="border border-gray-200">
                        <tr className="border-b border-gray-100">
                            <td className="px-4 py-3 text-gray-700">{customerPayment.description || 'N/A'}</td>
                            <td className={`px-4 py-3 text-gray-700 ${
                                customerPayment.cancelled ? 
                                ' text-red-700 bg-red-100' : 
                                ' text-green-700 bg-green-100'}
                                `}>
                                {customerPayment.cancelled ? 'Yes' : 'No'}
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-gray-800">{customerPayment.paid_amount}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 sm:flex sm:items-center sm:justify-end">
                    <div className="w-full sm:w-1/2 lg:w-1/3">
                        <div className="bg-gray-100 p-8 rounded-lg drop-shadow-md shadow-lg">
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>Net Initial posted</span>
                                <span className="font-semibold text-gray-800">{customerPayment.paid_amount || 'N/A'}</span>
                            </div>

                            <hr className="my-4 border-blue-200" />

                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>Remaining Outstanding</span>
                                <span className="font-semibold text-gray-800">{customerPayment.outstanding || 'N/A'}</span>
                            </div>

                            <hr className="my-4 border-blue-200" />

                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>Outstanding amount paid</span>
                                <span className="font-semibold text-gray-800">{customerPayment.outstanding_paid || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />
                                                        
                <div className="grid lg:grid-cols-5">
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Created by</a><br />
                        {customerPayment.created_by || 'N/A'}
                    </p>
    
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {customerPayment.updated_by || 'N/A'}
                    </p>
    
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatUpdatedDate(customerPayment.date_updated) || 'N/A'}
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
export default customerPayment;
