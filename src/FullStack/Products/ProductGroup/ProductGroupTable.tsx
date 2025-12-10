import React from "react";


const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
}; 







const ProductGroupTable: React.FC<any> = ({ productGroups, onProductGroupClick, onEditProductGroup, onDeleteProductGroup,
    sortConfig, onSort, currentPage, totalPages, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange
 }) => {


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


    if (productGroups.length === 0) {
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
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No product group found</h3>
                <p className="text-gray-500">Get started by creating your first product group.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Table Header with Items Per Page */}
            <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Product Group List</h3>
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
            <div className="flex justify-center">
                <table className="w-full table-fixed divide-y divide-gray-200">
                    <colgroup>
                        <col className="w-1/11 text-center" />  {/* Group Code  */}
                        <col className="w-1/11 text-center" /> {/* Group Name  */}
                        <col className="w-1/11 text-center" /> {/* Description*/}
                        <col className="w-1/11 text-center" /> {/* Sales Code */}
                        <col className="w-1/11 text-center" /> {/* Purchase Code */}
                        <col className="w-1/11 text-center" />  {/* Cash Sales Code*/}
                        <col className="w-1/11 text-center" /> {/* Cash Purchase Code */}
                        <col className="w-1/11 text-center" />  {/* Sales Return Code */}
                        <col className="w-1/11 text-center" />  {/* Purchase Return Code */}
                        <col className="w-1/11 text-center" />  {/* Balance Sheet Stock */}
                        <col className="w-1/11 text-center" />  {/* Actions - Fixed */}
                    </colgroup>
                    <thead className="bg-gray-50">
                        <tr>
                            <SortableHeader label="CODE #" sortKey="group_code" />
                            <SortableHeader label="Group Name" sortKey="group_name" />
                            <SortableHeader label="Description" sortKey="description" />
                            <SortableHeader label="Sales Code" sortKey="sales_code" />
                            <SortableHeader label="Purchase Code" sortKey="purchase_code" />
                            <SortableHeader label="Cash Sales" sortKey="cash_sales_code" />
                            <SortableHeader label="C/Purchase" sortKey="cash_purchase_code" />
                            <SortableHeader label="Sales Return" sortKey="sales_return_code" />
                            <SortableHeader label="Purchase Return" sortKey="purchase_return_code" />
                            <SortableHeader label="Balance Sheet" sortKey="balance_sheet_stock" />
                            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {productGroups.map((productGroup) => {
                            const productGroupId = productGroup.group_code;

                            return (
                                <tr key={productGroup.group_code} className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer" 
                                onClick={() => onProductGroupClick(productGroupId)}>
                                    {/* Group Code */}
                                    <td className="px-2 py-2">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate" title={productGroup.group_code}>
                                            SKG-{productGroup.group_code}
                                        </span>
                                    </td>

                                    {/* Group Name */}
                                    <td className="px-2 py-2 truncate" title={productGroup.group_name}>
                                        <div className="text-sm text-gray-900 truncate">{productGroup.group_name}</div>
                                    </td>

                                    {/* Description */}
                                    <td className="px-2 py-2 truncate" title={productGroup.description}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {productGroup.description}
                                        </div>
                                    </td>

                                    {/* Sales Code */}
                                    <td className="px-2 py-2 truncate" title={productGroup.sales_code}>
                                        <div className="text-sm text-gray-900 truncate">{productGroup.sales_code}</div>
                                    </td>

                                    {/* Purchase Code */}
                                    <td className="px-2 py-2 truncate" title={productGroup.purchase_code}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {productGroup.purchase_code}
                                        </div>
                                    </td>

                                    {/* Cash Sales Code */}
                                    <td className="px-2 py-2 truncate" title={productGroup.cash_sales_code}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {productGroup.cash_sales_code}
                                        </div>
                                    </td>

                                    {/* Cash Purchase Code */}
                                    <td className="px-2 py-2 truncate" title={productGroup.cash_purchase_code}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {productGroup.cash_purchase_code}
                                        </div>
                                    </td>

                                    {/* Sales Return Code */}
                                    <td className="px-2 py-2 truncate" title={productGroup.sales_return_code}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {productGroup.sales_return_code}
                                        </div>
                                    </td>

                                    {/* Purchase Return Code */}
                                    <td className="px-2 py-2 truncate" title={productGroup.purchase_return_code}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {productGroup.purchase_return_code}
                                        </div>
                                    </td>

                                    {/* Balance Sheet Stock */}
                                    <td className="px-2 py-2 truncate" title={productGroup.balance_sheet_stock}>
                                        <div className="text-sm text-gray-900 truncate">
                                            {productGroup.balance_sheet_stock}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-2 py-2">
                                        <div className="flex items-center justify-center gap-1">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditProductGroup(productGroupId, productGroup);
                                                }}
                                                title="Edit Product Code"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm(`Are you sure you want to delete ${productGroup.group_number}?`)) {
                                                        onDeleteProductGroup(productGroupId);
                                                    }
                                                }}
                                                title="Delete Product Group"
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
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} groups
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
    )

 };

 export default ProductGroupTable;
