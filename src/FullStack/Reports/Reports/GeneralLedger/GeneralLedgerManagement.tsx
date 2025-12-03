import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';




import { fetchGeneralLedgerReport } from "../../Engines";



import GeneralLedgerReport from "./GeneralLedgerReport";


















function GeneralLedgerManagement() {
    const queryClient = useQueryClient();
    const [dateRange, setDateRange] = useState({ start_date: '', end_date: '' });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [expandedGroups, setExpandedGroups] = useState({});

    const { data: generalLedger, isLoading: isLoadingGeneralLedger, error: generalLedgerError, refetch } = useQuery({
        queryKey: ['generalLedger', dateRange],
        queryFn: () => fetchGeneralLedgerReport(dateRange.start_date, dateRange.end_date),
        enabled: false,
    });

    const handleStartDateChange = (startDate: string) => {
        setDateRange(prev => ({
            ...prev,
            start_date: startDate
        }));
    }
    const handleEndDateChange = (endDate: string) => {
        setDateRange(prev => ({
            ...prev,
            end_date:endDate
        }));
    }

    const handleGenerateReport = () => {
        if (!dateRange.start_date) {
            alert("Please select both start date");
            return;
        }

        if (dateRange.start_date > dateRange.end_date) {
            alert("Invalid dates. start_date must be same or before end_date");
            return;
        }
        refetch();
    }


    const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
    };




    // Toggle expand/collapse for account groups

    const toggleGroup = (accountTitle: any) => {
        setExpandedGroups((prev: any) => ({
            ...prev,
            [accountTitle]: !prev[accountTitle]
        }));
    };


    const downloadCSV = () => {
        const headers = ['Account Title', 'Date', 'Reference Number', 'Description', 
            'Net Debit', 'Net Credit', 'Local Balance', 'Tax'];
        const csv = [headers, ...generalLedger.map((entry: any) => [
            entry.account_title, entry.date_posted, entry.reference_number,
            entry.description, entry.net_debit, entry.net_credit, entry.local_balance, entry.tax
        ])].map(row => row.join(',')).join('\n');

        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        link.download = 'ledger.csv';
        link.click();
    };

    
    const exportPDF = () => {
        const element = document.querySelector('.overflow-hidden');

        html2canvas(document.body).then(canvas => {
            document.body?.appendChild(canvas);
            const imgData = canvas.toDataURL('image/png');
        });
    };


       // ------------------------------------------------------------------------------------


    // ERROR DISPLAYS

    if (isLoadingGeneralLedger) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Generating Report...</p>
            </div>
        </div>
    );

    if (generalLedgerError) return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
                </svg>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
                <p className="text-gray-600">Failed to generate report. Please try again.</p>
                <button onClick={() => window.location.reload()}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Retry
                </button>
            </div>
        </div>
    )




    // ------------------------------------------------------------------------------------



    return (
            <div className="min-h-screen bg-white">
            {/* Minimal Header */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">Reports Suite</h1>
                                <p className="text-sm text-gray-500">General Ledger</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link 
                            to="/reports"
                            className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
                            >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Reports Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">General Ledger</h1>
                        <p className="text-xs text-gray-500">Financial data</p>
                    </div>
                </div>
                
                <div className="flex items-end justify-between gap-2 mb-4">
                    <div className="flex items-end gap-2">
                        {/* Date Pickers */}
                        <div className="flex gap-2">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">From</label>
                                <input 
                                    type="date" 
                                    value={dateRange.start_date}
                                    onChange={(e) => handleStartDateChange(e.target.value)}
                                    className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">To</label>
                                <input 
                                    type="date"
                                    value={dateRange.end_date}
                                    onChange={(e) => handleEndDateChange(e.target.value)}
                                    className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerateReport} 
                            disabled={isLoadingGeneralLedger}
                            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {isLoadingGeneralLedger ? '...' : 'Generate'}
                        </button>
                    </div>

                    <div className="flex items-end gap-1">
                        <button 
                            onClick={downloadCSV}
                            className="px-3 py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded hover:border-green-500 hover:bg-green-50 flex items-center gap-1"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            CSV
                        </button>
                        <button 
                            onClick={exportPDF}
                            className="px-3 py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded hover:border-green-500 hover:bg-green-50 flex items-center gap-1"
                            >
                                PDF
                        </button>
                    </div>
                </div>
            </div>

            {generalLedger && (
                <GeneralLedgerReport 
                    generalLedger={generalLedger}
                    startDate={dateRange.start_date}
                    endDate={dateRange.end_date}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    onToggleGroup={toggleGroup}
                    expandedGroups={expandedGroups}
                />
            )}
        </div>
    );
}
export default GeneralLedgerManagement;
