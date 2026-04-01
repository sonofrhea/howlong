import React from "react";
import { buttons, details, forms, labelStyles, layout, tables, text } from "../constants/styles";
import { SquarePen } from "lucide-react";
import { CompanyPurchaseInvoiceDetailsProps } from "../constants/Types";



const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const formatUpdateDate = (dateString: any) => {
    return new Date(dateString).toLocaleString();
};













const CompanyPurchaseInvoiceDetails: React.FC<CompanyPurchaseInvoiceDetailsProps> = ({
    companyPurchaseInvoice,
    isLoading,
    onBack,
    onEdit
}) => {
    const companyPurchaseInvoiceId = companyPurchaseInvoice?.purchase_invoice_number;


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
                                    {companyPurchaseInvoice.formatted_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(companyPurchaseInvoiceId)}
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
                            <a className={details.extraSmallUppercase}>Refund No.</a><br />
                            {companyPurchaseInvoice.formatted_number}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Date</a><br />
                            {formatDate(companyPurchaseInvoice.date)}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Supplier</a><br />
                            {companyPurchaseInvoice.supplier?.formatted_number || 'N/A'} | {companyPurchaseInvoice.supplier?.supplier_name || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Address</a><br />
                            {companyPurchaseInvoice.address || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Description</a><br />
                            {companyPurchaseInvoice.description || 'N/A'}
                        </p>
                        
                        <div className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Status</a><br />
                            
                            <p className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                companyPurchaseInvoice.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' :
                                companyPurchaseInvoice.status === 'Suspended' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                companyPurchaseInvoice.status === 'Inactive' ? 'bg-red-100 text-red-800 border border-red-200' :
                                companyPurchaseInvoice.status === 'Pending' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                'N/A'
                            }`}>
                                {companyPurchaseInvoice.status}
                            </p>
                        </div>
                        
                        <div className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Cancelled</a><br />
                            <p className={`inline-flex items-center px-5.5! py-0! rounded text-sm ${
                                companyPurchaseInvoice.cancelled
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : 'bg-green-100 text-green-800 border border-green-200'
                            }`}>
                                {companyPurchaseInvoice.cancelled ? 'Yes' : 'No'}
                            </p>
                        </div>
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
                                        <th className={tables.headerCell}>Taxable</th>
                                        <th className={tables.headerCell}>SST %</th>
                                        <th className={tables.headerCell}>SST Amount</th>
                                        <th className={tables.headerCell}>Cancelled</th>
                                        <th className={tables.headerCell}>Total</th>
                                    </tr>
                                </thead>

                                <tbody className={tables.body}>
                                    {companyPurchaseInvoice.related_invoice.map((line, index) => (

                                        <tr key={index} className={tables.row}>
                                            <td className={tables.cell}>{line.product_item?.formatted_number || 'N/A'} | {line.product_item?.product_item_name || 'N/A'}</td>
                                            <td className={tables.cell}>{line.description || 'N/A'}</td>
                                            <td className={tables.cell}>{line.quantity || 'N/A'}</td>
                                            <td className={tables.cell}>{line.base_unit_of_measure || 'N/A'}</td>
                                            <td className={tables.cell}>{line.price || '--'}</td>
                                            <td className={tables.cell}>{line.total || '--'}</td>
                                            <td className={`inline-flex items-center px-5.5! py-0! rounded text-sm ${
                                                line.taxable
                                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                                    : 'bg-green-100 text-green-800 border border-green-200'
                                            }`}>{line.taxable ? 'Yes' : 'No'}</td>
                                            <td className={tables.cell}>{line.sst_percent || '--'}</td>
                                            <td className={tables.cell}>{line.sst_amount || '--'}</td>
                                            <td className={`inline-flex items-center px-5.5! py-0! rounded text-sm ${
                                                line.cancelled
                                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                                    : 'bg-green-100 text-green-800 border border-green-200'
                                            }`}>{line.cancelled ? 'Yes' : 'No'}</td>
                                            <td className={tables.cell}>{line.sub_total || '--'}</td>
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

                                        <hr className="my-2 border-blue-200" />

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Taxable?</div>
                                            <div className={`inline-flex items-center px-5.5! py-0! rounded text-sm ${
                                                companyPurchaseInvoice.taxable
                                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                                    : 'bg-green-100 text-green-800 border border-green-200'
                                            }`}>
                                                {companyPurchaseInvoice.taxable ? 'Yes' : 'No'}
                                            </div>
                                        </div>

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Tax %</div>
                                            <div className="font-medium text-gray-800">{companyPurchaseInvoice.tax_percent || '--'}%</div>
                                        </div>

                                        <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                            <div>Tax Amount</div>
                                            <div className="font-medium text-gray-800">{companyPurchaseInvoice.tax_amount || '--'}</div>
                                        </div>

                                        <hr className="my-2 border-blue-200" />

                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <div>Net Total:</div>
                                            <div className="font-medium text-black">
                                                {companyPurchaseInvoice.net_total || '--'}
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
                        {companyPurchaseInvoice?.created_by || "N/A"}
                    </p>

                    <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatUpdateDate(companyPurchaseInvoice?.date_updated) || "N/A"}
                    </p>
                            
                    <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <a className={details.extraSmallUppercase}>Updated By</a><br />
                        {companyPurchaseInvoice?.updated_by || "N/A"}
                    </p>
                </div>

                <hr className="my-6 border-gray-200" />
            </div>
        </div>
    );
};
export default CompanyPurchaseInvoiceDetails;
