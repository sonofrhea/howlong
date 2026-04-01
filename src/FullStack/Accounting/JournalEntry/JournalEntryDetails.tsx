import React from "react";
import { buttons, forms, labelStyles, layout, spinningStyles, tables, text } from "../Constants/Styles";
import { SquarePen } from "lucide-react";
import { details } from "../../Core/constants/Styles";
import { JournalEntryDetailsProps } from "../Constants/Types";





const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};





const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};














const JournalEntryDetails: React.FC<JournalEntryDetailsProps> = ({
    journalEntry,
    isLoading,
    onBack,
    onEdit
}) => {
    const journalEntryId = journalEntry?.journal_number;



    if (isLoading) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <span className={spinningStyles.terminalBar.spinner}></span>
                <p className="mt-3 text-gray-600">fetching journal entry...</p>
            </div>
        );
    }

    if (!journalEntry) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Journal Entry Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load journal entry.</p>
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
                                    JOURNAL ENTRY DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {journalEntry.formatted_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(journalEntryId)}
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                        </button>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <a className={details.extraSmallUppercase}>JOURNAL No</a><br />
                            {journalEntry.formatted_number}
                        </div>

                        <div>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {formatDate(journalEntry.date)}
                        </div>

                        <div>
                            <a className={details.extraSmallUppercase}>Cancelled</a><br />
                            <p 
                                className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                            journalEntry.cancelled
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                            }`}>
                                {journalEntry.cancelled ? 'Yes' : 'No'}
                            </p>
                        </div>
                    </div>

                    <div className="m-10">
                        <a className={details.extraSmallUppercase}>Description</a><br />
                        {journalEntry.description}
                    </div>

                    {/* ENTRIES */}
                    {journalEntry.journal_entries && journalEntry.journal_entries.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <colgroup>
                                        {[
                                            'w-[8%] text-center',
                                            'w-[29%] text-center',
                                            'w-[29%] text-center',
                                            'w-[13%] text-center',
                                            'w-[13%] text-center',
                                            'w-[7%] text-center',
                                        ].map((line, index) => (
                                            <col key={index} className={line} />
                                        ))}
                                    </colgroup>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Account</th>
                                            <th className={tables.headerCell}>Account Details</th>
                                            <th className={tables.headerCell}>Description</th>
                                            <th className={tables.headerCell}>Debit</th>
                                            <th className={tables.headerCell}>Credit</th>
                                            <th className={tables.headerCell}>Cancelled</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">

                                        {journalEntry.journal_entries.map((line: any, index: any) => (
                                            <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                                <td className={tables.cell}>{line.account.account_code}</td>
                                                <td className={tables.cell}>{line.account.account_name}</td>
                                                <td className={tables.cell}>{line.description}</td>
                                                <td className={tables.cell}>{line.net_debit}</td>
                                                <td className={tables.cell}>{line.net_credit}</td>
                                                <td className={tables.cell}>{line.cancelled ? 'Yes' : 'No'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-white divide-y divide-gray-100">
                                        <tr className="bg-white divide-y divide-x divide-gray-100">
                                            <td colSpan={3} className="text-right">
                                                Totals:
                                            </td>

                                            <td className="text-black">
                                                {journalEntry.aggregate_debit}
                                            </td>

                                            <td className="text-black">
                                                {journalEntry.aggregate_credit}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <hr className="my-6 border-gray-200" />
                                                        
                <div className="grid lg:grid-cols-5">
                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Created by</a><br />
                        {journalEntry.created_by || 'N/A'}
                    </p>

                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {journalEntry.updated_by || 'N/A'}
                    </p>

                    <p className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatUpdatedDate(journalEntry.date_updated) || 'N/A'}
                    </p>
                </div>

                <hr className="my-6 border-gray-200" />
            </div>
        </div>
    );
};
export default JournalEntryDetails;
