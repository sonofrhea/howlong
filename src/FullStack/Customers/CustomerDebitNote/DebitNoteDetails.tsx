import React, { useState } from "react";
import { formatCurrency } from "../../../components/store";

import EInvoiceStatusBadge from "../../EInvoice/EInvoiceStatusBadge";
import EInvoiceSubmitButton from "../../EInvoice/EInvoiceSubmitButton";
import EInvoiceQRCode from "../../EInvoice/EInvoiceQRCode";


import { buttons, details, forms, 
    labelStyles, 
    layout, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { DebitNoteDetailsProps } from "../constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";




const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const formatDebitNoteNumber = () => {
    const currentYear = new Date().getFullYear();
    return `DN-${currentYear}-`;
};


const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};


const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};














const DebitNoteDetails: React.FC<DebitNoteDetailsProps> = ({
    debitNote,
    isLoading,
    onBack,
    onEdit,
    onCancel,
    accounts,
    onCreateJournalEntry,
    isCreatingJournalEntry,
    einvoiceEnabled,
    onSubmitSuccess,
    onCancelSuccess
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);



    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Fetching debit note data...</p>
            </div>
        );
    }

    if (!debitNote) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-black mb-2">Debit Note Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load debit note details.</p>
                <button 
                    onClick={onBack}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );

    }



    return (
        <div className="w-full mx-auto page  shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap');
                `}
            </style>

            <div className={`${forms.body} bg-[#F8F9FA]!`} style={{ fontFamily: 'Montserrat, system-ui'}}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4" >
                            <div className={layout.badge} >
                                <p className={text.badgeLarge} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    DEBIT NOTE DETAILS
                                </p>
                                <span className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    {formatDebitNoteNumber()}{debitNote.debit_note_number}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(debitNote.debit_note_number)}
                            
                            className="bg-white border cursor-pointer border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:shadow-sm"
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                        </button>
                        <button
                            onClick={() => setIsJournalEntryOpen(true)}
                            className="bg-purple-800 text-white px-4 py-2 hover:bg-amber-900 rounded-lg flex items-center gap-2"
                        >
                            + Create Journal Entry
                        </button>
                    </div>
                </div>

                {/* e-Invoice Section — DebitNoteDetails */}
                <div className="mb-6 px-10!">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <a className={details.extraSmallUppercase}>e-Invoice Status</a>
                            <EInvoiceStatusBadge status={debitNote.einvoice_status || 'Not Submitted'} />
                        </div>
                        <EInvoiceSubmitButton
                            documentType="Debit Note"
                            documentId={debitNote.debit_note_number}
                            einvoiceStatus={debitNote.einvoice_status || 'Not Submitted'}
                            einvoiceEnabled={einvoiceEnabled}
                            lhdnUuid={debitNote.lhdn_uuid}
                            submittedAt={debitNote.einvoice_submitted_at}
                            onSubmitSuccess={onSubmitSuccess}
                            onCancelSuccess={onCancelSuccess}
                        />
                    </div>

                    {debitNote.lhdn_uuid && (
                        <div className="grid grid-cols-3 gap-6 mt-4">
                            <p className={labelStyles}>
                                <a className={details.extraSmallUppercase}>LHDN UUID</a><br />
                                <span className="font-mono text-xs break-all">{debitNote.lhdn_uuid}</span>
                            </p>
                            <p className={labelStyles}>
                                <a className={details.extraSmallUppercase}>Submission UID</a><br />
                                <span className="font-mono text-xs break-all">{debitNote.lhdn_submission_uid || 'N/A'}</span>
                            </p>
                            <p className={labelStyles}>
                                <a className={details.extraSmallUppercase}>Submitted At</a><br />
                                {debitNote.einvoice_submitted_at
                                    ? new Date(debitNote.einvoice_submitted_at).toLocaleString('en-MY')
                                    : 'N/A'
                                }
                            </p>
                        </div>
                    )}

                    {debitNote.einvoice_status === 'Invalid' && debitNote.einvoice_validation_errors && (
                        <div className="mt-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                            <p className="text-xs font-bold uppercase text-red-600 mb-1">Validation Errors</p>
                            <p className="text-sm text-red-700 whitespace-pre-wrap">
                                {debitNote.einvoice_validation_errors}
                            </p>
                        </div>
                    )}

                    {debitNote.lhdn_uuid && debitNote.lhdn_long_uid && (
                        <div className="mt-4">
                            <EInvoiceQRCode
                                validationUrl={`https://${
                                    debitNote.einvoice_status === 'Valid'
                                        ? 'myinvois.hasil.gov.my'
                                        : 'preprod.myinvois.hasil.gov.my'
                                }/${debitNote.lhdn_uuid}/share/${debitNote.lhdn_long_uid}`}
                                lhdnUuid={debitNote.lhdn_uuid}
                                documentReference={`DN-${new Date(debitNote.date).getFullYear()}-${debitNote.debit_note_number}`}
                            />
                        </div>
                    )}
                </div>

                <hr className="my-6 border-gray-200" />

                <div >
                    <div className="grid grid-cols-3 gap-6">
                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Debit Note No.</a><br />
                            {formatDebitNoteNumber()}{debitNote.debit_note_number}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {debitNote.date}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Account</a><br />
                            {debitNote.account?.account_code || 'N/A'} ({debitNote.account?.account_name || 'N/A'})
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Bill To...</a><br />
                            {formatCustomerNumber()}{debitNote.customer} | {debitNote.customer_name || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Related Payment</a><br />
                            POST-{debitNote.related_payment} | {debitNote.related_payment_amount}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Initial Paid Amount</a><br />
                            {debitNote.initial_paid_amount}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Amount Owed</a><br />
                            {debitNote.amount_owed}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Currency</a><br />
                            {debitNote.currency || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Agent</a><br />
                            {debitNote.agent || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>E-invois supply type</a><br />
                            {debitNote.einvoice_supply_type || 'N/A'}
                        </p>

                        <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>E-invois payment mode</a><br />
                            {debitNote.einvoice_payment_mode || 'N/A'}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {debitNote.debit_note_details && debitNote.debit_note_details.length > 0 && (

                        <div className="p-6" >
                            <div className="overflow-x-auto">
                                <table className={`cursor-pointer ${forms.body}`}>
                                    <thead className={tables.header} >
                                        <tr >
                                            <th className={tables.headerCell}>
                                                Date
                                            </th>
                                            <th className={tables.headerCell}>
                                                Description
                                            </th>
                                            <th className={tables.headerCell}>
                                                Amount
                                            </th>
                                            <th className={tables.headerCell}>
                                                Taxable
                                            </th>
                                            <th className={tables.headerCell}>
                                                SST direction
                                            </th>
                                            <th className={tables.headerCell}>
                                                SST %
                                            </th>
                                            <th className={tables.headerCell}>
                                                SST Amount
                                            </th>
                                            <th className={tables.headerCell}>
                                                Current Total<br></br>(After SST)
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
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {debitNote.debit_note_details.map((line, index) => (
                                            <tr key={index} className={tables.row}>
                                                <td className={tables.cell}>{line.date}</td>
                                                <td className={tables.cell}>{line.description}</td>
                                                <td className={tables.cell}>{line.amount}</td>
                                                <td className={tables.cell}>
                                                    <div className={`flex items-center justify-center px-2! py-1! rounded text-sm ${
                                                        line.taxable
                                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                                        : 'bg-green-100 text-green-800 border border-green-200'
                                                    }`}>
                                                        {line.taxable ? 'Yes' : 'No'}
                                                    </div>
                                                    </td>

                                                    <td className={tables.cell}>
                                                    <div className={`flex items-center justify-center px-2 py-1 rounded text-sm ${
                                                        line.sst_direction === 'Add'
                                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                                        : 'bg-amber-100 text-blue-800 border border-amber-200'
                                                    }`}>
                                                        {line.sst_direction}
                                                    </div>
                                                </td>
                                                <td className={tables.cell}>{line.sst_percent}%</td>
                                                <td className={tables.cell}>{line.sst_amount}</td>
                                                <td className={tables.cell}>{line.current_total}</td>
                                                <td className={tables.cell}>{line.einvoice_classification_code || '--'}</td>
                                                <td className={tables.cell}>{line.einvoice_tax_type || '--'}</td>
                                                <td className={tables.cell}>{line.einvoice_tax_exemption_reason || '--'}</td>
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
                                            <div className="font-medium text-black">{debitNote.gross_total}</div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Taxable</div>
                                            <div className={`font-medium text-black flex items-center justify-center px-5! py-0! rounded text-sm ${
                                                        debitNote.taxable
                                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                                        : 'bg-green-100 text-green-800 border border-green-200'
                                                    }`}>
                                                {debitNote.taxable ? 'Yes' : 'No'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-black">{debitNote.tax_percent}%</div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax Amount</div>
                                            <div className="font-medium text-black">{formatCurrency(debitNote.tax_amount)}</div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total</div>
                                            <div className="font-medium text-black">{formatCurrency(debitNote.net_total)}</div>
                                        </div>

                                        <hr className="my-2 border-blue-200" />

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Total customer payment:</div>
                                            <div className="font-medium text-black">
                                                {formatCurrency(debitNote.net_total)}
                                            </div>
                                        </div>

                                        <hr className="my-2 border-blue-200" />
                                        
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Outstanding Owed:</div>
                                            <div className="font-medium text-black">
                                                {formatCurrency(debitNote.debit_note_outstanding)}
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Total incl. Initial:</div>
                                            <div className="font-medium text-black">
                                                {debitNote.total_plus_initial}
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
                        {debitNote.created_by || 'N/A'}
                    </p>

                    <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {debitNote.updated_by || 'N/A'}
                    </p>

                    <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatUpdatedDate(debitNote.date_updated) || 'N/A'}
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

export default DebitNoteDetails;

