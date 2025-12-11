import React from "react";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PI-${currentYear}-`;
};


const CompanyPurchaseOrderDetails = ({ companyPurchaseOrder, isLoading, onBack, onEdit }) => {

    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading Invoice...</p>
            </div>
        );
    }

    if (!companyPurchaseOrder) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Purchase Order Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load purchase order.</p>
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
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold">PO</div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">COMPANY PURCHASE ORDER</h1>
                            <p className="text-sm text-gray-500">Purchase Order</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="inline-block bg-rose-50 border border-rose-100 px-4 py-2 rounded-lg">
                            <div className="text-xs text-rose-700 uppercase tracking-wide">Purchase Order</div>
                            <div className="text-lg font-bold text-rose-800">{formatNumber()}{companyPurchaseOrder.purchase_order_number}</div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            <div><strong>Date:</strong> <span>{formatDate(companyPurchaseOrder.date)}</span></div>
                            <div><strong>Reference Supplier:</strong> <span>{companyPurchaseOrder.supplier_name}</span></div>
                            <div><strong>Reference Invoice:</strong> <span>{companyPurchaseOrder.related_invoice}</span></div>
                        </div>
                            
                        <div className="mt-3 text-sm text-gray-500">
                            <div><strong>Status: </strong> 
                            <span className="font-medium text-black-400">{companyPurchaseOrder.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-b border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm text-gray-500 font-bold uppercase">Address</h3>
                        <p className="mt-2 text-gray-800 font-medium whitespace-pre">{companyPurchaseOrder.address}</p>
                    </div>

                    <div>
                        <h3 className="text-sm text-gray-500 font-bold uppercase">Agent</h3>
                        <p className="mt-2 text-gray-800 font-medium">{companyPurchaseOrder.agent}</p>
                    </div>
                </div>

                <div className="p-6">
                    <h4 className="text-sm text-gray-500 font-bold uppercase">Description</h4>
                    <p className="mt-2 text-sm text-gray-700">{companyPurchaseOrder.description}</p>
                </div>

                {/* LINES */}
                {companyPurchaseOrder.related_purchase && companyPurchaseOrder.related_purchase.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-blue-100">
                                    <tr>
                                        <th className="px-4 py-3 border p-3 text-center text-xs font-bold text-gray-500 uppercase">Payment Date</th>
                                        <th className="px-4 py-3 border p-3 text-center text-xs font-bold text-gray-500 uppercase">Total Paid</th>
                                        <th className="px-4 py-3 border p-3 text-center text-xs font-bold text-gray-500 uppercase">Tax Inclusive</th>
                                        <th className="px-4 py-3 border p-3 text-center text-xs font-bold text-gray-500 uppercase">Tax</th>
                                        <th className="px-4 py-3 border p-3 text-center text-xs font-bold text-gray-500 uppercase">SubTotal(After Tax)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">

                                    {companyPurchaseOrder.related_purchase.map((line, index) => (

                                        <tr key={index}>
                                            <td className="px-4 py-3 text-sm text-gray-600">{line.payment_date}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{line.total_paid}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{line.tax_inclusive ? 'Yes' : 'No'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{line.tax}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{line.sub_total}</td>
                                        </tr>
                                    ))} 

                                        <tr>
                                            <td colSpan="3"></td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-600"></td>
                                            <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800"></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3"></td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-600">Total Paid</td>
                                            <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">{companyPurchaseOrder.related_purchase[0].total_paid}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan="3"></td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-600">Outstanding Amount</td>
                                            <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">RM {companyPurchaseOrder.related_purchase[0].outstanding_amount}</td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default CompanyPurchaseOrderDetails;
