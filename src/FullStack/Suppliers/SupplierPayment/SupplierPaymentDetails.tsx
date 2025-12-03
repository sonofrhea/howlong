const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SPI-${currentYear}-`;
};

const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString();
};



const SupplierPaymentDetails: React.FC<any> = ({ supplierPayment, isLoading, onBack, onEdit }) => {


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading payment...</p>
            </div>
        );
    }

    if (!supplierPayment) {
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
            <div className="w-[100%] mx-auto page bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">SUPPLIER PAYMENT</h1>
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
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase">Payment No</p>
                        <p className="text-sm font-medium text-gray-700">{formatNumber()}{supplierPayment.payment_code}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Posted Date</p>
                        <p className="text-sm font-medium text-gray-700">{formatDate(supplierPayment.date_created)}</p>
                    </div>

                    <div>
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase">Account paid by</p>
                        <p className="text-sm font-medium text-gray-700">{supplierPayment.account_code.account_code} - {supplierPayment.account_code.account_name}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Currency</p>
                        <p className="text-sm font-medium text-gray-700">{supplierPayment.currency}</p>
                    </div>

                    <div>
                        <p className="px-2 py-1 text-center tracking-widest] text-xs font-semibold uppercase">Payment to</p>
                        <p className="text-sm font-medium text-gray-700">{supplierPayment.supplier_name}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Created By</p>
                        <p className="text-sm font-medium text-gray-700">{supplierPayment.created_by}</p>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {supplierPayment.related_payment && supplierPayment.related_payment.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Related Invoice</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Payment Amount</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Payment Date</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Additional Payment</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Payment Type</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Current Total</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {supplierPayment.related_payment.map((line: any, index: any) => (
                                        <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                            <td className="px-4 py-4 text-sm text-gray-600">{line.related_invoice_name}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{line.payment_amount}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{formatDate(line.payment_date)}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{line.additional_payment}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{line.payment_type}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600">{line.current_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                            <div className="w-full sm:w-1/2 lg:w-1/3">
                                <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-lg">
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Total Paid</div>
                                    <div className="font-medium text-gray-800">RM {supplierPayment.related_payment[0].total_paid}</div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Outstanding Amount</div>
                                    <div className="font-medium text-gray-800">RM {supplierPayment.related_payment[0].outstanding_amount}</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SupplierPaymentDetails;
