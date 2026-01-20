import React from 'react';
import { Link } from 'react-router-dom';
import { ReportsModulesInterface } from './constants/Types';
import { REPORTS_ICONS } from './constants/ModuleIcons';










function ReportsAndReceiptsDashboard() {
    const ReportsAndReceiptsModule: ReportsModulesInterface[] = [
        {
            id: 'generalLedger',
            name: 'General Ledger',
            description: "Company's General Ledger Report",
            path: '/reports/general-ledger',
            available: true
        },
        {
            id: 'trialBalance',
            name: 'Trial Balance',
            description: "Company's Trial Balance",
            path: '/reports/trial-balance',
            available: true
        },
        {
            id: 'incomeStatement',
            name: 'Income Statement',
            description: "Company's Income Statement(Profit and Loss)",
            path: '/reports/income-statement',
            available: true
        },
        {
            id: 'balanceSheet',
            name: 'Balance Sheet',
            description: "Company's Balance Sheet",
            path: '/reports/balance-sheet',
            available: true
        },
        {
            id: 'cashFlow',
            name: 'Cash Flow',
            description: "Company's Cash Flow Report",
            path: '/reports/cashflow',
            available: true
        },
        {
            id: 'receiptRecords',
            name: 'Receipt Records and History',
            description: "Company's Uploaded Receipt Files and Records",
            path: '/reports/receipt-records',
            available: false
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Projects Management
                    </h1>
                    <p className="text-gray-600">
                        Choose a module to get started
                    </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {ReportsAndReceiptsModule.map(module => (
                        <Link
                            key={module.id}
                            to={module.available ? module.path : '#'}
                            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${
                                module.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                                module.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                                <ModuleIcon moduleId={module.id} />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {module.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {module.description}
                            </p>

                            {/* Status */}
                            <div className={`text-sm font-medium ${
                                module.available ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                                {module.available ? 'Open Module ⟶' : 'Coming Soon'}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
    
    const ModuleIcon = ({ moduleId }: {moduleId: keyof typeof REPORTS_ICONS}) => {
        return REPORTS_ICONS[moduleId] || null;
    };
        
export default ReportsAndReceiptsDashboard;