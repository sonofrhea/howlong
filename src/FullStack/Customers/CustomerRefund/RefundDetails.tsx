import React, { useState } from "react";

import { buttons, details, forms, 
    labelStyles, 
    layout, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { CustomerRefundDetailsProps } from "../constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";

import EInvoiceStatusBadge from "../../EInvoice/EInvoiceStatusBadge";
import EInvoiceSubmitButton from "../../EInvoice/EInvoiceSubmitButton";
import EInvoiceQRCode from "../../EInvoice/EInvoiceQRCode";


const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const formatCreditNoteNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CN-${currentYear}-`;
};



const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const formatRefundNumber = () => {
    const currentYear = new Date().getFullYear();
    return `REF-${currentYear}-`;
};


const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};










const RefundDetails: React.FC<CustomerRefundDetailsProps> = ({
    refund,
    isLoading,
    onBack,
    onEdit,
    accounts,
    onCreateJournalEntry,
    isCreatingJournalEntry,
    einvoiceEnabled,
    onSubmitSuccess,
    onCancelSuccess
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);

    
    if (isLoading) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Fetching refund data...</p>
            </div>
        );
    }

    if (!refund) {
        return(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load refund details.</p>
                <button 
                    onClick={onBack}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }




    return(
        <div className="w-full mx-auto page bg-white shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.redBadge}>
                                <p className={text.badgeLarge} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    CUSTOMER REFUND DETAILS
                                </p>
                                <span className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    {formatRefundNumber()}{refund.refund_number}
                                </span>
                            </div>
                        </div>
                    </div>
                    

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(refund.refund_number)}
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

                {/* e-Invoice Section — RefundDetails */}
                <div className="mb-6 px-10!">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <a className={details.extraSmallUppercase} style={{ fontFamily: 'Montserrat, system-ui' }}>e-Invoice Status</a>
                            <EInvoiceStatusBadge status={refund.einvoice_status || 'Not Submitted'} />
                        </div>
                        <EInvoiceSubmitButton
                            documentType="Refund Note"
                            documentId={refund.refund_number}
                            einvoiceStatus={refund.einvoice_status || 'Not Submitted'}
                            einvoiceEnabled={einvoiceEnabled}
                            lhdnUuid={refund.lhdn_uuid}
                            submittedAt={refund.einvoice_submitted_at}
                            onSubmitSuccess={onSubmitSuccess}
                            onCancelSuccess={onCancelSuccess}
                        />
                    </div>

                    {refund.lhdn_uuid && (
                        <div className="grid grid-cols-3 gap-6 mt-4">
                            <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                <a className={details.extraSmallUppercase}>LHDN UUID</a><br />
                                <span className="font-mono text-xs break-all">{refund.lhdn_uuid}</span>
                            </p>
                            <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                <a className={details.extraSmallUppercase}>Submission UID</a><br />
                                <span className="font-mono text-xs break-all">{refund.lhdn_submission_uid || 'N/A'}</span>
                            </p>
                            <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                <a className={details.extraSmallUppercase}>Submitted At</a><br />
                                {refund.einvoice_submitted_at
                                    ? new Date(refund.einvoice_submitted_at).toLocaleString('en-MY')
                                    : 'N/A'
                                }
                            </p>
                        </div>
                    )}

                    {refund.einvoice_status === 'Invalid' && refund.einvoice_validation_errors && (
                        <div className="mt-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                            <p className="text-xs font-bold uppercase text-red-600 mb-1">Validation Errors</p>
                            <p className="text-sm text-red-700 whitespace-pre-wrap">
                                {refund.einvoice_validation_errors}
                            </p>
                        </div>
                    )}

                    {refund.lhdn_uuid && refund.lhdn_long_uid && (
                        <div className="mt-4">
                            <EInvoiceQRCode
                                validationUrl={`https://${
                                    refund.einvoice_status === 'Valid'
                                        ? 'myinvois.hasil.gov.my'
                                        : 'preprod.myinvois.hasil.gov.my'
                                }/${refund.lhdn_uuid}/share/${refund.lhdn_long_uid}`}
                                lhdnUuid={refund.lhdn_uuid}
                                documentReference={`REF-${new Date(refund.date).getFullYear()}-${refund.refund_number}`}
                            />
                        </div>
                    )}
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                    <div className="grid grid-cols-3 gap-6">
                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Refund No.</a><br />
                            {formatRefundNumber()}{refund.refund_number}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {formatDate(refund.date)}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Account</a><br />
                            {refund.payment_account?.account_code || 'N/A'} ({refund.payment_account?.account_name || 'N/A'})
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Pay To...</a><br />
                            {formatCustomerNumber()}{refund.pay_to} | {refund.pay_to_name || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Related Credit Note</a><br />
                            {formatCreditNoteNumber()}{refund.related_credit_note || 'N/A'} | Outstanding: 
                            {refund.related_credit_note_outstanding || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Expected Refund</a><br />
                            {refund.expected_refund}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Currency</a><br />
                            {refund.currency || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Agent</a><br />
                            {refund.agent || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>E-invois supply type</a><br />
                            {refund.einvoice_supply_type || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>E-invois payment mode</a><br />
                            {refund.einvoice_payment_mode || 'N/A'}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {refund.related_customer_refund && refund.related_customer_refund.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                Date
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                Amount
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                Taxable
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                SST %
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                SST Amount
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                Cancelled
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                Payment Type
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                E-invoice classification code
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                E-invoice tax type
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                E-invoice tax exemption reason
                                            </th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                Total Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {refund.related_customer_refund.map((line, index) => (
                                            <tr key={index} className={`${tables.row} hover:cursor-pointer`}>
                                                <td className={tables.cell}>{formatDate(line.date)}</td>
                                                <td className={tables.cell}>{line.refund_amount}</td>
                                                <td className={`flex items-center justify-center px-2! py-0.5! gap-x-px-3! rounded text-sm ${
                                                        line.taxable
                                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                                        : 'bg-green-100 text-green-800 border border-green-200'
                                                    }`}>
                                                    {line.taxable ? 'Yes' : 'No'}
                                                </td>
                                                <td className={tables.cell}>{line.sst_percent}%</td>
                                                <td className={tables.cell}>{line.sst_amount}</td>
                                                <td className={`flex items-center justify-center px-3! py-0! rounded text-sm ${
                                                    line.cancelled
                                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                                    : 'bg-green-100 text-green-800 border border-green-200'
                                                }`}>
                                                    {line.cancelled ? 'Yes' : 'No'}
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.payment_type}
                                                </td>
                                                <td className={tables.cell}>{line.einvoice_classification_code || '--'}</td>
                                                <td className={tables.cell}>{line.einvoice_tax_type || '--'}</td>
                                                <td className={tables.cell}>{line.einvoice_tax_exemption_reason || '--'}</td>
                                                <td className={tables.cell}>{line.total_amount || '--'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                                <div className="w-full sm:w-1/2 lg:w-1/3">
                                    <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-gray-300 shadow-lg">


                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Gross Total</div>
                                            <div className="font-medium text-gray-800">{refund.gross_total}</div>
                                        </div>

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-gray-800">{refund.tax_percent}%</div>
                                        </div>

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Tax Amount</div>
                                            <div className="font-medium text-gray-800">{refund.tax_amount}</div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total:</div>
                                            <div className="font-medium text-black">
                                                {refund.net_total}
                                            </div>
                                        </div>

                                        <hr className="my-6 border-gray-200" />
                                        
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Outstanding:</div>
                                            <div className="font-medium text-black">
                                                {refund.outstanding}
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <hr className="my-6 border-gray-200" />
                                
                <div className="grid lg:grid-cols-5">
                    <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <a className={details.extraSmallUppercase}>Created By</a><br />
                        {refund.created_by || 'N/A'}
                    </p>

                    <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {refund.updated_by || 'N/A'}
                    </p>

                    <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatUpdatedDate(refund.date_updated) || 'N/A'}
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
export default RefundDetails;
