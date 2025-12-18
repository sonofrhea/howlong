import React from "react";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `QT-${currentYear}-`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};


const customerPayment: React.FC<any> = ({ customerPayment, isLoading, onBack, onEdit }) => {

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

                <hr className="my-6 border-gray-200" />

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <p className="text-center tracking-widest text-xs font-semibold uppercase">Payment No</p>
                        <p className="text-sm font-medium text-gray-700">POST-{customerPayment.payment_number}</p>

                        <p className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Posted Date</p>
                        <p className="text-sm font-medium text-gray-700">{formatDate(customerPayment.date)}</p>

                        <p className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Account received in</p>
                        <p className="text-sm font-medium text-gray-700">{customerPayment.account_received_in || 'N/A'}</p>
                    </div>

                    <div>
                        <p className="text-center tracking-widest text-xs font-semibold uppercase ">Customer</p>
                        <p className="text-sm font-medium text-gray-700">{customerPayment.customer_name || 'N/A'}</p>

                        <p className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Project</p>
                        <p className="text-sm font-medium text-gray-700">{customerPayment.project_name || 'N/A'}</p>

                        <p className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Completed</p>
                        <p className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                            customerPayment.completed ? 
                            'bg-green-100 text-green-900 drop-shadow-md shadow-inner border-collapse border-green-200' : 
                            'text-red-600'}
                            `}>
                            {customerPayment.completed ? 'Yes' : 'No'}
                        </p>
                    </div>

                    <div>
                        <p className="text-center tracking-widest text-xs font-semibold uppercase">Agent</p>
                        <p className="text-sm font-medium text-gray-700">{customerPayment.agent}</p>

                        <p className="text-center tracking-widest text-xs font-semibold uppercase mt-4">Currency</p>
                        <p className="text-sm font-medium text-gray-700">{customerPayment.currency || 'N/A'}</p>
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
                                ' text-red-700' : 
                                ' text-green-700 '}
                                `}>
                                {customerPayment.cancelled ? 'Yes' : 'No'}
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-gray-800">RM {customerPayment.paid_amount}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 sm:flex sm:items-center sm:justify-end">
                    <div className="w-full sm:w-1/2 lg:w-1/3">
                        <div className="bg-gray-100 p-8 rounded-lg drop-shadow-md shadow-lg">
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>Amount Posted</span>
                            <span className="font-semibold text-gray-800">RM {customerPayment.paid_amount || 'N/A'}</span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>Additional bank charges</span>
                            <span className="font-semibold text-gray-800">RM {customerPayment.additional_bank_charges || 'N/A'}</span>
                            </div>

                            <div className="border-t border-dashed border-blue-300 mt-3 pt-3 flex justify-between items-center">
                            <span>Outstanding</span>
                            <span className="font-semibold text-gray-800">RM {customerPayment.outstanding || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <p className="text-sm font-semibold text-gray-500">Created By: {customerPayment.created_by}</p>
                </div>
            </div>
        </div>
    );
};
export default customerPayment;
