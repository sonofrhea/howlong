import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';


import { fetchCashFlow } from "../../Engines";

import { CASH_FLOW_CHOICES, REPORT_TYPE } from "../../constants/options";
import { CashFlowPeriodTypes } from "../../constants/Types";

import CashFlowReport from "./CashFlowReport";
import { spinningStyles } from "../../constants/Styles";











function CashFlowManagement() {
    const [periodType, setPeriodType] = useState<CashFlowPeriodTypes>("Yearly");

    const periodOptions = useMemo(() => CASH_FLOW_CHOICES.map(option => (
        <option key={option} value={option}>
            {option}
        </option>
    )), [CASH_FLOW_CHOICES]);
    
    const reportType = useMemo(() => REPORT_TYPE.map(option => (
        <option key={option} value={option}>
            {option}
        </option>
    )), [REPORT_TYPE])



    const { data: cashFlow, isLoading: isLoadingCashFlow, error: cashFlowError, refetch } = useQuery({
        queryKey: ['cashFlow', periodType],
        queryFn: () => fetchCashFlow(periodType),
        enabled: false,
    });


    const handlePeriodTypeChange = (newPeriodType: CashFlowPeriodTypes) => {
        setPeriodType(newPeriodType);
    };


    const handleGenerateReport = () => {

        refetch();
    };







        // ERROR DISPLAYS
// ------------------------------------------------------------------------------------

    if (isLoadingCashFlow) {
        return(
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="mt-4 text-gray-600">Generating Cash Flow Report...</p>
                </div>
            </div>
        );
    }

    if (cashFlowError) {
        return(
            <div>
                <Link
                    to="/reports"
                    className="fixed top-4 right-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                >
                    <span>⟵ Back to reports</span>
                </Link>
                <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
                        </svg>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Generating Cash Flow Report.</h2>
                        <button onClick={() => window.location.reload()}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }


// ------------------------------------------------------------------------------------



    return(
        <div className="min-h-screen bg-white">
            {/* Minimal Header */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className={spinningStyles.terminalBar.spinner}>⠋</span>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">Reports Suite</h1>
                                <p className="text-sm text-gray-500">Cash Flow Report</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                        <Link 
                            to="/reports"
                            className="text-sm text-black px-3 py-1 border border-gray-200 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
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

            <div className="p-8">
                <div className="max-w-5xl mx-auto">

                    <div className="mb-12">
                        <div className="flex items-start justify-between mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-blue-100">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-light text-gray-900 tracking-tight">Cash Flow</h1>
                                        <p className="text-gray-500 mt-2">Financial report</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-between gap-2 mb-4">
                                <div className="flex items-end gap-2">
                                    {/* Date Pickers */}
                                    <div className="flex gap-2">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Report Type:</label>
                                            <select
                                                className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                                            >
                                                {reportType}
                                            </select> 
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Period:</label>
                                            <select
                                                value={periodType}
                                                onChange={(e) => handlePeriodTypeChange(e.target.value as CashFlowPeriodTypes)}
                                                className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                                            >
                                                {periodOptions}
                                            </select> 
                                        </div>
                                    </div>

                                    {/* Generate Button */}
                                    <button
                                        onClick={handleGenerateReport}
                                        disabled={isLoadingCashFlow}
                                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {isLoadingCashFlow ? 'Generating...' : 'Generate'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {cashFlow && (
                        <CashFlowReport 
                            cashFlow={cashFlow}
                            periodType={periodType}
                        />
                    )}
                </div>
            </div>
        </div>
    );






};
export default CashFlowManagement;