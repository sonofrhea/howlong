import React from "react";
//import './GeneralLedgerCss.css';
import { GeneralLedgerResponse } from "../../constants/Types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { forms, reportStyle, tables } from "../../constants/Styles";



const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const getBalanceBracket = (opening_balance: number) => {
    return opening_balance < 0 ? `(${opening_balance})` : `${opening_balance}`;
};

const formatJournalNumber = () => {
    const currentYear = new Date().getFullYear();
    return `JV-${currentYear}-`
};














const GeneralLedgerReport: React.FC<any> = ({ generalLedger, totalItems, startDate, endDate, 
    sortConfig, onSort, onToggleGroup, expandedAccounts, downloadCSV 
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


    const formatNumber = () => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-0`;
    };




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
        <div className="overflow-hidden w-[113%]">
            {/* Report Header with Items Per Page */}
            <div className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Ledger report for dates between... {formatDate(startDate)} and {formatDate(endDate)}
                    </h3>
                    <div className="flex items-center gap-4">
                    </div>
                </div>
            </div>

            {/* Report Body */}
            <div className="space-y-3">
                {generalLedger.map((account: GeneralLedgerResponse, accountIndex: number) => {
                    const isExpanded = expandedAccounts[account.account_title] || false;

                    return(
                        <div key={accountIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Account Header - Clickable */}
                            <button
                                onClick={() => onToggleGroup(account.account_title)}
                                className="w-full px-0.5 py-0.5 flex items-center justify-between hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="text-gray-500">
                                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-black">{account.account_title}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {account.ledger_lines.length} transaction{account.ledger_lines.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                            </button>

                            {/* Expandable Transaction Lines */}
                            {isExpanded && (
                                <div className="w-full">
                                    <table className="w-full border-collapse">
                                        <colgroup>
                                            {[
                                                "w-[10%] text-center",
                                                "w-[12%] text-center",
                                                "w-[18%] text-center",
                                                "w-[22%] text-center",
                                                "w-[10%] text-center",
                                                "w-[10%] text-center",
                                                "w-[10%] text-center",
                                                "w-[8%] text-center",
                                            ].map((width, index) => (
                                                <col key={index} className={width} />
                                            ))}
                                        </colgroup>
                                        <thead className="bg-gray-50">
                                        {/* Table Header */}
                                            <tr className="bg-green-50">
                                                <th className={reportStyle.headerCellCol}>Date</th>
                                                <th className={reportStyle.headerCellCol}>Reference #</th>
                                                <th className={reportStyle.headerCellCol}>Description</th>
                                                <th className={reportStyle.headerCellCol}>Entry Description</th>
                                                <th className={reportStyle.headerCellCol}>Net Debit</th>
                                                <th className={reportStyle.headerCellCol}>Net Credit</th>
                                                <th className={reportStyle.headerCellCol}>Local balance</th>
                                                <th className={reportStyle.headerCellColEnd}>Cancelled</th>
                                            </tr>
                                        </thead>

                                        <tbody className={tables.body}>
                                            <tr className="bg-blue-50">
                                                <td colSpan={6} className="text-center text-black">
                                                    Opening Balance (Balance B/F):
                                                </td>
                                                <td className={`text-center text-black `}>
                                                    {account.opening_balance}
                                                </td>
                                                <td></td>
                                            </tr>

                                            {account.ledger_lines.map((line, lineIndex) => (
                                                <tr key={lineIndex}className="hover:bg-gray-200 divide-x divide-y divide-gray-300">

                                                    <td className="text-black font-light text-center">
                                                        {formatDate(line.date)}
                                                    </td>
                                                    <td className="text-black font-light text-center">
                                                        {formatJournalNumber()}{line.journal_number}
                                                    </td>
                                                    <td className="text-black font-light truncate">
                                                        {line.jh_description}
                                                    </td>
                                                    <td className="text-black font-light truncate">
                                                        {line.je_description}
                                                    </td>
                                                    <td className="text-center font-light text-black">
                                                        {line.net_debit}
                                                    </td>
                                                    <td className="text-center font-light text-black">
                                                        {line.net_credit}
                                                    </td>
                                                    <td className="text-black font-light text-center">
                                                        {line.local_balance}
                                                    </td>
                                                    <td className="text-black font-light border-b border-gray-300 text-center">
                                                        {line.cancelled ? (
                                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-light bg-red-100 text-red-800">
                                                                Yes
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                No
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        
                                            <tr className="bg-gray-100 font-semibold border-t-2 border-gray-300">
                                                <td colSpan={4} className="text-black">
                                                    Account totals for current period:
                                                </td>
                                                <td className="text-center">
                                                    {account.total_debit}
                                                </td>
                                                <td className="text-center">
                                                    {account.total_credit}
                                                </td>
                                                <td colSpan={2} className=""></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default GeneralLedgerReport;
