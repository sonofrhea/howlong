import React from "react";
import { forms, tables, text } from "../Constants/Styles";
import {layout, details} from "../Constants/Styles";
import { labelStyles, buttons } from "../../Customers/constants/Styles";
import { SquarePen } from "lucide-react";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `QT-${currentYear}-`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const productItem = () => {
    return `SKU-`;
};













const QuotationDetails: React.FC<any> = ({ quotation, isLoading, onBack, onEdit }) => {

    
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Fetching quotation...</p>
            </div>
        );
    }

    if (!quotation) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Quotation Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load quotation details.</p>
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
        <div className="w-full bg-white shadow-2xl border-gray-200 shadow-gray-700 rounded-xl">
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-right">
                            <div className={layout.badge}>
                                <div className={text.badgeLarge}>
                                    QUOTATION DETAILS
                                    </div>
                                <div className={labelStyles}>
                                    {formatNumber()}{quotation.quotation_number}
                                </div>
                            </div>
                            <div className="mt-10 text-sm text-gray-500">
                                <div>
                                    <strong>Date:</strong> <span>{formatDate(quotation.quotation_date)}</span>
                                </div>
                                <div>
                                    <strong>Valid until:</strong> <span>{quotation.valid_until}</span>
                                </div>
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

                <div className="grid grid-cols-3 gap-6">
                    <p className={labelStyles}>
                        <p className={details.extraSmallUppercase}>Customer Details</p>
                        {quotation.customer_name}
                        <br />
                        <p className="text-gray-500">
                            {quotation.customer_details}
                        </p>
                    </p>

                    <p className={labelStyles}>
                        <p className={details.extraSmallUppercase}>Project description</p>
                        {quotation.project_description}
                    </p>

                    <p className={labelStyles}>
                        <p className={details.extraSmallUppercase}>Prepared by</p>
                        {quotation.agent}
                    </p>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* LINES */}
                {quotation.related_quotation && quotation.related_quotation.length > 0 && (

                    <div className="p-6">
                        <div className="overflow-x-auto">
                        <table className={forms.body}>
                            <thead className={tables.header}>
                            <tr>
                                <th className={tables.headerCell}>Item</th>
                                <th className={tables.headerCell}>Description</th>
                                <th className={tables.headerCell}>Qty</th>
                                <th className={tables.headerCell}>UOM</th>
                                <th className={tables.headerCell}>Unit Per Price</th>
                                <th className={tables.headerCell}>Currency</th>
                                <th className={tables.headerCell}>Amount</th>
                                <th className={tables.headerCell}>Cancelled</th>
                            </tr>
                            </thead>
                            
                            <tbody className={tables.body}>
                                {quotation.related_quotation.map((line: any, index: any) => (
                                    <tr key={index}>
                                        <td className={tables.cell}>{productItem()}{line.item} | {line.item_description}</td>
                                        <td className={tables.cell}>{line.description}</td>
                                        <td className={tables.cell}>{line.quantity}</td>
                                        <td className={tables.cell}>{line.unit_of_measure}</td>
                                        <td className={tables.cell}>{line.price_per_unit}</td>
                                        <td className={tables.cell}>{line.currency}</td>
                                        <td className={tables.cell}>{line.sub_total}</td>
                                        <td className={tables.cell}>{line.cancelled ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>

                        <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                            <div className="w-full sm:w-1/2 lg:w-1/3">
                                <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md border border-gray-200 shadow-gray-600">

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Gross Total</div>
                                        <div className="font-medium text-black">
                                            {quotation.gross_total}
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Discount %</div>
                                        <div className={labelStyles}>({quotation.discount_amount})%</div>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div>Tax %</div>
                                        <div className={labelStyles}>{quotation.tax_amount} %</div>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <div className="text-sm text-gray-500">Net Total</div>
                                        <div className="text-xl font-bold text-gray-900">
                                            {quotation.net_total}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default QuotationDetails;