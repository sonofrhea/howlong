import React from "react";
import "../CustomerProfile/CustomerCss.css";
import { details, labelStyles } from "../constants/Styles";
import { CustomerDetailsProps } from "../constants/Types";






const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};


const formatUpdateDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};









const CustomerDetails: React.FC<CustomerDetailsProps> = ({
    customer,
    isLoading,
    onBack,
    onEdit,
    onValidateTIN,
    isValidatingTIN
}) => {
    const customerId = customer?.customer_number;

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching customer details...</p>
            </div>
        );
    }


    if (!customer) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-black mb-2">Customer Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load customer details.</p>
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
        <div className="w-full bg-white shadow-green-100 rounded-xl shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <button 
                        onClick={onBack}
                        className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-xl font-semibold text-black font-[Montserrat]!">{customer?.customer_name || "Name N/A"}</h2>
                        <p className="text-gray-600 font-[Montserrat]!">{customer?.company_name || "N/A"}</p>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h2 className="text-sm text-gray-500 font-[Montserrat]!">Customer provided details</h2>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {customer?.status || "N/A"}
                    </span>
                    <button 
                        onClick={() => onEdit(customerId)}
                        className="text-black  px-4 py-2 rounded-lg bg-white border cursor-pointer border-gray-200 hover:border-yellow-300 hover:bg-yellow-50  hover:shadow-2xl flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                    <div className="bg-orange-50 text-center rounded-lg p-6 border border-orange-300 hover:shadow-2xl hover:cursor-pointer hover:border-orange-600">
                        <h4 className="text-sm text-blue-600 font-medium">Customer Number</h4>

                        <div className="text-lg font-semibold text-black">
                            {formatNumber()}{customer.customer_number}
                        </div>
                    </div>

                    <div className="bg-orange-50 text-center border border-orange-300 hover:border-orange-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <h4 className="text-sm text-orange-900 font-medium! font-[Montserrat]!">
                            ID Type
                        </h4>

                        <div className="text-lg font-semibold! text-black">
                            {customer?.id_type || 'N/A'}
                        </div>
                    </div>

                    <div className="bg-orange-50 text-center border border-orange-300 hover:border-orange-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <h4 className="text-sm text-orange-900 font-medium font-[Montserrat]!">ID Number</h4>

                        <div className="text-lg font-semibold text-black">
                            {customer?.id_number || 'N/A'}
                        </div>
                    </div>

                    <div className="bg-purple-50 text-center border border-purple-300 hover:border-purple-600 rounded-lg hover:cursor-pointer hover:shadow-2xl p-6">
                        <h4 className="text-sm text-purple-800 font-medium font-[Montserrat]!">Date created</h4>
                        
                        <div className="text-lg font-semibold text-black">
                            {formatDate(customer?.date_created) || "N/A"}
                        </div>
                    </div>

                    <div className="bg-blue-50 text-center border border-blue-300 hover:border-blue-600 hover:cursor-pointer hover:shadow-2xl rounded-lg p-6">
                        <h4 className="text-sm text-blue-600 font-medium font-[Montserrat]!">Created By</h4>
                        
                        <div className="text-lg font-semibold text-black">
                            {customer?.created_by || "N/A"}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-green-50 rounded-lg p-6 border border-green-300 hover:border-green-600 hover:cursor-pointer hover:shadow-2xl">
                    <h3 className="text-lg font-semibold text-black mb-4 font-[Montserrat]!">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500">Email</h4>
                            <div className="text-black">
                                {customer?.email || 'N/A'}
                            </div>
                        </div>
                        <div >
                            <h4 className="text-sm text-gray-500">Mobile</h4>
                            <div className="text-black">
                                {customer?.mobile_number || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Home Phone</h4>
                            <div className="text-black">
                                {customer?.home_number || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Fax</h4>
                            <div className="text-black">
                                {customer?.fax || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-300 hover:border-blue-600 hover:cursor-pointer hover:shadow-2xl">

                    <h3 className="text-lg font-semibold text-black mb-4 font-[Montserrat]!">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            
                            <h4 className="text-sm text-gray-500">Address</h4>
                            <div className="text-black">
                                {customer?.address || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">City</h4>
                            <div className="text-black">
                                {customer?.city || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">State</h4>
                            <div className="text-black">
                                {customer?.state || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Country</h4>
                            <div className="text-black">
                                {customer?.country || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Post Code</h4>
                            <div className="text-black">
                                {customer?.post_code || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                    {/* CURRENCY INFO */}
                <div className="bg-red-50 rounded-lg p-6 border border-red-300 hover:border-red-600 hover:cursor-pointer hover:shadow-2xl">

                    <h3 className="text-lg font-semibold text-black mb-4 font-[Montserrat]!">Preferred Currency</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <h4 className="text-sm text-gray-500">Currency code</h4>
                            <div className="text-black">
                                {customer.preferred_currency?.currency_code || 'N/A'} 
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Currency name</h4>
                            <div className="text-black">
                                {customer.preferred_currency?.currency_name || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Currency symbol</h4>
                            <div className="text-black">
                                {customer.preferred_currency?.currency_symbol || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Exchange rate</h4>
                            <div>
                                buying: {customer.preferred_currency?.buy || 'N/A'} | selling: {customer.preferred_currency?.sell || 'N/A'}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bg-violet-50 rounded-lg p-6 border border-violet-300 hover:border-violet-600 hover:cursor-pointer hover:shadow-2xl">
                    <h3 className="text-lg font-semibold text-black mb-4" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        Bank Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500">Bank Name</h4>
                            <div className="text-black">
                                {customer?.customer_bank_name || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Bank account number</h4>
                            <div className="text-black">
                                {customer?.customer_bank_account_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Account type</h4>
                            <div className="text-black">
                                {customer?.bank_account_type || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Swift code</h4>
                            <div className="text-black">
                                {customer?.swift_code || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Status</h4>
                            <div className="text-black">
                                {customer?.status || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Remark</h4>
                            <div className="text-black">
                                {customer?.remark || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tax Information */}
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-300 hover:border-orange-800 hover:cursor-pointer hover:shadow-2xl">
                    <h3 className="text-lg font-semibold text-black mb-4" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        Tax Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500">GST Number</h4>
                            <div className="text-black">
                                {customer?.gst_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Tax ID Type</h4>
                            <div className="text-black">
                                {customer?.tax_id_type || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Tax Number/TIN Number</h4>
                            <div className="text-black">
                                {customer?.tax_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Tourism number</h4>
                            <div className="text-black">
                                {customer?.tourism_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Expiration date</h4>
                            <div className="text-black">
                                {formatDate(customer?.expiration_date) || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Service tax number</h4>
                            <div className="text-black">
                                {customer?.service_tax_number || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>




                {/* e-Invoice / TIN Validation */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-300 hover:border-blue-600 hover:cursor-pointer hover:shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold font-[Montserrat]! text-black mb-4">e-Invoice / LHDN</h3>
                        <button
                            onClick={() => onValidateTIN(customerId)}
                            disabled={isValidatingTIN}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-200 bg-white text-blue-700 text-sm font-medium hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-[Montserrat]!"
                        >
                            {isValidatingTIN ? (
                                <>
                                    <svg className="w-3.5 h-3.5 animate-spin font-[Montserrat]!" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Validating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-3.5 h-3.5 font-[Montserrat]!" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Validate TIN
                                </>
                            )}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500 font-[Montserrat]!">TIN Validated</h4>
                            <div className="mt-1">
                                {customer.tin_validated ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-emerald-100 text-emerald-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-current font-[Montserrat]!" />
                                        Validated
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-red-100 text-red-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-current font-[Montserrat]!" />
                                        Not Validated
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500 font-[Montserrat]!">Last Validated</h4>
                            <div className="text-black font-[Montserrat]!">
                                {customer.tin_validated_at
                                    ? new Date(customer.tin_validated_at).toLocaleString('en-MY')
                                    : 'Never'
                                }
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500 font-[Montserrat]!">Buyer Type</h4>
                            <div className="text-black">
                                {customer.buyer_type || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                        
            <hr className="my-6 border-gray-200" />

            <div className="grid lg:grid-cols-5">
                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <a className={details.extraSmallUppercase}>Date Updated</a><br />
                    {formatUpdateDate(customer?.date_updated) || "N/A"}
                </p>
                        
                <p className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                    <a className={details.extraSmallUppercase}>Updated By</a><br />
                    {customer?.updated_by || "N/A"}
                </p>
            </div>

            <hr className="my-6 border-gray-200" />

        </div>
    );
};

export default CustomerDetails;