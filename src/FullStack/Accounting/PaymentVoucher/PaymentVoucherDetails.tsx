import React, { useState } from "react";
import { buttons, forms, labelStyles, layout, spinningStyles, tables, text } from "../Constants/Styles";
import { SquarePen } from "lucide-react";
import { details } from "../../Customers/constants/Styles";
import { PaymentVoucherDetailsProps } from "../Constants/Types";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";



const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const formatNumber = () => {
    const current_year = new Date().getFullYear()
    return `PV-${current_year}-`;
};


const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};

const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};

const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};














const PaymentVoucherDetails: React.FC<PaymentVoucherDetailsProps> = ({
    paymentVoucher,
    isLoading,
    onBack,
    onEdit,
    accounts,
    onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const paymentVoucherId = paymentVoucher?.reference_number;


    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <span className={spinningStyles.terminalBar.spinner}></span>
                <p className="mt-3 text-gray-600">fetching payment voucher...</p>
            </div>
        );
    }

    if (!paymentVoucher) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Voucher Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load payment voucher.</p>
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
                                    PAYMENT VOUCHER DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{paymentVoucher.reference_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(paymentVoucherId)}
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

                <hr className="my-6 border-gray-200" />

                <div>
                    <div className="grid grid-cols-3 gap-6">
                        <p>
                            <a className={details.extraSmallUppercase}>Reference Number</a><br />
                            {formatNumber()}{paymentVoucher.reference_number}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {formatDate(paymentVoucher.date)}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Cancelled</a><br />
                            <span className={`inline-flex items-center px-1 py-0.5 rounded text-sm ${
                                paymentVoucher.cancelled
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : 'bg-green-100 text-green-800 border border-green-200'
                            }`}>
                                {paymentVoucher.cancelled ? 'Yes' : 'No'}
                            </span>
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Payment To</a><br />
                            {formatSupplierNumber()}{paymentVoucher.payment_to || 'N/A'} - {paymentVoucher.payment_to_name || 'N/A'}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Account Paid By</a><br />
                            {paymentVoucher.account_paid_by?.account_code || 'N/A'} - ({paymentVoucher.account_paid_by?.account_name || 'N/A'})
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Related Project</a><br />
                            {formatProjectNumber()}{paymentVoucher.project || 'N/A'} | {paymentVoucher.project_name || 'N/A'}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Currency</a><br />
                            {paymentVoucher.currency || 'N/A'}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Description</a><br />
                            {paymentVoucher.description || 'N/A'}
                        </p>

                        <p>
                            <a className={details.extraSmallUppercase}>Agent</a><br />
                            {paymentVoucher.agent || 'N/A'}
                        </p>
                    </div>


                    {/* LINES */}
                    {paymentVoucher.payment_voucher_lines && paymentVoucher.payment_voucher_lines.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Description</th>
                                            <th className={tables.headerCell}>GST Number</th>
                                            <th className={tables.headerCell}>Amount</th>
                                            <th className={tables.headerCell}>GST %</th>
                                            <th className={tables.headerCell}>GST Rate</th>
                                            <th className={tables.headerCell}>Total</th>
                                            <th className={tables.headerCell}>Cancelled</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">

                                        {paymentVoucher.payment_voucher_lines.map((line: any, index: any) => (
                                            <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                                <td className={tables.cell}>{line.description || '--'}</td>
                                                <td className={tables.cell}>{line.gst_number || '--'}</td>
                                                <td className={tables.cell}>{line.amount || '--'}</td>
                                                <td className={tables.cell}>{line.tax || '--'}%</td>
                                                <td className={tables.cell}>{line.tax_rate || '--'}</td>
                                                <td className={tables.cell}>{line.net_total || '--'}</td>
                                                <td className={tables.cell}>{line.cancelled ? 'Yes' : 'No'}</td>
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
                                                {paymentVoucher.gross_total || '--'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax Inclusive</div>
                                            <div className="font-medium text-gray-800">
                                                {paymentVoucher.tax_inclusive ? 'Yes' : 'No'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-gray-800">
                                                {paymentVoucher.tax || '--'}%
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Tax Rate</div>
                                            <div className="font-medium text-gray-800">
                                                {paymentVoucher.tax_rate || '--'}
                                            </div>
                                        </div>

                                        <hr className="my-2 border-blue-200" />

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total</div>
                                            <div className="font-medium text-gray-800">
                                                {paymentVoucher.aggregate_total || '--'}
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
                <p className={labelStyles}>
                    <a className={details.extraSmallUppercase}>Created by</a><br />
                    {paymentVoucher.created_by || 'N/A'}
                </p>

                <p className={labelStyles}>
                    <a className={details.extraSmallUppercase}>Updated By</a><br />
                    {paymentVoucher.updated_by || 'N/A'}
                </p>

                <p className={labelStyles}>
                    <a className={details.extraSmallUppercase}>Date Updated</a><br />
                    {formatUpdatedDate(paymentVoucher.date_updated) || 'N/A'}
                </p>
            </div>

            
            <hr className="my-6 border-gray-200" />
        </div>
    );
};
export default PaymentVoucherDetails;
