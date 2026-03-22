import React from "react";
import { EInvoiceSubmission,
    EInvoiceSubmissionHistoryTableProps } from "../constants/Types";
import EInvoiceStatusBadge from "../EInvoiceStatusBadge";



const EInvoiceSubmissionHistoryTable: React.FC<EInvoiceSubmissionHistoryTableProps> = ({
    submissions,
    onSubmissionClick,
}) => {




    if (submissions.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-200 mx-auto mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>No submissions found</p>
            </div>
        );
    }
    
        return (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            {['Reference', 'Type', 'Status', 'Environment', 'LHDN UUID', 'Submitted At', 'Last Checked'].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    style={{ fontFamily: 'Montserrat, system-ui' }}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {submissions.map((submission) => (
                            <tr
                                key={submission.id}
                                onClick={() => onSubmissionClick(submission.id)}
                                className="hover:bg-purple-50 hover:border-purple-100 cursor-pointer transition-colors duration-150"
                            >
                                <td className="px-4 py-3">
                                    <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        {submission.internal_document_reference || '—'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        {submission.document_type}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <EInvoiceStatusBadge status={submission.status} />
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-lg border font-medium ${
                                        submission.environment === 'Production'
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    }`} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        {submission.environment}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs text-gray-400 font-mono">
                                        {submission.lhdn_uuid
                                            ? `${submission.lhdn_uuid.substring(0, 8)}...`
                                            : '—'
                                        }
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        {submission.submitted_at
                                            ? new Date(submission.submitted_at).toLocaleString('en-MY')
                                            : '—'
                                        }
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        {submission.status_last_checked
                                            ? new Date(submission.status_last_checked).toLocaleString('en-MY')
                                            : '—'
                                        }
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

};
export default EInvoiceSubmissionHistoryTable;
