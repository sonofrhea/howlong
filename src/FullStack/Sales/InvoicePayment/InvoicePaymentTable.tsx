import React from "react";


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};















const InvoicePaymentTable: React.FC<any> = ({ invoicePayments, onInvoicePaymentClick, onEditInvoicePayment,
    onDeleteInvoicePayment, onSort, currentPage, totalPages, totalItems, itemsPerPage, onPageChange,
    onItemsPerPageChange, sortConfig
 }) => {

    // Sortable header component
    const SortableHeader = ({ label, sortKey }: {label:string, sortKey:string}) => {
        const isSorted = sortConfig.key === sortKey;
        const isAsc = sortConfig.direction === 'asc';

        return (
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate cursor-pointer hover:bg-gray-100 transition-colors"  title={label} onClick={() => onSort(sortKey)}>
                <div className="flex items-center justify-center gap-1">
                    {label}
                    {isSorted && (
                        <span className="text-gray-400">
                            {isAsc ? '↑' : '↓'}
                        </span>
                    )}
                </div>
            </th>
        );
    };

    if (invoicePayments.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span className="text-sm text-gray-600">entries</span>
                    </div>
                </div>
                <div className="text-gray-400 text-6xl mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No invoice payment record found</h3>
                <p className="text-gray-500">Get started by creating your first invoice payment record.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Table Header with Items Per Page */}
            <div className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Invoice Payments List</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span className="text-sm text-gray-600">entries</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="w-full">
                <table className="w-full table-fixed divide-y divide-gray-200">
                    <colgroup>
                        <col className="w-16 text-center" />  {/* Payment Number - Fixed */}
                        <col className="w-1/5 text-center" /> {/* Date - 20% */}
                        <col className="w-1/6 text-center" />  {/* Account Received in */}
                        <col className="w-1/6 text-center" /> {/* Currency - 16.6% */}
                         <col className="w-1/5 text-center" /> {/* Paid By - 20% */}
                        <col className="w-20 text-center" />  {/* Agent - Fixed */}
                    </colgroup>
                    <thead className="bg-gray-50">
                        <tr>
                            <SortableHeader label="Payment #" sortKey="invoice_payment_code" />
                            <SortableHeader label="Date" sortKey="date_created" />
                            <SortableHeader label="Account Received in" sortKey="account_code" />
                            <SortableHeader label="Currency" sortKey="currency" />
                            <SortableHeader label="Paid By" sortKey="paid_by" />
                            <SortableHeader label="Agent" sortKey="agent" />
                            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {invoicePayments.map((invoicePayment) => {
                            const invoicePaymentId = invoicePayment.invoice_payment_code;

                            return (
                                <tr key={invoicePayment.invoice_payment_code} className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer" 
                                onClick={() => onInvoicePaymentClick(invoicePaymentId)}>
                                    {/* Payment Number */}
                                    <td className="px-2 py-2">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate" title={invoicePayment.invoice_payment_code}>
                                            {invoicePayment.invoice_payment_code}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-2 py-2 truncate" title={formatDate(invoicePayment.date_created)}>
                                        <div className="text-sm font-medium text-gray-900 truncate">
                                            {formatDate(invoicePayment.date_created)}
                                        </div>
                                    </td>

                                    {/* Account Received in */}
                                    <td className="px-2 py-2 truncate" title={invoicePayment.account_code}>
                                        <div className="text-sm text-gray-900 truncate">{invoicePayment.account_code}</div>
                                    </td>

                                    {/* Currency */}
                                    <td className="px-2 py-2 truncate" title={invoicePayment.currency}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {invoicePayment.currency}
                                        </div>
                                    </td>

                                    {/* Paid By */}
                                    <td className="px-2 py-2 truncate" title={invoicePayment.paid_by}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {invoicePayment.paid_by}
                                        </div>
                                    </td>

                                    {/* Agent */}
                                    <td className="px-2 py-2 truncate" title={invoicePayment.agent}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {invoicePayment.agent}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-2 py-2">
                                        <div className="flex items-center justify-center gap-1">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditInvoicePayment(invoicePaymentId, invoicePayment);
                                                }}
                                                title="Edit Invoice Payment Record"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm(`Are you sure you want to delete ${invoicePayment.invoice_payment_code}?`)) {
                                                        onDeleteInvoicePayment(invoicePaymentId);
                                                    }
                                                }}
                                                title="Delete Invoice Payment Record"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    
    )
 };

 export default InvoicePaymentTable;