import React from "react";


const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const SupplierProfileTable = ({ supplierProfiles, onSupplierProfileClick, onEditSupplierProfile,
    onDeleteSupplierProfile, sortConfig, onSort, currentPage, totalPages, totalItems,
    itemsPerPage, onPageChange, onItemsPerPageChange
 }) => {

    // Sortable header component
    const SortableHeader = ({ label, sortKey }) => {
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


    if (supplierProfiles.length === 0) {
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
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No supplier profile found</h3>
                <p className="text-gray-500">Get started by creating your first supplier profile.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Table Header with Items Per Page */}
            <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Supplier Profile List</h3>
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
                        <col className="w-16 text-center" />  {/* Supplier Number - Fixed */}
                        <col className="w-1/5 text-center" /> {/* Supplier Name - 20% */}
                        <col className="w-1/5 text-center" /> {/* Company Name - 20% */}
                        <col className="w-1/6 text-center" />  {/* Category */}
                        <col className="w-1/6 text-center" /> {/* Industry Code - 16.6% */}
                         <col className="w-1/5 text-center" /> {/* Address - 20% */}
                        <col className="w-20 text-center" />  {/* Registration Number - Fixed */}
                        <col className="w-20 text-center" />  {/* Status - Fixed */}
                        <col className="w-20 text-center" />  {/* Remark - Fixed */}
                        <col className="w-20 text-center" />  {/* Created By - Fixed */}
                        <col className="w-20 text-center" />  {/* Actions - Fixed */}
                    </colgroup>
                    <thead className="bg-gray-50">
                        <tr>
                            <SortableHeader label="Supplier #" sortKey="supplier_code" />
                            <SortableHeader label="Supplier Name" sortKey="supplier_name" />
                            <SortableHeader label="Company Name" sortKey="company_name" />
                            <SortableHeader label="Category" sortKey="category" />
                            <SortableHeader label="Industry Code" sortKey="industry_code" />
                            <SortableHeader label="Address" sortKey="address" />
                            <SortableHeader label="Registration Number" sortKey="registration_number" />
                            <SortableHeader label="Status" sortKey="status" />
                            <SortableHeader label="Remark" sortKey="remark" />
                            <SortableHeader label="Created By" sortKey="created_by" />
                            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {supplierProfiles.map((supplierProfile) => {
                            const supplierProfileId = supplierProfile.supplier_code;

                            return (
                                <tr key={supplierProfile.supplier_code} className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer" 
                                onClick={() => onSupplierProfileClick(supplierProfileId)}>
                                    {/* Supplier # */}
                                    <td className="px-2 py-2">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate" title={supplierProfile.supplier_code}>
                                            {formatNumber()}{supplierProfile.supplier_code}
                                        </span>
                                    </td>

                                    {/* Supplier Name */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.supplier_name}>
                                        <div className="text-sm text-gray-900 truncate">{supplierProfile.supplier_name}</div>
                                    </td>

                                    {/* Company Name */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.company_name}>
                                        <div className="text-sm text-gray-900 truncate">{supplierProfile.company_name}</div>
                                    </td>

                                    {/* Category */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.category}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {supplierProfile.category}
                                        </div>
                                    </td>

                                    {/* Industry Code */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.industry_code}>
                                        <div className="text-sm text-gray-900 truncate">{supplierProfile.industry_code}</div>
                                    </td>
                                    
                                    {/* Address */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.address}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {supplierProfile.address}
                                        </div>
                                    </td>

                                    {/* Registration Number */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.registration_number}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {supplierProfile.registration_number}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.status}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {supplierProfile.status}
                                        </div>
                                    </td>

                                    {/* Remark */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.remark}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {supplierProfile.remark}
                                        </div>
                                    </td>

                                    {/* Created By */}
                                    <td className="px-2 py-2 truncate" title={supplierProfile.created_by}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {supplierProfile.created_by}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-2 py-2">
                                        <div className="flex items-center justify-center gap-1">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditSupplierProfile(supplierProfileId, supplierProfile);
                                                }}
                                                title="Edit Supplier Profile"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm(`Are you sure you want to delete ${supplierProfile.supplier_code}?`)) {
                                                        onDeleteSupplierProfile(supplierProfileId);
                                                    }
                                                }}
                                                title="Delete Supplier Profile"
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
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} profiles
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}>
                                Previous
                        </button>
                        <span className="px-2 text-xs">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                                Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
 };

 export default SupplierProfileTable;
 