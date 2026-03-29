import React, { useState } from "react";
import { buttons, forms, labelStyles, layout, spinningStyles, tables, text } from "../Constants/Styles";
import { SquarePen } from "lucide-react";
import { details } from "../../Customers/constants/Styles";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";
import { ReceiptVoucherDetailsProps } from "../Constants/Types";


const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};

const formatNumber = () => {
    const current_year = new Date().getFullYear();
    return `RV-${current_year}-`;
};

const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};

const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};



















const ReceiptVoucherDetails: React.FC<ReceiptVoucherDetailsProps> = ({
    receiptVoucher,
    isLoading,
    onBack,
    onEdit,
    accounts,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const receiptVoucherId = receiptVoucher?.reference_number;


    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <span className={spinningStyles.terminalBar.spinner}></span>
                <p className="mt-3 text-gray-600">fetching payment voucher...</p>
            </div>
        );
    }

    if (!receiptVoucher) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Receipt Voucher Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load receipt voucher.</p>
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
        <div>

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                `}
            </style>

        <div className="w-full mx-auto page bg-white shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">
            <div className="min-w-full mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    RECEIPT VOUCHER DETAILS
                                </p>
                                <span className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    {formatNumber()}{receiptVoucher.reference_number}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(receiptVoucherId)}
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} 
                            className="cursor-pointer" />
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

                <div style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <div className="grid grid-cols-3 gap-6">
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Reference Number</a><br />
                            {formatNumber()}{receiptVoucher.reference_number}
                        </p>
                        
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {formatDate(receiptVoucher.date)}
                        </p>

                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase}>
                                Cancelled
                            </a><br />
                            <span className={`inline-flex items-center px-5.5! py-0.5! rounded text-sm ${
                                receiptVoucher.cancelled
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : 'bg-green-100 text-green-800 border border-green-200'
                            }`} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                {receiptVoucher.cancelled ? 'Yes' : 'No'}
                            </span>
                        </p>
                        
                        <p style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <a className={details.extraSmallUppercase} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Received From
                            </a><br />
                            {formatCustomerNumber()}{receiptVoucher.received_from || 'N/A'} - {receiptVoucher.received_from_name || 'N/A'}
                        </p>
                        
                        <p>
                            <a className={details.extraSmallUppercase} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Account Received In
                            </a><br />
                            {receiptVoucher.account_received_in?.account_code || 'N/A'} - {receiptVoucher.account_received_in?.account_name || 'N/A'}
                        </p>
                        
                        <p>
                            <a className={details.extraSmallUppercase} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Related Project
                            </a><br />
                            {formatProjectNumber()}{receiptVoucher.project || 'N/A'} | {receiptVoucher.project_name || 'N/A'}
                        </p>
                        
                        <p>
                            <a className={details.extraSmallUppercase} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Currency
                            </a><br />
                            {receiptVoucher.currency || 'N/A'}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Description
                            </a><br />
                            {receiptVoucher.description || 'N/A'}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Agent
                            </a><br />
                            {receiptVoucher.agent || 'N/A'}
                        </p>
                    </div>

                    {/* LINES */}
                    {receiptVoucher.receipt_voucher_lines && receiptVoucher.receipt_voucher_lines.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Description</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>GST Number</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Amount</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Special treatment</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Treatment %</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Treatment Amount</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Total <br/>(After Discount)</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Taxable</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>SST %</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>SST Amount</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Cancelled</th>
                                            <th className={tables.headerCell} style={{ fontFamily: 'Montserrat, system-ui' }}>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">

                                        {receiptVoucher.receipt_voucher_lines.map((line, index) => (
                                            <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                                <td className={tables.cell}>
                                                    {line.description || '--'}
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.gst_number || '--'}
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.amount || '--'}
                                                </td>
                                                <td className={`inline-flex items-center px-3.5! py-0.5! rounded text-xs ${
                                                        line.special_treatment
                                                            ? 'bg-green-100 text-green-800 border border-green-200'
                                                            : 'bg-red-100 text-red-800 border border-red-200'
                                                    }`}>
                                                    {line.special_treatment ? 'Yes' : 'No'}
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.treatment_percent || '--'}%
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.treatment_amount || '--'}
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.total_after_discount || '--'}
                                                </td>
                                                <td className={`inline-flex items-center px-3.5! py-0.5! rounded text-xs ${
                                                        line.taxable
                                                            ? 'bg-red-100 text-red-800 border border-red-200'
                                                            : 'bg-green-100 text-green-800 border border-green-200'
                                                    }`}>
                                                    {line.taxable? 'Yes' : 'No'}
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.sst_percent || '--'}%
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.sst_amount || '--'}
                                                </td>
                                                <td className={`inline-flex items-center px-3.5! py-0.5! rounded text-xs ${
                                                        line.cancelled
                                                            ? 'bg-red-100 text-red-800 border border-red-200'
                                                            : 'bg-green-100 text-green-800 border border-green-200'
                                                    }`}>
                                                    {line.cancelled ? 'Yes' : 'No'}
                                                </td>
                                                <td className={tables.cell}>
                                                    {line.net_total || '--'}
                                                </td>
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
                                            <div className="font-medium text-gray-800">
                                                {receiptVoucher.gross_total || '--'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Taxable</div>
                                            <div className="font-medium text-gray-800">
                                                {receiptVoucher.taxable ? 'Yes' : 'No'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-gray-800">
                                                {receiptVoucher.tax_percent || '--'}%
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax Amount</div>
                                            <div className="font-medium text-gray-800">
                                                {receiptVoucher.tax_amount || '--'}
                                            </div>
                                        </div>

                                        <hr className="my-4 border-blue-200" />

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total</div>
                                            <div className="font-medium text-gray-800">
                                                {receiptVoucher.aggregate_total || '--'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <JournalEntryModal
                isOpen={isJournalEntryOpen}
                onClose={() => setIsJournalEntryOpen(false)}
                onCreate={onCreateJournalEntry}
                isSubmitting={isCreatingJournalEntry}
                accounts={accounts}
            />

            <hr className="my-6 border-gray-200" />
                            
            <div className="grid lg:grid-cols-5">
                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <a className={details.extraSmallUppercase}>Created by</a><br />
                    {receiptVoucher.created_by || 'N/A'}
                </p>

                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <a className={details.extraSmallUppercase}>Updated By</a><br />
                    {receiptVoucher.updated_by || 'N/A'}
                </p>

                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <a className={details.extraSmallUppercase}>Date Updated</a><br />
                    {formatUpdatedDate(receiptVoucher.date_updated) || 'N/A'}
                </p>
            </div>
            
            <hr className="my-6 border-gray-200" />
        </div>
        </div>
    );
};
export default ReceiptVoucherDetails;