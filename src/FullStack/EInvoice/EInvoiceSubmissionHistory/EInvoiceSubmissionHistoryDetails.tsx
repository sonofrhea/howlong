import React from "react";
import { EInvoiceSubmission,
    EInvoiceSubmissionHistoryDetailsProps } from "../constants/Types";
import EInvoiceStatusBadge from "../EInvoiceStatusBadge";
import EInvoiceQRCode from "../EInvoiceQRCode";









const EInvoiceSubmissionHistoryDetails: React.FC<EInvoiceSubmissionHistoryDetailsProps> = ({
    submission,
    isLoading,
    onBack,
}) => {




    
    if (isLoading) return (
        <div className="flex items-center justify-center py-16">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>Loading submission details...</p>
        </div>
    );

    if (!submission) return (
        <div className="flex items-center justify-center py-16">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>Submission not found.</p>
        </div>
    );

    const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, system-ui' }}>{label}</span>
            <span className="text-sm text-gray-800" style={{ fontFamily: 'Montserrat, system-ui' }}>{value || '—'}</span>
        </div>
    );

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-8">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-light text-gray-900" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            {submission.internal_document_reference}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>{submission.document_type}</span>
                            <span className="text-gray-300">•</span>
                            <EInvoiceStatusBadge status={submission.status} />
                            <span className="text-gray-300">•</span>
                            <span className={`text-xs px-2 py-1 rounded-lg border font-medium ${
                                submission.environment === 'Production'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                {submission.environment}
                            </span>
                        </div>
                    </div>
                </div>

                {/* QR Code — only when valid */}
                {submission.validation_url && submission.lhdn_uuid && (
                    <EInvoiceQRCode
                        validationUrl={submission.validation_url}
                        lhdnUuid={submission.lhdn_uuid}
                        documentReference={submission.internal_document_reference}
                    />
                )}
            </div>

            <hr className="border-gray-100" />

            {/* LHDN Identity */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4" style={{ fontFamily: 'Montserrat, system-ui' }}>LHDN Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, system-ui' }}>LHDN UUID</span>
                        <span className="text-sm text-gray-800 font-mono break-all">{submission.lhdn_uuid || '—'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, system-ui' }}>Submission UID</span>
                        <span className="text-sm text-gray-800 font-mono break-all">{submission.lhdn_submission_uid || '—'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, system-ui' }}>Long UID</span>
                        <span className="text-sm text-gray-800 font-mono break-all">{submission.lhdn_long_uid || '—'}</span>
                    </div>
                    {submission.validation_url && (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, system-ui' }}>Validation URL</span>
                            <a
                                href={submission.validation_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline break-all"
                                style={{ fontFamily: 'Montserrat, system-ui' }}
                            >
                                {submission.validation_url}
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Timestamps */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4" style={{ fontFamily: 'Montserrat, system-ui' }}>Timeline</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Field label="Created" value={new Date(submission.date_created).toLocaleString('en-MY')} />
                    <Field label="Submitted At" value={submission.submitted_at ? new Date(submission.submitted_at).toLocaleString('en-MY') : null} />
                    <Field label="Last Checked" value={submission.status_last_checked ? new Date(submission.status_last_checked).toLocaleString('en-MY') : null} />
                    <Field label="Retry Count" value={submission.retry_count} />
                </div>
            </div>

            {/* Validation Errors */}
            {submission.validation_errors && (
                <>
                    <hr className="border-gray-100" />
                    <div>
                        <h3 className="text-sm font-medium text-red-600 mb-3" style={{ fontFamily: 'Montserrat, system-ui' }}>Validation Errors</h3>
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                            <p className="text-sm text-red-700 whitespace-pre-wrap" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                {submission.validation_errors}
                            </p>
                        </div>
                    </div>
                </>
            )}

            {/* Error Details */}
            {submission.error_details && (
                <>
                    <hr className="border-gray-100" />
                    <div>
                        <h3 className="text-sm font-medium text-yellow-700 mb-3" style={{ fontFamily: 'Montserrat, system-ui' }}>Error Details</h3>
                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                            <p className="text-sm text-yellow-800 whitespace-pre-wrap" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                {submission.error_details}
                            </p>
                        </div>
                    </div>
                </>
            )}

            {/* Cancellation Info */}
            {submission.cancellation_reason && (
                <>
                    <hr className="border-gray-100" />
                    <div>
                        <h3 className="text-sm font-medium text-orange-600 mb-3" style={{ fontFamily: 'Montserrat, system-ui' }}>Cancellation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Cancelled At" value={submission.cancelled_at ? new Date(submission.cancelled_at).toLocaleString('en-MY') : null} />
                            <Field label="Reason" value={submission.cancellation_reason} />
                        </div>
                    </div>
                </>
            )}

            {/* Rejection Info */}
            {submission.rejection_reason && (
                <>
                    <hr className="border-gray-100" />
                    <div>
                        <h3 className="text-sm font-medium text-rose-600 mb-3" style={{ fontFamily: 'Montserrat, system-ui' }}>Rejection by Buyer</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Rejected At" value={submission.rejected_at ? new Date(submission.rejected_at).toLocaleString('en-MY') : null} />
                            <Field label="Reason" value={submission.rejection_reason} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EInvoiceSubmissionHistoryDetails;

