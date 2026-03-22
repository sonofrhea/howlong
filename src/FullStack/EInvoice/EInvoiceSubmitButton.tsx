import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { EInvoiceSubmitButtonProps } from "./constants/Types";
import { cancelCreditNoteFromLHDN, cancelDebitNoteFromLHDN,
    cancelInvoiceFromLHDN, cancelRefundFromLHDN,
    submitCreditNoteToLHDN, submitDebitNoteToLHDN,
    submitInvoiceToLHDN, submitRefundToLHDN } from "./Engines";





const EInvoiceSubmitButton: React.FC<EInvoiceSubmitButtonProps> = ({
    documentType,
    documentId,
    einvoiceStatus,
    einvoiceEnabled,
    onSubmitSuccess,
    onCancelSuccess,
    lhdnUuid,
    submittedAt,
}) => {
    const queryClient = useQueryClient();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');


    const canCancel = (): boolean => {
        if (einvoiceStatus !== 'Valid') return false;
        if (!submittedAt) return false;
        const submitted = new Date(submittedAt).getTime();
        const now = Date.now();
        const hours72 = 72 * 60 * 60 * 1000;
        return now - submitted < hours72
    };


    const submitMutation = useMutation({
        mutationFn: async () => {
            switch (documentType) {
                case 'Invoice': return submitInvoiceToLHDN(documentId);
                case 'Credit Note': return submitCreditNoteToLHDN(documentId);
                case 'Debit Note': return submitDebitNoteToLHDN(documentId);
                case 'Refund Note': return submitRefundToLHDN(documentId);
            }
        },
        onMutate: () => {
            toast.loading(`Submitting ${documentType} to LHDN...`, { id: 'einvoice-submit' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['einvoice-submissions'] });
            onSubmitSuccess();
            toast.success(`${documentType} submitted to LHDN successfully.`, { id: 'einvoice-submit' });
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.error || `Failed to submit ${documentType} to LHDN.`;
            toast.error(msg, { id: 'einvoice-submit', duration: 8000 });
            console.log(msg);
        }
    });


    const cancelMutation = useMutation({
        mutationFn: async () => {
            switch (documentType) {
                case 'Invoice': return cancelInvoiceFromLHDN({invoice_number: documentId, reason: cancelReason});
                case 'Credit Note': return cancelCreditNoteFromLHDN({ credit_note_number: documentId, reason: cancelReason });
                case 'Debit Note': return cancelDebitNoteFromLHDN({ debit_note_number: documentId, reason: cancelReason });
                case 'Refund Note': return cancelRefundFromLHDN({ refund_number: documentId, reason: cancelReason });
            }
        },
        onMutate: () => {
            toast.loading(`Cancelling ${documentType} on LHDN...`, { id: 'einvoice-cancel' });
        },
        onSuccess: () => {
            toast.success(`${documentType} cancelled on LHDN.`, { id: 'einvoice-cancel' });
            setShowCancelModal(false);
            setCancelReason("");
            onCancelSuccess();
            queryClient.invalidateQueries({ queryKey: ['einvoice-submissions'] });
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.error || `Failed to cancel ${documentType}.`;
            toast.error(msg, { id: 'einvoice-cancel', duration: 8000 });
            console.log(msg);
        }
    });













    if (!einvoiceEnabled) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"  style={{ fontFamily: 'Montserrat, system-ui'}}/>
                </svg>
                e-Invoice Disabled
            </div>
        );
    }




    return (
        <>
        <style>
            {`
                @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
            `}
        </style>
        
            <div className="flex items-center gap-2">

                {/* Submit button — only when Not Submitted or Invalid */}
                {(einvoiceStatus === 'Not Submitted' || einvoiceStatus === 'Invalid') && (
                    <button
                        onClick={() => submitMutation.mutate()}
                        disabled={submitMutation.isPending}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        style={{ fontFamily: 'Montserrat, system-ui'}}
                    >
                        {submitMutation.isPending ? (
                            <>
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Submit to LHDN
                            </>
                        )}
                    </button>
                )}

                {/* Submitted — pending validation */}
                {einvoiceStatus === 'Submitted' && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-100 bg-blue-50 text-blue-500 text-sm" style={{ fontFamily: 'Montserrat, system-ui'}}>
                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Awaiting LHDN Validation
                    </div>
                )}

                {canCancel() && (
                    <button
                        onClick={() => setShowCancelModal(true)}
                        disabled={cancelMutation.isPending}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        style={{ fontFamily: 'Montserrat, system-ui'}}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel on LHDN
                    </button>
                )}

                {/* Valid but past 72hrs — show info */}
                {einvoiceStatus === 'Valid' && !canCancel() && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-green-100 bg-green-50 text-green-600 text-sm" style={{ fontFamily: 'Montserrat, system-ui'}}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Validated by LHDN
                    </div>
                )}
            </div>


            {/* Cancel Reason Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-full max-w-md mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div style={{ fontFamily: 'Montserrat, system-ui'}}>
                                <h3 className="text-lg font-medium text-gray-900" style={{ fontFamily: 'Montserrat, system-ui'}}>Cancel on LHDN</h3>
                                <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui'}}>This action cannot be undone</p>
                            </div>
                        </div>

                        <span className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Montserrat, system-ui'}}>
                            You are about to cancel <strong>{documentType}</strong> on LHDN MyInvois.
                            A reason is required by LHDN (max 300 characters).
                        </span>

                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            maxLength={300}
                            rows={3}
                            style={{ fontFamily: 'Montserrat, system-ui'}}
                            placeholder="e.g. Wrong buyer details, Wrong invoice amount..."
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-400 focus:border-red-400 resize-none text-gray-700 placeholder-gray-400"
                        />
                        <p className="text-xs text-gray-400 mt-1 text-right">{cancelReason.length}/300</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setCancelReason('');
                                }}
                                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                                style={{ fontFamily: 'Montserrat, system-ui'}}
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => cancelMutation.mutate()}
                                disabled={!cancelReason.trim() || cancelMutation.isPending}
                                className="flex-1 px-4 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-medium"
                                style={{ fontFamily: 'Montserrat, system-ui'}}
                            >
                                {cancelMutation.isPending ? 'Cancelling...' : 'Confirm Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default EInvoiceSubmitButton;
