import React, { useState } from "react";
import { buttons, labelStyles, layout, spinningStyles, text } from "../Constants/Styles";
import { SquarePen } from "lucide-react";
import { details } from "../../Customers/constants/Styles";
import { IncomeAndExpensesDetailsProps } from "../Constants/Types";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";


const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};



const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};










const IncomeAndExpensesDetails: React.FC<IncomeAndExpensesDetailsProps> = ({
    incomeAndExpense,
    isLoading,
    onBack,
    onEdit,
    accounts,
    onCreateJournalEntry,
    isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const incomeAndExpenseId = incomeAndExpense?.reference_number;


    if (isLoading) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <span className={spinningStyles.terminalBar.spinner}></span>
                <p className="mt-3 text-gray-600">fetching transaction...</p>
            </div>
        );
    }

    if (!incomeAndExpense) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Transaction Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load transaction.</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }







    return(
        <div className="w-full mx-auto page bg-white shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">
            <div className="min-w-full mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className={layout.tag}>
                    
                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    INCOME AND EXPENSES TRANSACTION
                                </p>
                                <p className={labelStyles}>
                                    {incomeAndExpense.formatted_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(incomeAndExpenseId)}
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                        </button>
                    <button
                        onClick={() => setIsJournalEntryOpen(true)}
                        className="bg-purple-900 text-white px-4 py-2 hover:bg-amber-900 rounded-lg flex items-center gap-2"
                    >
                        + Create Journal Entry
                    </button>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="bg-white shadow-sm">
                    <div className="p-10 space-y-10">

                        {/* <!-- Date & Status --> */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                                    Date
                                </h2>
                                <p className="text-xl font-semibold text-stone-900">{formatDate(incomeAndExpense.date)}</p>
                            </div>

                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                                    Category
                                </h2>
                                <span className={`inline-flex items-center px-4 py-2 ${incomeAndExpense.category ? 'bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold' : 'bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold'}`}>
                                    {incomeAndExpense.category ? 'INCOME' : 'EXPENSES'}
                                </span>
                            </div>

                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                                    Cancelled
                                </h2>
                                <span className={`inline-flex items-center px-4! py-2! ${
                                            incomeAndExpense.cancelled
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                }`}>
                                    {incomeAndExpense.cancelled ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-stone-200"></div>

                        {/* <!-- Account & Currency --> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                                    Account
                                </h2>
                                <p className="text-lg font-semibold text-stone-900">
                                    {incomeAndExpense.account.account_code} - ({incomeAndExpense.account.account_name}) - {incomeAndExpense.account.account_type}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">
                                    Currency
                                </h2>
                                <p className="text-lg font-semibold text-stone-900">{incomeAndExpense.currency}</p>
                            </div>
                        </div>

                        <div className="border-t border-stone-200"></div>

                        {/* <!-- Description --> */}
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-4">
                                Description
                            </h2>
                            <p className="text-stone-700 leading-relaxed">
                                {incomeAndExpense.description}
                            </p>
                        </div>

                        <div className="border-t border-stone-200"></div>

                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <dt className="text-sm text-stone-500 mb-2">Gross Debit(IN)</dt>
                                    <dd className="text-xl font-bold text-stone-900">{incomeAndExpense.gross_debit}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm text-stone-500 mb-2">Gross Credit(OUT)</dt>
                                    <dd className="text-xl font-bold text-stone-900">{incomeAndExpense.gross_credit}</dd>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-stone-200"></div>

                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-4">
                                        Tax(%)
                                    </h2>
                                    <p className="text-xl font-bold text-stone-900">{incomeAndExpense.tax}%</p>
                                </div>

                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-4">
                                        Tax Amount
                                    </h2>
                                    <p className="text-xl font-bold text-stone-900">({incomeAndExpense.tax_rate})</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-stone-900"></div>

                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 mb-6">
                                Net Amounts
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <dt className="text-sm text-stone-500 mb-2">Net Debit</dt>
                                    <dd className="text-xl font-bold text-stone-900">{incomeAndExpense.net_debit}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm text-stone-500 mb-2">Net Credit</dt>
                                    <dd className="text-xl font-bold text-stone-900">{incomeAndExpense.net_credit}</dd>
                                </div>
                            </div>

                            <div className="bg-stone-900 text-white p-6">
                                <dt className="text-xs font-bold uppercase tracking-widest text-white mb-2">
                                    Running Balance
                                </dt>
                                <dd className="text-4xl font-bold">{incomeAndExpense.running_balance}</dd>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />
                                                                        
                <div className="grid lg:grid-cols-5">
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Created by</a><br />
                        {incomeAndExpense.created_by || 'N/A'}
                    </p>

                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {incomeAndExpense.updated_by || 'N/A'}
                    </p>

                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatUpdatedDate(incomeAndExpense.date_updated) || 'N/A'}
                    </p>
                </div>

                <hr className="my-6 border-gray-200" />
            </div>
                <JournalEntryModal
                    isOpen={isJournalEntryOpen}
                    onClose={() => setIsJournalEntryOpen(false)}
                    onCreate={onCreateJournalEntry}
                    isSubmitting={isCreatingJournalEntry}
                    accounts={accounts}
                />
        </div>
    );
};
export default IncomeAndExpensesDetails;
