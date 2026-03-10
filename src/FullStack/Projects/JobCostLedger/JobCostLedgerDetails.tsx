import React from "react";
import { buttons } from "../constants/Styles";
import { BadgeCent, SquarePen, TrendingUp, TrendingDown } from "lucide-react";
import { JobCostLedgerDetailsProps } from "../constants/Types";

const formatNumber = () => {
    //const currentYear = new Date().getFullYear();
    return `JOB-0-`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};

const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};

const formatBoqNumber = () => {
    const currentYear = new Date().getFullYear();
    return `BOQ-${currentYear}-`;
};



const getMainStatusClasses = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase border";
    switch(status) {
        case 'Active': return `${baseClasses} bg-emerald-100 text-emerald-800 border-emerald-200`;
        case 'Completed': return `${baseClasses} bg-blue-100 text-blue-800 border-blue-200`;
        case 'On Hold': return `${baseClasses} bg-amber-100 text-amber-800 border-amber-200`;
        default: return `${baseClasses} bg-slate-100 text-slate-800 border-slate-200`;
    }
};

const getVarianceDisplay = (variance: string) => {
    const numVariance = parseFloat(variance.replace(/[^\d.-]/g, ''));
    if (numVariance > 0) {
        return (
            <span className="text-emerald-600 font-bold flex items-center justify-end gap-1">
                +{variance} <TrendingUp size={14} />
            </span>
        );
    } else if (numVariance < 0) {
        return (
            <span className="text-red-600 font-bold flex items-center justify-end gap-1">
                {variance} <TrendingDown size={14} />
            </span>
        );
    } else {
        return (
            <span className="text-blue-600 font-bold flex items-center justify-end gap-1">
                {variance}
            </span>
        );
    }
};













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
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            
            {/* Header Section */}
            <div className="bg-slate-900 px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="bg-slate-800 hover:bg-slate-700 hover:border-white hover:border-2 text-white p-2.5 rounded-lg transition-colors border border-slate-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">JOB-0-{jobCostLedger.job_cost_number}</h1>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Job Cost Ledger Details</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => onEdit(jobCostLedgerId)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-white  hover:text-black text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-emerald-900/20 border border-emerald-500"
                    >
                        <SquarePen size={20} strokeWidth={1.5} />
                        Edit Ledger
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-slate-200 bg-slate-50/50">

                <div className="p-6 border-r border-slate-200 bg-blue-50/50 hover:cursor-pointer">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Project Name</span>
                    <span className="text-lg font-bold text-blue-900 leading-tight">{formatProjectNumber()}{jobCostLedger.project} | {jobCostLedger.project_name}</span>
                </div>
                <div className="p-6 border-r border-slate-200 bg-blue-50/50 hover:cursor-pointer">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Ledger Date</span>
                    <span className="text-lg font-bold text-blue-900">{formatDate(jobCostLedger.date)}</span>
                </div>
                <div className="p-6 border-r border-slate-200 bg-blue-50/50 hover:cursor-pointer">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Project Budget</span>
                    <span className="text-2xl font-black text-blue-900">{jobCostLedger.project_budget}</span>
                </div>
                <div className="p-6 bg-blue-50/50 hover:cursor-pointer">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Status</span>
                    <span className={getMainStatusClasses(jobCostLedger.status)}>
                        {jobCostLedger.status}
                    </span>
                </div>
            </div>


            <div className="px-6 py-4 bg-white border-b border-slate-100 text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Description</span>
                <a className="text-slate-700 font-medium">{jobCostLedger.description}</a>
            </div>


            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-blue-600 rounded-xl p-5 text-white flex hover:cursor-pointer justify-between items-center shadow-lg shadow-blue-200">

                    <div className="text-left">
                        <span className="text-white text-xs font-bold uppercase tracking-wider block">BOQ Reference</span>
                        <span className="text-xl font-bold">{formatBoqNumber()}{jobCostLedger.boq}</span>
                    </div>

                    <div className="text-right">
                        <span className="text-white text-xs font-bold uppercase tracking-wider block">BOQ Est. Amount</span>
                        <span className="text-xl text-right font-bold">{jobCostLedger.boq_estimated_amount}</span>
                    </div>

                </div>

                <div className="bg-slate-900 rounded-xl p-5 hover:cursor-pointer text-white flex justify-between items-center shadow-lg shadow-slate-200">

                    <div className="text-left">
                        <span className="text-white text-xs font-bold uppercase tracking-wider block">Total Actual Cost</span>
                        <span className="text-xl font-bold">{jobCostLedger.total_actual_cost}</span>
                    </div>

                    <div className="text-right">
                        <span className="text-white text-xs font-bold uppercase tracking-wider block">Net Variance</span>
                        <span className={`text-xl font-bold flex items-center gap-1 justify-end ${
                            parseFloat(jobCostLedger.net_variance.replace(/[^\d.-]/g, '')) >= 0 
                                ? 'text-emerald-400' 
                                : 'text-red-400'
                        }`}>
                            {jobCostLedger.net_variance}
                            {parseFloat(jobCostLedger.net_variance.replace(/[^\d.-]/g, '')) >= 0 
                                ? <TrendingUp size={18} /> 
                                : <TrendingDown size={18} />
                            }
                        </span>
                    </div>

                </div>
            </div>

            {/* Table Section - WITH FIXED WIDTH COLUMNS */}
            <div className="px-6 pb-6">
                <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                            Cost Line Items
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed divide-y divide-gray-200">
                            <colgroup>
                            {[
                                'w-[2%] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[5%] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                                'w-[1/13] text-center',
                            ].map((line, index) => (
                                <col key={index} className={line} />    
                            ))}
                            </colgroup>
                            <thead>
                                <tr className="bg-slate-700 text-white hover:cursor-pointer text-[10px] uppercase tracking-[0.15em] font-black border-b border-slate-200">
                                    <th className="px-4 py-4 text-center">#</th>
                                    <th className="px-4 py-4 text-center">BOQ Line / Item</th>
                                    <th className="px-4 py-4 text-center">Cost Code</th>
                                    <th className="px-4 py-4 text-center">Description</th>
                                    <th className="px-4 py-4 text-center">Supplier</th>
                                    <th className="px-4 py-4 text-center">Type</th>
                                    <th className="px-4 py-4 text-center">Status</th>
                                    <th className="px-4 py-4 text-center">Cost</th>
                                    <th className="px-4 py-4 text-center">Tax%</th>
                                    <th className="px-4 py-4 text-center">Total (Inc Tax)</th>
                                    <th className="px-4 py-4 text-center">Accum. Paid</th>
                                    <th className="px-4 py-4 text-center">Estimated</th>
                                    <th className="px-4 py-4 text-center">Variance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {jobCostLedger.job_cost_ledger && jobCostLedger.job_cost_ledger.length > 0 ? (
                                    jobCostLedger.job_cost_ledger.map((line, index) => (
                                        <tr key={index} className="hover:bg-slate-50 hover:cursor-pointer transition-colors">
                                            <td className="px-4 py-4 text-center text-slate-400">{index + 1}</td>

                                            <td className="px-4 py-4 ">
                                                <div className="text-slate-900 font-bold">{line.boq_line}</div>
                                                <div className="text-slate-500 text-xs truncate">{line.boq_line_item}</div>
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="text-slate-900">{line.cost_code?.job_cost_code || 'N/A'}</div>
                                                <div className="text-slate-400 text-[10px] uppercase font-bold truncate">{line.cost_code?.job_cost_description || ''}</div>
                                            </td>

                                            <td className="px-4 py-4 text-slate-600 text-sm italic  truncate">{line.description}</td>

                                            <td className="px-4 py-4 text-slate-900 truncate">{line.supplier || 'N/A'}</td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase inline-flex items-center justify-center w-full ${
                                                    line.cost_type === 'Direct Cost' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                    line.cost_type === 'Indirect Cost' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    line.cost_type === 'Overhead' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                    'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}>
                                                    {line.cost_type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-flex items-center justify-center w-full ${
                                                    line.status === 'Paid' ? 'bg-green-100 text-green-800 text-center' :
                                                    line.status === 'Invoiced' ? 'bg-blue-100 text-blue-800 text-center' :
                                                    line.status === 'Committed' ? 'bg-black text-yellow-400 text-center' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {line.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center font-bold text-slate-900">{line.cost}</td>
                                            <td className="px-4 py-4 text-center font-bold text-slate-900">{line.tax}%</td>
                                            <td className="px-4 py-4 text-center font-bold text-slate-900">{line.total_cost}</td>
                                            <td className="px-4 py-4 text-center font-bold text-blue-600">{line.total_paid}</td>
                                            <td className="px-4 py-4 text-center font-bold text-slate-600">{line.estimated}</td>
                                            <td className="px-4 py-4 text-center font-bold">{getVarianceDisplay(line.variance)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={11} className="px-4 py-8 text-center text-slate-500">
                                            No cost line items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Metadata Footer */}
            <div className="bg-slate-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-200">
                <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Created By</span>
                    <span className="text-sm font-bold text-slate-700">{jobCostLedger.created_by}</span>
                </div>
                <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Date Created</span>
                    <span className="text-sm font-bold text-slate-700">{formatDate(jobCostLedger.date_created)}</span>
                </div>
                <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Updated By</span>
                    <span className="text-sm font-bold text-slate-700">{jobCostLedger.updated_by}</span>
                </div>
                <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Date Updated</span>
                    <span className="text-sm font-bold text-slate-700">{formatDate(jobCostLedger.date_updated)}</span>
                </div>
            </div>
        </div>
    );
};

export default JobCostLedgerDetails;