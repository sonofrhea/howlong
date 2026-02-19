import React, { useState } from "react";
import { buttons, spinningStyles } from "../Constants/Styles";
import { CashBookDetailsProps } from "../Constants/Types";
import { SquarePen } from "lucide-react";

import JournalEntryModal from "../JournalEntry/JournalEntryModal";


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CASH-${currentYear}-`
}


const CashBookDetails: React.FC<CashBookDetailsProps> = ({
    cashBook,
    isLoading,
    onBack,
    onEdit,
    accounts,
    onCreateJournalEntry,
    isCreatingJournalEntry
}) => {
    const cashBookId = cashBook?.reference_number;
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);

    if (isLoading) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <span className={spinningStyles.terminalBar.spinner}></span>
                <p className="mt-3 text-gray-600">fetching transaction...</p>
            </div>
        );
    }

    if (!cashBook) {
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
        <div className="min-w-full mx-auto page bg-gray-50 shadow-lg rounded-2xl overflow-hidden">

            <div className="max-w-9xl mx-auto px-6 py-10">

                {/* <!-- Transaction Type & Date --> */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="inline-flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full">
                            {cashBook.transaction_type}
                        </span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-sm text-neutral-600">
                            {formatDate(cashBook.date)}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(cashBookId)}
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} 
                            className="cursor-pointer"/>
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
                                    

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    <div className="lg:col-span-3 space-y-8">

                        {/* <!-- Transaction Info Card --> */}
                        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
                                <h2 className="text-left font-semibold text-neutral-900">Transaction Details</h2>
                            </div>
                            <div className="p-6">
                                <dl className="space-y-5">
                                    <div className="text-left">
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                                            Payment To/From
                                        </dt>
                                        <dd className="text-base text-neutral-900">
                                            {cashBook.payment_to_or_from || 'N/A'}
                                        </dd>
                                    </div>

                                    <div className="text-left">
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                                            Description
                                        </dt>
                                        <dd className="text-base text-neutral-700 leading-relaxed">
                                            {cashBook.description || 'N/A'}
                                        </dd>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">

                                        <div className="text-left">
                                            <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                                                Account
                                            </dt>
                                            <dd className="text-base text-neutral-900">
                                                {cashBook.account?.account_code || 'N/A'} - ({cashBook.account?.account_name || 'N/A'}) - {cashBook.account?.account_type || 'N/A'}
                                            </dd>
                                        </div>

                                        <div className="text-center">
                                            <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                                                Currency
                                            </dt>
                                            <dd className="text-base text-neutral-900">
                                                {cashBook.currency || 'N/A'}
                                            </dd>
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* <!-- Financial Summary Card --> */}
                        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
                                <h2 className="font-semibold text-left text-neutral-900">Financial Summary</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-3 gap-6">

                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                                            Net Debit
                                        </dt>
                                        <dd className="text-3xl font-semibold text-neutral-900">
                                            {cashBook.net_debit}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                                            Net Credit
                                        </dt>
                                        <dd className="text-3xl font-semibold text-neutral-900">
                                            {cashBook.net_credit}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                                            Running Balance
                                        </dt>
                                        <dd className="text-3xl font-semibold text-neutral-600">
                                            {cashBook.running_balance}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Remark Card --> */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                            <dt className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2">
                                Remark
                            </dt>
                            <dd className="text-sm text-amber-800">
                                {cashBook.remark}
                            </dd>
                        </div>
                    </div>

                    {/* <!-- Sidebar --> */}
                    <div className="space-y-4">

                        {/* <!-- Recorded By Card --> */}
                        <div className="bg-white border border-neutral-200 rounded-xl p-4">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
                                Recorded By
                            </h3>
                            <div className="items-center">
                                <div >
                                    <p className="text-center font-medium text-neutral-900">
                                        {cashBook.recorded_by}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Reference Number --> */}
                        <div className="bg-white border border-neutral-200 rounded-xl p-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                                Reference Number
                            </h3>
                            <p className="text-2xl font-mono font-semibold text-neutral-900">
                                {formatNumber()}{cashBook.reference_number}
                            </p>
                        </div>
                    </div>
                </div>
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
export default CashBookDetails;
