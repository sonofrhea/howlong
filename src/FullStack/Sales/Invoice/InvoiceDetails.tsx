import React from "react";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `INV-${currentYear}-`;
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};



const InvoiceDetails = ({ invoice, isLoading, onBack, onEdit }) => {


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading invoice...</p>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Invoice Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load invoice details.</p>
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
            <div className="w-[100%] mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className="flex items-center gap-4">

                        <div className="text-left">
                            <div className="inline-block bg-amber-50 border border-amber-100 px-4 py-2 rounded-lg drop-shadow-md shadow-xl">
                                <div className="text-xs text-amber-700 uppercase tracking-wide">Customer Invoice</div>
                                <div className="text-lg font-bold text-amber-800">
                                    {formatNumber()}{invoice.invoice_number}
                                </div>
                            </div>
                            <div className="mt-10 text-sm text-gray-500">
                                <div>
                                    <strong>Invoice Date:   </strong> <span>{formatDate(invoice.invoice_date)}</span>
                                </div>
                                <div>
                                    <strong>Valid until:   </strong> <span>{invoice.invoice_due_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={onEdit}
                            className="bg-white-400 text-black px-4 py-2 rounded-lg hover:bg-blue-300 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                    </div>
                </div>

                <div className="border-t border-b border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 drop-shadow">
                    <div>
                    <h3 className="text-sm text-gray-500 font-bold uppercase">Bill To</h3>
                    <p className="mt-2 text-gray-800 font-medium">{invoice.customer_name}</p>
                    <p className="mt-2 text-gray-800 font-medium whitespace-pre">{invoice.customer_details || 'Not provided'}</p>
                    </div>

                    <div>
                    <h3 className="text-sm text-gray-500 font-bold uppercase">Related Project</h3>
                    <p className="mt-2 text-gray-800 font-medium">{invoice.project_name || 'Not provided'}</p>
                    </div>

                    <div>
                    <h3 className="text-sm text-gray-500 font-bold uppercase">Prepared By</h3>
                    <p className="mt-2 text-gray-800 font-medium">{invoice.agent}</p>
                    </div>
                </div>

                {/* LINES */}
                {invoice.related_invoice && invoice.related_invoice.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100 drop-shadow-md shadow-lg">
                                <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Item</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Description</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Qty</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">UOM</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Unit Per Price</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Currency</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Amount</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100 drop-shadow-md shadow-inner">
                                    {invoice.related_invoice.map((line, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm text-gray-600 drop-shadow shadow-inner">{line.item_name}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 drop-shadow shadow-inner">{line.description}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 drop-shadow shadow-inner">{line.quantity}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 drop-shadow shadow-inner">{line.unit_of_measure}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 drop-shadow shadow-inner">{line.unit_per_price}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 drop-shadow shadow-inner">{line.currency}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 drop-shadow shadow-inner">RM {line.sub_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                        <div className="w-full sm:w-1/2 lg:w-1/3">
                            <div className="bg-gray-50 p-4 rounded-lg drop-shadow-md shadow">
                            <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                <div>Gross Total</div>
                                <div className="font-medium text-gray-800">RM {invoice.related_invoice[0].gross_total}</div>
                            </div>

                            <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                <div>Discount</div>
                                <div className="font-medium text-gray-800">RM {invoice.related_invoice[0].discount}</div>
                            </div>

                            <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                <div>Tax</div>
                                <div className="font-medium text-gray-800">RM {invoice.related_invoice[0].tax_amount}</div>
                            </div>

                            <div className="border-t border-dashed border-blue-500 mt-3 pt-3 flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-500">Net Total</div>
                                <div className="text-xl font-bold text-gray-900">RM {invoice.related_invoice[0].net_total}</div>
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
export default InvoiceDetails;
