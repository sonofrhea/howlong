import React from "react";
import { buttons, details, forms, labelStyles, layout, tables, text } from "../Constants/Styles";
import { SquarePen } from "lucide-react";
import { InvoiceDetailsProps } from "../Constants/Types";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `INV-${currentYear}-`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};



const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};


const formatUpdateDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};










const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
    invoice,
    isLoading,
    onBack,
    onEdit
}) => {
    const invoiceId = invoice?.invoice_number;

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Fetching invoice...</p>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Invoice Not Found</h2>
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


    return (
        <div className="w-full mx-auto page bg-white shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden">
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    INVOICE DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{invoice.invoice_number}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => onEdit(invoiceId)}
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
                            <a className={details.extraSmallUppercase}>Quotation No.</a><br />
                            {formatNumber()}{invoice.invoice_number}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Invoice Date</a><br />
                            {formatDate(invoice.invoice_date)}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Invoice Due Date</a><br />
                            {invoice.invoice_due_date}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Customer</a><br />
                            {formatCustomerNumber()}{invoice.customer || 'N/A'} | {invoice.customer_name || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Customer Extra Details</a><br />
                            {invoice.customer_details || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Description</a><br />
                            {invoice.description || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Currency</a><br />
                            {invoice.currency || 'N/A'}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Cancelled</a><br />
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                    invoice.cancelled
                                        ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                }`}>
                                    {invoice.cancelled ? 'Yes' : 'No'}
                            </span>
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Agent</a><br />
                            {invoice.agent}
                        </p>
                        
                        <p className={labelStyles}>
                            <a className={details.extraSmallUppercase}>Related Project</a><br />
                            {invoice.project_name}
                        </p>
                    </div>

                    {/* LINES */}
                    {invoice.related_invoice && invoice.related_invoice.length > 0 && (

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className={forms.body}>
                                    <thead className={tables.header}>
                                        <tr>
                                            <th className={tables.headerCell}>Item</th>
                                            <th className={tables.headerCell}>Description</th>
                                            <th className={tables.headerCell}>Quantity</th>
                                            <th className={tables.headerCell}>UOM</th>
                                            <th className={tables.headerCell}>Price/Per Unit</th>
                                            <th className={tables.headerCell}>Amount</th>
                                            <th className={tables.headerCell}>Cancelled</th>
                                        </tr>
                                    </thead>

                                    <tbody className={tables.body}>
                                        {invoice.related_invoice.map((line, index) => (
                                            <tr key={index}>
                                                <td className={tables.cell}>SKU-{line.item} | {line.item_name}</td>
                                                <td className={tables.cell}>{line.description || '--'}</td>
                                                <td className={tables.cell}>{line.quantity || '--'}</td>
                                                <td className={tables.cell}>{line.unit_of_measure || '--'}</td>
                                                <td className={tables.cell}>{line.price_per_unit || '--'}</td>
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
                                        <div className="font-medium text-gray-800">{invoice.gross_total || 'N/A'}</div>
                                    </div>

                                    <hr className="my-2 border-blue-200" />

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Discount %</div>
                                        <div className="font-medium text-gray-800">({invoice.discount_amount || 'N/A'})%</div>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Total after discount</div>
                                        <div className="font-medium text-gray-800">{invoice.after_discount_totals || 'N/A'}</div>
                                    </div>

                                    <hr className="my-2 border-blue-200" />

                                    <div className="flex justify-between font-bold text-sm text-gray-600 mt-2">
                                        <div>Tax %</div>
                                        <div className="font-medium text-gray-800">{invoice.tax_amount || 'N/A'}%</div>
                                    </div>

                                    <hr className="my-2 border-blue-200" />

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Net Total</div>
                                        <div className="text-xl font-bold text-gray-900">{invoice.net_total || 'N/A'}</div>
                                    </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <hr className="my-6 border-gray-200" />
    
                
                <div className="grid lg:grid-cols-5">
                    
                    <div className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Created by</a><br />
                        {invoice.created_by}
                    </div>
    
    
                    <div className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Date Updated</a><br />
                        {formatDateTime(invoice.date_updated)}
                    </div>
    
    
                    <div className={labelStyles}>
                        <a className={details.extraSmallUppercase}>Updated by</a><br />
                        {invoice.updated_by}
                    </div>
                </div>
    
                <hr className="my-6 border-gray-200" />
            </div>
        </div>
    );

};
export default InvoiceDetails;
