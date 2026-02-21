import React from "react";
import { buttons, tables } from "../constants/Styles";
import { BadgeCent, SquarePen } from "lucide-react";
import { JobCostLedgerDetailsProps } from "../constants/Types";


const formatNumber = () => {
    //const currentYear = new Date().getFullYear();
    return `JOB-0-`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};

const formatBoqNumber = () => {
    const currentYear = new Date().getFullYear();
    return `BOQ-${currentYear}-`;
};

function getCostTypeClasses(costType: string) {
  const typeClasses: any = {
    'Direct Cost': 'bg-blue-50 text-blue-700 border-blue-200',
    'Indirect Cost': 'bg-amber-50 text-amber-700 border-amber-200',
    'Overhead': 'bg-purple-50 text-purple-700 border-purple-200'
  };
  return typeClasses[costType] || 'bg-slate-50 text-slate-700 border-slate-200';
}

function getStatusClasses(status: string) {
  const statusClasses: any = {
    'Active': 'bg-emerald-100 text-emerald-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'On Hold': 'bg-amber-100 text-amber-800',
    'Committed': 'bg-slate-100 text-slate-700',
    'Invoiced': 'bg-blue-100 text-blue-700',
    'Paid': 'bg-emerald-100 text-emerald-700'
  };
  return statusClasses[status] || 'bg-slate-100 text-slate-700';
}










const JobCostLedgerDetails: React.FC<JobCostLedgerDetailsProps> = ({
    jobCostLedger,
    isLoading,
    onBack,
    onEdit }) => {
    const jobCostLedgerId = jobCostLedger?.job_cost_number;


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading job cost ledger...</p>
            </div>
        );
    }


    if (!jobCostLedger) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Cost Ledger Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load job cost ledger.</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <button 
                        onClick={onBack}
                        className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">JOB-0-{jobCostLedger.job_cost_number}</h2>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="text-sm text-gray-500">Job cost details</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => onEdit(jobCostLedgerId)}
                        className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
                <div className="flex-1">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                                Job Cost Number
                            </span>
                            <span className="text-base font-bold text-slate-900">
                                JOB-0-{jobCostLedger.job_cost_number}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                Date
                            </span>
                            <span className="text-base font-medium text-slate-900">
                                {formatDate(jobCostLedger.date)}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                Project
                            </span>
                            <span className="text-base font-medium text-slate-900">
                                {formatProjectNumber()}{jobCostLedger.project} | {jobCostLedger.project_name}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs font-semibold w-fit text-slate-500 uppercase tracking-wider mb-1">
                                Status
                            </span>
                            <span className={`inline-flex items-center w-fit px-3 py-1 rounded-full text-sm font-medium ${
                                jobCostLedger.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                jobCostLedger.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                jobCostLedger.status === 'On Hold' ? 'bg-red-100 text-red-800' :
                                'bg-slate-50 text-slate-700 border-slate-200'
                            }`}>
                                {jobCostLedger.status}
                            </span>
                        </div>

                        <div className="mt-6">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                                Description
                            </span>
                            <p className="text-sm text-slate-700">{jobCostLedger.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Estimation Reference --> */}
            <div className="bg-blue-50 rounded-xl shadow-md border-2 border-blue-200 p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-500 rounded-lg p-3">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                                Related PROJECT BUDGET
                            </div>
                            <div className="text-lg font-bold text-blue-900 text-left">
                                {formatProjectNumber()}{jobCostLedger.project}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                            Budget Amount
                        </div>
                        <div className="text-2xl font-bold text-blue-900">
                            {jobCostLedger.project_budget}
                        </div>
                    </div>
                </div>
                <br /> <br />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-500 rounded-lg p-3">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                                BOQ Estimation Reference
                            </div>
                            <div className="text-lg font-bold text-blue-900 text-left">
                                {formatBoqNumber()}{jobCostLedger.boq_estimation}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                            BOQ Estimated Amount
                        </div>
                        <div className="text-2xl font-bold text-blue-900">
                            {jobCostLedger.boq_estimated_amount}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <!-- Cost Summary Cards --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Total Actual Cost
                        </span>
                        <BadgeCent size={16} className="text-amber-500" /> 
                    </div>
                    <div className="text-2xl font-bold text-left text-slate-900">{jobCostLedger.total_actual_cost}</div>
                    <div className="text-xs text-slate-500 text-left mt-1">Sum of all cost line items</div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Net Variance
                        </span>
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                        </svg>
                    </div>
                    <div className="text-4xl text-left font-bold">{jobCostLedger.net_variance}</div>
                    <div className="text-xs text-left text-slate-500 mt-1">Actual Cost - BOQ Estimation</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-lg text-left font-bold text-slate-900">Cost Line Items</h2>
                    <p className="text-sm text-slate-600 text-left mt-1">Detailed breakdown of all cost entries</p>
                </div>

                {jobCostLedger.job_cost_ledger && jobCostLedger.job_cost_ledger.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-700 text-white">
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">#</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-30">Cost Code</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-50">Description</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-37.5">Supplier</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-30">Cost Type</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-25">Status</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-32.5">Cost</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-25">Tax (%)</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-32.5">Total Cost</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-slate-200">

                            {jobCostLedger.job_cost_ledger.map((line: any, index: any) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className="px-4 py-3 text-sm text-slate-900 font-medium">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm text-center font-semibold text-slate-900">{line.cost_code?.job_cost_code}</div>
                                        <div className="text-xs text-center text-slate-500">{line.cost_code?.job_cost_description}</div>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm text-slate-700">{line.description}</td>
                                    <td className="px-4 py-3 text-center text-sm text-slate-700">{line.supplier || 'N/A'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex text-center px-2 py-1 text-xs font-medium rounded border ${
                                            line.cost_type === 'Direct Cost' ? 'bg-blue-50 text-blue-700 border-blue-200':
                                            line.cost_type === 'Indirect Cost' ? 'bg-amber-50 text-amber-700 border-amber-200':
                                            line.cost_type === 'Overhead' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            'bg-slate-50 text-slate-700 border-slate-200'
                                        }`}>
                                            {line.cost_type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex text-center px-2 py-1 text-xs font-semibold rounded-full ${
                                            line.status === 'Committed' ? 'bg-yellow-100 text-yellow-800' :
                                            line.status === 'Invoiced' ? 'bg-blue-100 text-blue-800' :
                                            line.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                            'bg-slate-50 text-slate-700 border-slate-200'
                                            }`}>
                                            {line.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center font-semibold text-slate-900 ">{line.cost}</td>
                                    <td className="px-4 py-3 text-sm text-center font-medium text-slate-700 ">{line.tax}%</td>
                                    <td className="px-4 py-3 text-sm text-center font-bold text-slate-900 ">{line.total_cost}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


            {/* <!-- Metadata Footer --> */}
            <div className="mt-6 bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Created By
                        </span>
                        <span className="text-sm font-medium text-slate-900">{jobCostLedger.created_by}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Date Created
                        </span>
                        <span className="text-sm font-medium text-slate-900">{formatDate(jobCostLedger.date_created)}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Updated By
                        </span>
                        <span className="text-sm font-medium text-slate-900">{jobCostLedger.updated_by}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Date Updated
                        </span>
                        <span className="text-sm font-medium text-slate-900">{formatDate(jobCostLedger.date_updated)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default JobCostLedgerDetails;
