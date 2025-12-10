import React from "react";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};

const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString();
};



const SupplierInvoiceDetails: React.FC<any> = ({ supplierInvoice, isLoading, onBack, onEdit }) => {


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading supplier invoice...</p>
            </div>
        );
    }


    if (!supplierInvoice) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Supplier Invoice Not Found</h2>
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


    return(
        <div className="bg-gray-100">
            <div className="w-[100%] mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">SUPPLIER INVOICE</h1>
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

                <hr className="my-6 border-gray-200" />

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase">Invoice No</p>
                        <p className="text-sm font-medium text-gray-700">{formatNumber()}{supplierInvoice.invoice_number}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Date Issued</p>
                        <p className="text-sm font-medium text-gray-700">{formatDate(supplierInvoice.invoice_date)}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Payment Account</p>
                        <p className="text-sm font-medium text-gray-700">{supplierInvoice.purchase_account.account_code} - {supplierInvoice.purchase_account.account_name}</p>
                    </div>

                    <div>
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase">Supplier</p>
                        <p className="text-sm font-medium text-gray-700">{supplierInvoice.supplier_name}</p>
                        
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Supplier Extra Details</p>
                        <p className="text-sm font-medium text-gray-700">{supplierInvoice.supplier_details}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Product</p>
                        <p className="text-sm font-medium text-gray-700">{supplierInvoice.product}</p>
                    </div>

                    <div>
                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase">Currency</p>
                        <p className="text-sm font-medium text-gray-700">{supplierInvoice.currency}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Payment Due</p>
                        <p className="text-sm font-medium text-gray-700">{supplierInvoice.invoice_due_date}</p>

                        <p className="px-2 py-1 text-center tracking-widest text-xs font-semibold uppercase mt-4">Agent</p>
                        <p className="text-sm font-medium text-gray-700">{supplierInvoice.agent}</p>
                    </div>
                </div>

                 <hr className="my-6 border-gray-200" />

                 {supplierInvoice.related_invoice && supplierInvoice.related_invoice.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Item</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Description</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Quantity</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">UOM</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Unit Per Price</th>
                                        <th className="px-4 py-3 text-center tracking-widest text-xs font-semibold uppercase">Amount</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {supplierInvoice.related_invoice.map((line: any, index: any) => (
                                        <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                            <td className="px-4 py-4 text-center text-sm text-gray-600">{line.item_name}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-800">{line.description}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-800">{line.quantity}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-800">{line.unit_of_measure}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-800">{line.unit_per_price}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-800">{line.gross_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                            <div className="w-full sm:w-1/2 lg:w-1/3">
                                <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-lg">
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Gross Total</div>
                                    <div className="font-medium text-gray-800">RM {supplierInvoice.related_invoice[0].gross_total}</div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax inclusive</div>
                                    <div className="font-medium text-green-400">{supplierInvoice.related_invoice[0].tax_inclusive ? 'yes' : 'no'}</div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax</div>
                                    <div className="font-medium text-gray-800">RM {supplierInvoice.related_invoice[0].tax_amount}</div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Total</div>
                                    <div className="font-medium text-gray-800">RM {supplierInvoice.related_invoice[0].net_total}</div>
                                </div>

                                <div className="border-t border-dashed border-blue-500 mt-3 pt-3 flex justify-between items-center">
                                    <div className="text-sm text-gray-500">Net Total</div>
                                    <div className="text-xl font-bold text-gray-900">RM {supplierInvoice.related_invoice[0].aggregate_total}</div>
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
export default SupplierInvoiceDetails;
