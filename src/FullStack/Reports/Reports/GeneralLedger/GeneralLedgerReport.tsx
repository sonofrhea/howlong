import React from "react";
import './GeneralLedgerCss.css';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const GeneralLedgerReport = ({ generalLedger, totalItems, startDate, endDate, 
    sortConfig, onSort, onToggleGroup, expandedGroups 
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


    const formatNumber = () => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-0`;
    };


    const groupedAccounts = {};
    generalLedger.forEach(entry => {
        if (!groupedAccounts[entry.account_title]) {
            groupedAccounts[entry.account_title] = [];
        }
        groupedAccounts[entry.account_title].push(entry);
    });



    if (!generalLedger || generalLedger.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data found</h3>
                <p className="text-gray-500">General ledger report not available for the selected date range.</p>
            </div>
        );
    }



    return (
        <div className="overflow-hidden">
            {/* Report Header with Items Per Page */}
            <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-center">
                    <h3 className="text-lg font-regular text-gray-800">
                        General ledger report for dates between... {formatDate(startDate)} and {formatDate(endDate)}
                    </h3>
                    <div className="flex items-center gap-4">
                    </div>
                </div>
            </div>

            {/* Report Body */}
            <div className="flex justify-center">
                <table className="w-[100%]">
                    <colgroup>
                        <col className="w-4 text-center" /> {/* Toggle */}
                        <col className="w-1/5 text-center" />  {/* Date */}
                        <col className="w-1/5 text-center" /> {/* Reference Number */}
                        <col className="w-1/5 text-center" /> {/* Description */}
                        <col className="w-1/5 text-center" />  {/* Net Debit */}
                        <col className="w-1/5 text-center" /> {/* Net Credit */}
                        <col className="w-1/5 text-center" />  {/* Local Balance */}
                        <col className="w-1/5 text-center" />  {/* Tax - Fixed */}
                    </colgroup>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-8 px-2 py-3"></th>
                            <SortableHeader className="uppercase" label="Date" sortKey="date_posted" />
                            <SortableHeader className="uppercase" label="Reference Number" sortKey="reference_number" />
                            <SortableHeader className="uppercase" label="Description" sortKey="description" />
                            <SortableHeader className="uppercase" label="Net Debit" sortKey="net_debit" />
                            <SortableHeader className="uppercase" label="Net Credit" sortKey="net_credit" />
                            <SortableHeader className="uppercase" label="Local Balance" sortKey="local_balance" />
                            <SortableHeader className="uppercase" label="Tax" sortKey="tax" />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {Object.entries(groupedAccounts).map(([accountTitle, entries]) => {
                            const isExpanded = expandedGroups[accountTitle];
                            const summaryEntry = entries.find(entry => entry.is_summary);
                            const detailEntries = entries.filter(entry => !entry.is_summary);

                            return (
                                <React.Fragment key={accountTitle}>

                                    {/* ACCOUNT HEADER ROW */}
                                    <tr className="bg-green-50 border-t border-gray-300 text-left">
                                        <td>
                                            <button 
                                                onClick={() => onToggleGroup(accountTitle)}
                                                className="w-6 h-6 flex items-left justify-center hover:bg-gray-200 rounded"
                                            >
                                                {isExpanded ? '-' : '+'}
                                            </button>
                                        </td>
                                        <td colSpan="7" className="px-6 py-4">
                                            {accountTitle}
                                        </td>
                                    </tr>

                                    {isExpanded && detailEntries.map((entry, index) => (
                                        <tr key={index}  className="hover:bg-gray-50">
                                            <td className="px-2 py-4">

                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {formatDate(entry.date_posted)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                JV-{formatNumber()}{entry.reference_number}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {entry.description}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                RM {entry.net_debit}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                RM {entry.net_credit}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                RM {entry.local_balance}
                                            </td>
                                            <td className="px-6 py-2 text-sm text-gray-900">
                                                RM {entry.tax}
                                            </td>
                                        </tr>
                                    ))}
                                    {isExpanded && summaryEntry && (
                                        <tr className="font-semibold border-t-2">
                                            <td className="px-2 py-4"></td>
                                            <td colSpan="4" className="px-6 py-4 text-sm text-blue-800 text-left">
                                                Account Summary:
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 bg-blue-50">
                                                RM {summaryEntry.net_debit}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 bg-red-50">
                                                RM {summaryEntry.net_credit}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default GeneralLedgerReport;
