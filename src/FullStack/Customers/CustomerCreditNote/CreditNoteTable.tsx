import React from "react";
import { CreditNoteList } from "../constants/Types";



const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const formatCreditNoteNumber = () => {
        const currentYear = new Date().getFullYear();
        return `CN-${currentYear}-`;
};




const CreditNoteTable: React.FC<any> = ({ creditNotes, onCreditNoteClick, onEditCreditNote, 
    onDeleteCreditNote, sortConfig, onSort, currentPage, totalPages, 
    totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }) => {


        const SortableHeader = ({ label, sortKey }: {label:string, sortKey:string}) => {
            const isSorted = sortConfig.key === sortKey;
            const isAsc = sortConfig.direction === 'asc';








            return (
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate cursor-pointer hover:bg-gray-100 transition-colors"
                title={label}
                onClick={() => onSort(sortKey)}>
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

        if (creditNotes.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
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
                    <div className="text-gray-400 text-6xl mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No customers found</h3>
                    <p className="text-gray-500">Get started by creating your first customer.</p>
                </div>
            );
        }

        return (
            <div>
                {/* Table Header with Items Per Page */}
                <div className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Credit Notes List</h3>
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
                            {[
                                "w-1/5 text-center",
                                "w-1/5 text-center",
                                "w-1/5 text-center",
                                "w-1/5 text-center",
                                "w-1/5 text-center",
                                "w-1/5 text-center",
                                "w-[9%] text-center",
                            ].map((line, index) => (
                                <col key={index} className={line} />
                            ))}
                        </colgroup>
                        <thead className="bg-gray-50">
                            <tr>
                                <SortableHeader label="DBN #" sortKey="credit_note_number" />
                                <SortableHeader label="Date" sortKey="date" />
                                <SortableHeader label="Related Customer" sortKey="customer" />
                                <SortableHeader label="Totals" sortKey="aggregate_total" />
                                <SortableHeader label="Currency" sortKey="currency" />
                                <SortableHeader label="Agent" sortKey="agent" />
                                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-center">
                            {creditNotes.map((creditNote: CreditNoteList) => {
                                const creditNoteId = creditNote.credit_note_number;

                                    return (
                                    <tr key={creditNote.credit_note_number} className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer" 
                                    onClick={() => onCreditNoteClick(creditNoteId)}>
                                        {/* Credit Note Number */}
                                        <td className="px-2 py-2">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 truncate">
                                                {formatCreditNoteNumber()}{creditNote.credit_note_number}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-2 py-2 truncate">
                                            <div className="text-sm font-medium text-gray-900 truncate">
                                                {formatDate(creditNote.date)}
                                            </div>
                                        </td>

                                        {/* Related Customer */}
                                        <td className="px-2 py-2 truncate" >
                                            <div className="text-sm text-gray-900 truncate">
                                                {creditNote.customer}
                                            </div>
                                        </td>

                                        {/* Totals */}
                                        <td className="px-2 py-2 truncate" >
                                            <div className="text-sm text-gray-900 truncate">
                                                RM{creditNote.aggregate_total}
                                            </div>
                                        </td>

                                        {/* Currency */}
                                        <td className="px-2 py-2 truncate" >
                                            <div className="text-sm text-gray-900 truncate">
                                                {creditNote.currency}
                                            </div>
                                        </td>

                                        {/* Agent */}
                                        <td className="px-2 py-2 truncate" >
                                            <div className="text-sm text-gray-900 truncate">
                                                {creditNote.agent}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-2 py-2">
                                            <div className="flex items-center justify-center gap-1">
                                                <button 
                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:scale-110"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEditCreditNote(creditNoteId, creditNote);
                                                    }}
                                                    title="Edit Credit Note"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:scale-110"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm(`Are you sure you want to delete ${creditNote.credit_note_number}?`)) {
                                                            onDeleteCreditNote(creditNoteId);
                                                        }
                                                    }}
                                                    title="Delete Credit Note"
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
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} credit notes
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

export default CreditNoteTable;