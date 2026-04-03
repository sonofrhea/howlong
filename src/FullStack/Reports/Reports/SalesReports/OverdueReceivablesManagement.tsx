import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchOverdueReceivablesByCustomer,
    fetchOverdueReceivablesSummary
 } from "../../Engines";

import { spinningStyles } from "../../constants/Styles";



import OverdueReceivablesReport from "./OverdueReceivablesReport";
import { ChartNoAxesCombined } from "lucide-react";





function OverdueReceivablesManagement() {

    const { data: summary, isLoading: loadingSummary, error: summaryError, } = useQuery({
        queryKey: ['overdueReceivablesSummary'],
        queryFn: fetchOverdueReceivablesSummary,
    });

    const { data: customers, isLoading: loadingCustomers, error: customersError, } = useQuery({
        queryKey: ['overdueReceivablesByCustomer'],
        queryFn: fetchOverdueReceivablesByCustomer,
    });


    const isLoading = loadingSummary || loadingCustomers;
    const hasError = summaryError || customersError;


    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="mt-4 text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        Generating Overdue Receivables...
                    </p>
                </div>
            </div>
        );
    }

    if (hasError) {
        return (
            <div>
                <Link
                    to="/reports"
                    className="fixed top-4 right-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold font-[Montserrat]! text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                >
                    <span>⟵ Back to reports</span>
                </Link>
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 font-[Montserrat]!">Error loading report</h2>
                        <p className="text-gray-600 font-[Montserrat]!">Failed to load overdue receivables. Please try again.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-[Montserrat]!"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, system-ui' }}>

            {/* Header */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className={spinningStyles.terminalBar.spinner}><ChartNoAxesCombined /></span>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900 font-['Montserrat']!">Reports Suite</h1>
                                <p className="text-sm text-gray-500 font-['Montserrat']!">Overdue Receivables</p>
                            </div>
                        </div>
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

            {/* Content */}
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-light text-left text-gray-900 tracking-tight font-['Montserrat']!">
                                    Overdue Receivables
                                </h1>
                                <p className="text-gray-500 mt-1 font-medium text-left font-['Montserrat']!">
                                    Aged receivables report · as of {summary?.as_of}
                                </p>
                            </div>
                        </div>
                    </div>

                    {summary && customers && (
                        <OverdueReceivablesReport
                            summary={summary}
                            customers={customers}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default OverdueReceivablesManagement;

