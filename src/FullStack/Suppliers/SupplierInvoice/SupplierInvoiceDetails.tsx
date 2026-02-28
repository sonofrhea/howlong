import React from "react";
import { buttons, labelStyles, layout, 
    spinningStyles, tables, text } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { SupplierInvoiceDetailsProps } from "../constants/Types";
import { details } from "../../Customers/constants/Styles";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};

const formatDate = (dateString: any) => {
    return new Date(dateString).toISOString().split("T")[0];
};

const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};












const SupplierInvoiceDetails: React.FC<SupplierInvoiceDetailsProps> = ({
    supplierInvoice,
    isLoading,
    onBack,
    onEdit 
}) => {

    const supplierInvoiceId = supplierInvoice?.invoice_number;


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <span className={spinningStyles.terminalBar.spinner}>↺</span>
                <p className="mt-3 text-gray-600">fetching supplier invoice...</p>
            </div>
        );
    }


    if (!supplierInvoice) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Supplier Invoice Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load invoice details.</p>
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
            <div className="w-full mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    SUPPLIER INVOICE DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{supplierInvoice.invoice_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={(() => onEdit(supplierInvoiceId))}
                            className={buttons.editButtonGreen}
                        >
                            <SquarePen size={20} strokeWidth={1.5} />
                            Edit
                        </button>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase">Invoice No</a><br />
                        <p className="text-sm mb-4 font-medium text-black">{formatNumber()}{supplierInvoice.invoice_number}</p>

                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase mt-5">Date Issued</a><br />
                        <p className="text-sm mb-4 font-medium text-black">{formatDate(supplierInvoice.invoice_date)}</p>

                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase mt-4">Payment Account</a><br />
                        <p className="text-sm font-medium text-black">{supplierInvoice.purchase_account?.account_code || 'N/A'} - ({supplierInvoice.purchase_account?.account_name || 'N/A'})</p>
                    </div>

                    <div>
                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase">
                            Supplier
                        </a><br />
                        <p className="text-sm font-medium mb-4 text-black">{supplierInvoice.supplier_name || 'N/A'}</p>
                        
                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase mt-4">Supplier Extra Details</a><br />
                        <p className="text-sm font-medium mb-4 text-black">{supplierInvoice.supplier_details || 'N/A'}</p>

                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase mt-4">Product</a><br />
                        <p className="text-sm font-medium text-black">{supplierInvoice.product || 'N/A'}</p>
                    </div>

                    <div>
                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase">Currency</a><br />
                        <p className="text-sm font-medium mb-4 text-black">{supplierInvoice.currency || 'N/A'}</p>

                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase mt-4">Invoice Due Date</a><br />
                        <p className="text-sm font-medium mb-4 text-black">{supplierInvoice.invoice_due_date}</p>

                        <a className="px-2 py-1 text-gray-700 text-center tracking-widest text-xs font-semibold uppercase mt-4">Agent</a><br />
                        <p className="text-sm font-medium text-black">{supplierInvoice.agent || 'N/A'}</p>
                    </div>
                </div>

                 <hr className="my-6 border-gray-200" />

                 {supplierInvoice.related_invoice && supplierInvoice.related_invoice.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-blue-100 drop-shadow-md shadow-lg">
                                    <tr>
                                        <th className={tables.headerCell}>Item</th>
                                        <th className={tables.headerCell}>Description</th>
                                        <th className={tables.headerCell}>Quantity</th>
                                        <th className={tables.headerCell}>UOM</th>
                                        <th className={tables.headerCell}>Price per unit</th>
                                        <th className={tables.headerCell}>Amount</th>
                                        <th className={tables.headerCell}>SST %</th>
                                        <th className={tables.headerCell}>Sub-Total</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {supplierInvoice.related_invoice.map((line: any, index: any) => (
                                        <tr key={index} className="bg-white divide-y divide-x divide-gray-100">
                                            <td className={tables.cell}>SKU-{line.item || 'N/A'} | {line.item_name || 'N/A'}</td>
                                            <td className={tables.cell}>{line.description || 'N/A'}</td>
                                            <td className={tables.cell}>{line.quantity || 'N/A'}</td>
                                            <td className={tables.cell}>{line.unit_of_measure || 'N/A'}</td>
                                            <td className={tables.cell}>{line.price_per_unit || 'N/A'}</td>
                                            <td className={tables.cell}>{line.total}</td>
                                            <td className={tables.cell}>{line.tax_amount || 0}</td>
                                            <td className={tables.cell}>{line.sub_total}</td>
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
                                    <div className="font-medium text-gray-800">{supplierInvoice.gross_total || 'N/A'}</div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax inclusive</div>
                                    <div className="font-medium text-green-400">{supplierInvoice.tax_inclusive ? 'Yes' : 'No'}</div>
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax %</div>
                                    <div className="font-medium text-gray-800">{supplierInvoice.tax_amount || 'N/A'}%</div>
                                </div>

                                <hr className="my-4 border-blue-200" />

                                <div className="border-t border-dashed border-blue-500 mt-3 pt-3 flex justify-between items-center">
                                    <div className="text-sm text-gray-500">Net Total</div>
                                    <div className="text-xl font-bold text-gray-900">{supplierInvoice.aggregate_total}</div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                 )}
            </div>

            <hr className="my-6 border-gray-200" />
                                                    
            <div className="grid lg:grid-cols-5">
                <p className={labelStyles}>
                    <a className={details.extraSmallUppercase}>Created by</a><br />
                    {supplierInvoice.created_by || 'N/A'}
                </p>

                <p className={labelStyles}>
                    <a className={details.extraSmallUppercase}>Updated By</a><br />
                    {supplierInvoice.updated_by || 'N/A'}
                </p>

                <p className={labelStyles}>
                    <a className={details.extraSmallUppercase}>Date Updated</a><br />
                    {formatUpdatedDate(supplierInvoice.date_updated) || 'N/A'}
                </p>
            </div>
            <hr className="my-6 border-gray-200" />
        </div>
    );

};
export default SupplierInvoiceDetails;
