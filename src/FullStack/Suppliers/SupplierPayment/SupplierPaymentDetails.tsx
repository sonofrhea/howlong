import { SquarePen } from "lucide-react";
import { buttons, forms, labelStyles, layout, tables, text } from "../constants/Styles";
import { details } from "../../Core/constants/Styles";

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SPI-${currentYear}-`;
};

const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString();
};

const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const formatInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `INV-${currentYear}-`;
};















const SupplierPaymentDetails: React.FC<any> = ({ supplierPayment, isLoading, onBack, onEdit }) => {


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto">↺</div>
                <p className="mt-3 text-gray-600">Loading payment...</p>
            </div>
        );
    }

    if (!supplierPayment) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-4xl">‼</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load payment details.</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }


    return (
        <div className="w-full mx-auto page bg-white shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    SUPPLIER PAYMENT
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{supplierPayment.payment_code}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={onEdit}
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
                        <p>
                            <p className={details.extraSmallUppercase}>Payment No</p>
                            {formatNumber()}{supplierPayment.payment_code || 'N/A'}
                        </p>

                        <p>
                            <p className={details.extraSmallUppercase}>Posted Date</p>
                            {formatDate(supplierPayment.date_created) || 'N/A'}
                        </p>

                        <p>
                            <p className={details.extraSmallUppercase}>Account paid by</p>
                            {supplierPayment.account_code?.account_code || 'N/A'} - ({supplierPayment.account_code?.account_name || 'N/A'})
                        </p>

                        <p>
                            <p className={details.extraSmallUppercase}>Payment To</p>
                            {formatSupplierNumber()}{supplierPayment.supplier} | {supplierPayment.supplier_name || 'N/A'}
                        </p>

                        <p>
                            <p className={details.extraSmallUppercase}>Related Invoice</p>
                            {formatInvoiceNumber()}{supplierPayment.related_invoice || 'N/A'} | Total: {supplierPayment.invoice_amount || 'N/A'}
                        </p>

                        <p>
                            <p className={details.extraSmallUppercase}>Related Invoice Amount</p>
                            {supplierPayment.invoice_amount || 'N/A'}
                        </p>

                        <p>
                            <p className={details.extraSmallUppercase}>Currency</p>
                            {supplierPayment.currency || 'N/A'}
                        </p>

                        <p>
                            <p className={details.extraSmallUppercase}>Agent</p>
                            {supplierPayment.agent || 'N/A'}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {supplierPayment.related_payment && supplierPayment.related_payment?.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className={forms.body}>
                                <thead className={tables.header}>
                                    <tr>
                                        <th className={tables.headerCell}>Payment Date</th>
                                        <th className={tables.headerCell}>Payment Type</th>
                                        <th className={tables.headerCell}>Payment Amount</th>
                                        <th className={tables.headerCell}>Additional Payment</th>
                                        <th className={tables.headerCell}>Sub_total</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {supplierPayment.related_payment.map((line: any, index: any) => (
                                        <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                            <td className={tables.cell}>{formatDate(line.payment_date)}</td>
                                            <td className={tables.cell}>{line.payment_type || 'N/A'}</td>
                                            <td className={tables.cell}>{line.payment_amount || 'N/A'}</td>
                                            <td className={tables.cell}>{line.additional_payment || 'N/A'}</td>
                                            <td className={tables.cell}>{line.current_total || 'N/A'}</td>
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
                                    <div>Gross Paid</div>
                                    <div className="font-medium text-gray-800">{supplierPayment.gross_paid || 'N/A'}</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Tax %</div>
                                    <div className="font-medium text-gray-800">{supplierPayment.tax_amount || 'N/A'}%</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Net Total</div>
                                    <div className="font-medium text-gray-800">{supplierPayment.aggregate_total || 'N/A'}</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Cancelled</div>
                                    <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                            supplierPayment.cancelled
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                                 
                                        }`}>{supplierPayment.cancelled ? 'Yes' : 'No'}</div>
                                </div>

                                <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                    <div>Outstanding</div>
                                    <div className="font-medium text-gray-800">{supplierPayment.outstanding_amount || 'N/A'}</div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <hr className="my-6 border-gray-200" />

            <p>
                <p className={details.extraSmallUppercase}>Created By</p>
                {supplierPayment.created_by || 'N/A'}
            </p>
            <hr className="my-6 border-gray-200" />
        </div>
    </div>
    );
};
export default SupplierPaymentDetails;
