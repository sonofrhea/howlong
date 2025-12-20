import React from "react";
import { buttons, details, forms, labelStyles, layout, tables, text } from "../constants/styles";
import { SquarePen } from "lucide-react";



const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PI-${currentYear}-`;
};



const CompanyPurchaseInvoiceDetails: React.FC<any> = ({ companyPurchaseInvoice, isLoading, onBack, onEdit }) => {



    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching Invoice...</p>
            </div>
        );
    }

    if (!companyPurchaseInvoice) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Invoice Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load debit note.</p>
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
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.redBadge}>
                                <p className={text.badgeLarge}>
                                    COMPANY PURCHASE INVOICE
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{companyPurchaseInvoice.purchase_invoice_number}
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
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Refund No.</p>
                            {formatNumber()}{companyPurchaseInvoice.purchase_invoice_number}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Date</p>
                            {formatDate(companyPurchaseInvoice.date)}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Supplier</p>
                            {companyPurchaseInvoice.supplier || 'N/A'} | {companyPurchaseInvoice.supplier_name || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Address</p>
                            {companyPurchaseInvoice.address || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Description</p>
                            {companyPurchaseInvoice.description || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <p className={details.extraSmallUppercase}>Status</p>
                            {companyPurchaseInvoice.status || 'N/A'}
                        </p>
                    </div>
                    
                    <hr className="my-6 border-gray-200" />

                    {/* LINES */}
                    {companyPurchaseInvoice.related_invoice && companyPurchaseInvoice.related_invoice.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                            <table className={forms.body}>
                                <thead className={tables.header}>
                                    <tr>
                                        <th className={tables.headerCell}>Product Item</th>
                                        <th className={tables.headerCell}>Description</th>
                                        <th className={tables.headerCell}>Quantity</th>
                                        <th className={tables.headerCell}>Base UOM</th>
                                        <th className={tables.headerCell}>Price</th>
                                        <th className={tables.headerCell}>Amount</th>
                                        <th className={tables.headerCell}>Tax Inclusive</th>
                                        <th className={tables.headerCell}>Tax %</th>
                                        <th className={tables.headerCell}>SubTotal</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                    </tr>
                                </thead>

                                <tbody className={tables.body}>
                                    {companyPurchaseInvoice.related_invoice.map((line: any, index: any) => (

                                        <tr key={index} className={tables.row}>
                                            <td className={tables.cell}>{line.product_item || 'N/A'} | {line.product_item_name || 'N/A'}</td>
                                            <td className={tables.cell}>{line.description || 'N/A'}</td>
                                            <td className={tables.cell}>{line.quantity || 'N/A'}</td>
                                            <td className={tables.cell}>{line.base_unit_of_measure || 'N/A'}</td>
                                            <td className={tables.cell}>{line.price || '--'}</td>
                                            <td className={tables.cell}>{line.total || '--'}</td>
                                            <td className={tables.cell}>{line.tax_inclusive ? 'Yes' : 'No'}</td>
                                            <td className={tables.cell}>{line.tax || '--'}</td>
                                            <td className={tables.cell}>{line.sub_total || '--'}</td>
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
                                            <div className="font-medium text-gray-800">{companyPurchaseInvoice.gross_total || '--'}</div>
                                        </div>

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-gray-800">{companyPurchaseInvoice.tax_amount || '0'}%</div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total:</div>
                                            <div className="font-medium text-black">
                                                {companyPurchaseInvoice.net_total || '--'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Cancelled:</div>
                                            <div className="font-medium text-black">
                                                {companyPurchaseInvoice.cancelled ? 'Yes' : 'No'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    )}
                </div>
                
                <hr className="my-6 border-gray-200" />

                <p className={labelStyles}>
                    <p className={details.extraSmallUppercase}>Created by</p>
                    {companyPurchaseInvoice.created_by || 'N/A'}
                </p>
                <hr className="my-6 border-gray-200" />
            </div>
        </div>
    );
};
export default CompanyPurchaseInvoiceDetails;
