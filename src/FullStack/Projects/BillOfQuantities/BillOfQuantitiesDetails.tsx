import React from "react";
import '../constants/BOQDetails.css';
import { buttons, forms, tables } from "../constants/Styles";
import { SquarePen } from "lucide-react";
import { billofQuantitiesProjectName } from "../../handlers";
import { BillOfQuantitiesDetailsProps } from "../constants/Types";
import { labelStyles } from "../../Accounting/Constants/Styles";
import { details } from "../../Customers/constants/Styles";

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `BOQ-${currentYear}-`;
};



const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};



const formatUpdatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};


const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};












const BillOfQuantitiesDetails: React.FC<BillOfQuantitiesDetailsProps> = ({
    billOfQuantity,
    isLoading,
    onBack,
    onEdit
}) => {
    const billOfQuantityId = billOfQuantity?.boq_number;


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching bill of quantities...</p>
            </div>
        );
    }


    if (!billOfQuantity) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Bill Of Quantities Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load bill of quantities.</p>
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
        <div className="w-[95%] mx-auto page border border-gray-200 p-8 rounded-2xl bg-white overflow-hidden">
            <header>
                <div className="flex-1">
                    <div className="mb-12">
                        <h1 style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Bill of Quantities
                        </h1>
                    </div>
                    <div className="meta">
                        <div className="meta-item">
                            <span className="meta-label">BOQ Number</span>
                            <span className="meta-value">
                                {formatNumber()}{billOfQuantity.boq_number}
                            </span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Date</span>
                            <span className="meta-value">
                                {formatDate(billOfQuantity.date)}
                            </span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Project</span>
                            <span className="meta-value">
                                {formatProjectNumber()}{billOfQuantity.project || 'N/A'} | {billOfQuantity.project_name || 'N/A'}
                            </span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Status</span>
                            <span className="status-badge">
                                {billOfQuantity.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => onEdit(billOfQuantityId)}
                        className={buttons.editButtonGreen}
                    >
                        <SquarePen size={20} strokeWidth={1.5} />
                        Edit
                    </button>
                </div>
            </header>

            <div className="">
                <div className="description-section">
                    <div className="label text-2xl font-extrabold">BOQ Description</div>
                    <div className="content">
                        {billOfQuantity.boq_description}
                    </div>
                </div>


                {billOfQuantity.boq && billOfQuantity.boq.length > 0 && (
                <div className="py-6">
                    <div className="overflow-x-auto">
                        <table className={forms.bodyBOQ}>
                            <thead className={tables.headerBOQ}>
                                <tr>
                                    <th className={tables.headerCellBOQ}>Product Item</th>
                                    <th className={tables.headerCellBOQ}>Additional Item Description</th>
                                    <th className={tables.headerCellBOQ}>Unit of Measurement</th>
                                    <th className={tables.headerCellBOQ}>Quantity</th>
                                    <th className={tables.headerCellBOQ}>Rate per unit</th>
                                    <th className={tables.headerCellBOQ}>Estimated Amount</th>
                                </tr>
                            </thead>
                            <tbody className={tables.body}>
                                {billOfQuantity.boq.map((line, index) => (
                                    <tr key={index} className={tables.row}>
                                        <td>SKU-{line.product_item || 'N/A'} | {line.product_item_name || 'N/A'}</td>
                                        <td>{line.additional_item || '--'}</td>
                                        <td className="unit">{line.unit_of_measurement}</td>
                                        <td className="qty right">{line.quantity}</td>
                                        <td className="rate right">{line.rate_per_unit}</td>
                                        <td className="text-black">{line.estimated_amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}

                <div className="totals">
                    <div className="box">
                        <div className="small">Gross Estimation</div>
                        <div className="font-bold">
                            {billOfQuantity.gross_estimation}
                        </div>
                    </div>

                    <div className="box">
                        <div className="small">Contingency Rate %</div>
                        <div className="font-bold">
                            {billOfQuantity.contingency_percentage}%
                        </div>
                    </div>

                    <div className="box">
                        <div className="small">Net Estimation</div>
                        <div className="font-bold text-[#2d64c3]">
                            {billOfQuantity.net_estimation}
                        </div>
                    </div>
                </div>
            </div>
            
                            <hr className="my-6 border-gray-200" />
                                                                                    
                            <div className="grid lg:grid-cols-5">
                                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    <a className={details.extraSmallUppercase}>Created by</a><br />
                                    {billOfQuantity.created_by || 'N/A'}
                                </p>
            
                                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    <a className={details.extraSmallUppercase}>Updated By</a><br />
                                    {billOfQuantity.updated_by || 'N/A'}
                                </p>
            
                                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    <a className={details.extraSmallUppercase}>Date Updated</a><br />
                                    {formatUpdatedDate(billOfQuantity.date_updated) || 'N/A'}
                                </p>
                            </div>
            
                            <hr className="my-6 border-gray-200" />
        </div>
    );
};
export default BillOfQuantitiesDetails;
