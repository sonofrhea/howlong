import React from "react";
import { CustomerPaymentList, CustomerPaymentTableProps } from "../Constants/Types";


const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const CustomerPaymentTable: React.FC<CustomerPaymentTableProps> = ({
    customerPayments,
    onCustomerPaymentClick,
    onEditCustomerPayment,
    onDeleteCustomerPayment,
    onSort,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    sortConfig
 }) => {

    // Sortable header component
    const SortableHeader = ({ label, sortKey }: {label: string, sortKey: string}) => {
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

    if (customerPayments.length === 0) {
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
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No customer payment record found</h3>
                <p className="text-gray-500">Get started by creating your first customer payment record.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Table Header with Items Per Page */}
            <div className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Customer Payments List</h3>
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
                    {[
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-1/9 text-center",
                        "w-[7%] text-center",
                    ]}
                    </colgroup>
                    <thead className="bg-gray-50">
                        <tr>
                            <SortableHeader label="Payment #" sortKey="payment_number" />
                            <SortableHeader label="Date" sortKey="date" />
                            <SortableHeader label="Customer" sortKey="customer" />
                            <SortableHeader label="Project" sortKey="project" />
                            <SortableHeader label="Paid Amount" sortKey="paid_amount" />
                            <SortableHeader label="Outstanding" sortKey="outstanding" />
                            <SortableHeader label="Completed" sortKey="completed" />
                            <SortableHeader label="Agent" sortKey="agent" />
                            <SortableHeader label="Cancelled" sortKey="cancelled" />
                            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {customerPayments.map((customerPayment: CustomerPaymentList) => {
                            const customerPaymentId = customerPayment.payment_number;

                            return (
                                <tr key={customerPayment.payment_number} className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer" 
                                onClick={() => onCustomerPaymentClick(customerPaymentId)}>
                                    {/* Payment Number */}
                                    <td className="px-2 py-2">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate" >
                                            POST-{customerPayment.payment_number}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm font-medium text-black truncate">
                                            {formatDate(customerPayment.date)}
                                        </div>
                                    </td>

                                    {/* Customer */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            {customerPayment.customer}
                                        </div>
                                    </td>

                                    {/* Project */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            {customerPayment.project}
                                        </div>
                                    </td>

                                    {/* Paid Amount */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            {customerPayment.paid_amount}
                                        </div>
                                    </td>

                                    {/* Outstanding */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            RM {customerPayment.outstanding}
                                        </div>
                                    </td>

                                    {/* Completed */}
                                    <td className="px-2 py-2 truncate"> 
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                                customerPayment.completed
                                                    ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {customerPayment.completed ? 'Yes' : 'No'}
                                        </span>
                                    </td>

                                    {/* Agent */}
                                    <td className="px-2 py-2 truncate" >
                                        <div className="text-sm text-black truncate">
                                            {customerPayment.agent}
                                        </div>
                                    </td>

                                    {/* Cancelled */}
                                    <td className="px-2 py-2 truncate"> 
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                                customerPayment.cancelled
                                                    ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                                {customerPayment.cancelled ? 'Yes' : 'No'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-2 py-2">
                                        <div className="flex items-center justify-center gap-1">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditCustomerPayment(customerPaymentId, customerPayment);
                                                }}
                                                title="Edit Customer Payment Record"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm(`Are you sure you want to delete POST-${customerPayment.payment_number}?`)) {
                                                        onDeleteCustomerPayment(customerPaymentId);
                                                    }
                                                }}
                                                title="Delete Customer Payment Record"
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

 export default CustomerPaymentTable;
