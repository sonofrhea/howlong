import React from "react";

const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-`;
    };

const CustomerTable: React.FC<any> = ({ customers, onCustomerClick, onEditCustomer, onDeleteCustomer, 
    sortConfig, onSort, currentPage, totalPages, 
    totalItems, itemsPerPage, onPageChange, onItemsPerPageChange  }) => {
    
    // Sortable header component
        const SortableHeader = ({ label, sortKey }: {label: string, sortKey: string}) => {
        const isSorted = sortConfig.key === sortKey;
        const isAsc = sortConfig.direction === 'asc';
    
        return (
            <th 
                className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate cursor-pointer hover:bg-gray-100 transition-colors"
                title={label}
                onClick={() => onSort(sortKey)}
            >
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

    if (customers.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-black">Show</span>
                    <select 
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span className="text-sm text-black">entries</span>
                    </div>
                </div>
                <div className="text-gray-400 text-6xl mb-4">
                    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28" cy="28" r="12" fill="#9CA3AF"/>
                    <path d="M16 60C16 48.954 24.954 40 36 40C47.046 40 56 48.954 56 60V64H16V60Z" fill="#9CA3AF"/>
                    
                    <circle cx="68" cy="28" r="12" fill="#9CA3AF"/>
                    <path d="M56 60C56 48.954 64.954 40 76 40C87.046 40 96 48.954 96 60V64H56V60Z" fill="#9CA3AF"/>
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No customers found</h3>
                <p className="text-gray-500">Get started by creating your first customer.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Table Header with Items Per Page */}
            <div className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Customer List</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show</span>
                            <select 
                                value={itemsPerPage}
                                onChange={(e) => onItemsPerPageChange(e.target.value)}
                                className="border text-black border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500"
                            >
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
                <table className="w-full rounded-lg shadow-sm border border-gray-200 table-fixed divide-y divide-gray-400 divide-dotted">
                    <colgroup>
                        <col className="w-1/5 text-center" />{/* Customer Number - Fixed */}
                        <col className="w-1/5 text-center" />{/* Customer Name - 16.6% */}
                        <col className="w-1/5 text-center" />  {/* City - Fixed */}
                        <col className="w-1/5 text-center" />  {/* Status - Fixed */}
                        <col className="w-1/5 text-center" />  {/* Created By - Fixed */}
                        <col className="w-1/5 text-center" />  {/* Date Created - Fixed */}
                        <col className="w-1/5 text-center" /> {/* Remark - 16.6% */}
                        <col className="w-1/5 text-center" />  {/* Actions - Fixed */}
                    </colgroup>
                    <thead className="bg-gray-50">
                        <tr>
                            <SortableHeader label="Cust #" sortKey="customer_number" />
                            <SortableHeader label="Customer Name" sortKey="customer_name" />
                            <SortableHeader label="City" sortKey="city" />
                            <SortableHeader label="Status" sortKey="status" />
                            <SortableHeader label="Created By" sortKey="created_by" />
                            <SortableHeader label="Date" sortKey="date_created" />
                            <SortableHeader label="Remark" sortKey="remark" />
                            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {customers.map((customer: any) => {
                            const customerId = customer.customer_number;
                            
                            return (
                                <tr 
                                    key={customer.customer_number} 
                                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                                    onClick={() => onCustomerClick(customerId)}
                                >
                                    {/* Customer Number */}
                                    <td className="px-2 py-2 text-center">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate" title={customer.customer_number}>
                                            CV-{formatNumber()}{customer.customer_number}
                                        </span>
                                    </td>
                                    
                                    {/* Customer Name */}
                                    <td className="px-2 py-2 text-center truncate" title={customer.customer_name}>
                                        <div className="text-sm font-medium text-black truncate">
                                            {customer.customer_name}
                                        </div>
                                    </td>
                                    
                                    {/* City */}
                                    <td className="px-2 py-2 text-center truncate" title={customer.city}>
                                        <div className="text-sm text-black truncate">{customer.city}</div>
                                    </td>
                                    
                                    {/* Status */}
                                    <td className="px-2 py-2 text-center">
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                            customer.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 
                                            customer.status === 'Inactive' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                                            customer.status === 'Suspended' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                                            customer.status === 'Prospect' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                                            customer.status === 'Pending' ? 'bg-violet-50 text-violet-700 border border-violet-200' :
                                            'bg-gray-50 text-gray-600 border border-gray-200'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>

                                    {/* Created By */}
                                    <td className="px-2 py-2 text-center truncate" title={customer.created_by}>
                                        <div className="text-sm text-black truncate">{customer.created_by}</div>
                                    </td>

                                    {/* Date Created */}
                                    <td className="px-2 py-2 text-center truncate" title={formatDate(customer.date_created)}>
                                        <div className="text-sm text-black truncate">{formatDate(customer.date_created)}</div>
                                    </td>
                                    
                                    {/* Remark */}
                                    <td className="px-2 py-2 text-center truncate" title={customer.remark}>
                                        <div className="text-sm text-black truncate">{customer.remark}</div>
                                    </td>
                                    
                                    {/* Actions */}
                                    <td className="px-2 py-2 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditCustomer(customerId, customer);
                                                }}
                                                title="Edit Customer"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm(`Are you sure you want to delete ${customer.customer_name}?`)) {
                                                        onDeleteCustomer(customerId);
                                                    }
                                                }}
                                                title="Delete Customer"
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

            {/* Table Footer with Working Pagination */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} customers
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="px-2 text-xs">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerTable;