import React from "react";





const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString();
};

const formatSupplierNumber = () => {
        const currentYear = new Date().getFullYear();
        return `SUP-${currentYear}-`;
    };












const SupplierProfileDetails: React.FC<any> = ({ supplierProfile, isLoading, onBack, onEdit }) => {

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching supplier details...</p>
            </div>
        );
    }


    if (!supplierProfile) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-black mb-2">Supplier Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load supplier details.</p>
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
                        <h2 className="text-xl font-semibold text-black">{supplierProfile?.supplier_name || "Name N/A"}</h2>
                        <p className="text-gray-600">{supplierProfile?.company_name || "N/A"}</p>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <h2 className="text-sm text-gray-500">Supplier details</h2>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        supplierProfile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {supplierProfile?.status || "N/A"}
                    </span>
                    <button 
                        onClick={onEdit}
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
                <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-6">
                    <div className="bg-blue-50 text-center rounded-lg p-6 border border-blue-300 hover:shadow-2xl hover:cursor-pointer hover:border-blue-600">
                        <h4 className="text-sm text-blue-900 font-medium">Supplier Code</h4>

                        <div className="text-lg font-semibold text-black">
                            {formatSupplierNumber()}{supplierProfile.supplier_code}
                        </div>
                    </div>

                    <div className="bg-orange-50 text-center border border-orange-600 hover:border-orange-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <h4 className="text-sm text-orange-900 font-medium">Company name</h4>

                        <div className="text-lg font-bold text-black">
                            {supplierProfile?.company_name || 'N/A'}
                        </div>
                    </div>

                    <div className="bg-purple-50 text-center border border-purple-600 hover:border-purple-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <h4 className="text-sm text-purple-900 font-medium">Category</h4>

                        <div className="text-lg font-bold text-black">
                            {supplierProfile?.category || 'N/A'}
                        </div>
                    </div>

                    <div className="bg-green-50 text-center border border-green-300 hover:border-green-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <h4 className="text-sm text-green-800 font-medium">Control Account</h4>

                        <div className="text-lg font-semibold text-black">
                            {supplierProfile.control_account?.account_code || "N/A"} - {supplierProfile.control_account?.account_name || "N/A"} - {supplierProfile.control_account?.account_type || "N/A"}
                        </div>
                    </div>

                    <div className="bg-yellow-50 text-center border border-yellow-600 hover:border-yellow-600 rounded-lg hover:cursor-pointer hover:shadow-2xl p-6">
                        <h4 className="text-sm text-yellow-800 font-medium">Date created</h4>
                        
                        <div className="text-lg font-semibold text-black">
                            {formatDate(supplierProfile?.date_created) || "N/A"}
                        </div>
                    </div>

                    <div className="bg-blue-50 text-center border border-blue-600 hover:border-blue-600 hover:cursor-pointer hover:shadow-2xl rounded-lg p-6">
                        <h4 className="text-sm text-blue-600 font-medium">Created By</h4>
                        
                        <div className="text-lg font-semibold text-black">
                            {supplierProfile?.created_by || "N/A"}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-green-50 rounded-lg p-6 border border-green-300 hover:border-green-600 hover:cursor-pointer hover:shadow-2xl">
                    <h3 className="text-lg font-semibold text-black mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500">Email</h4>
                            <div className="text-black">
                                {supplierProfile?.email || 'N/A'}
                            </div>
                        </div>
                        <div >
                            <h4 className="text-sm text-gray-500">Mobile</h4>
                            <div className="text-black">
                                {supplierProfile?.mobile_number || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Home Phone</h4>
                            <div className="text-black">
                                {supplierProfile?.home_number || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Fax</h4>
                            <div className="text-black">
                                {supplierProfile?.fax || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-300 hover:border-blue-600 hover:cursor-pointer hover:shadow-2xl">

                    <h3 className="text-lg font-semibold text-black mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            
                            <h4 className="text-sm text-gray-500">Address</h4>
                            <div className="text-black">
                                {supplierProfile?.address || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">City</h4>
                            <div className="text-black">
                                {supplierProfile?.city || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">State</h4>
                            <div className="text-black">
                                {supplierProfile?.state || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Country</h4>
                            <div className="text-black">
                                {supplierProfile?.country || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Post Code</h4>
                            <div className="text-black">
                                {supplierProfile?.post_code || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                    {/* CURRENCY INFO */}
                <div className="bg-red-50 rounded-lg p-6 border border-red-300 hover:border-red-600 hover:cursor-pointer hover:shadow-2xl">

                    <h3 className="text-lg font-semibold text-black mb-4">Preferred Currency</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <h4 className="text-sm text-gray-500">Currency code</h4>
                            <div className="text-black">
                                {supplierProfile.preferred_currency?.currency_code || 'N/A'} 
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Currency name</h4>
                            <div className="text-black">
                                {supplierProfile.preferred_currency?.currency_name || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Currency symbol</h4>
                            <div className="text-black">
                                {supplierProfile.preferred_currency?.currency_symbol || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500">Exchange rate</h4>
                            <div>
                                buying: {supplierProfile.preferred_currency?.buy || 'N/A'} | selling: {supplierProfile.preferred_currency?.sell || 'N/A'}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bg-violet-50 rounded-lg p-6 border border-violet-300 hover:border-violet-600 hover:cursor-pointer hover:shadow-2xl">
                    <h3 className="text-lg font-semibold text-black mb-4">Bank Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500">Bank Name</h4>
                            <div className="text-black">
                                {supplierProfile?.supplier_bank_name || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Bank account number</h4>
                            <div className="text-black">
                                {supplierProfile?.supplier_bank_account_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Account type</h4>
                            <div className="text-black">
                                {supplierProfile?.bank_account_type || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Status</h4>
                            <div className="text-black">
                                {supplierProfile?.status || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tax Information */}
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-300 hover:border-orange-800 hover:cursor-pointer hover:shadow-2xl">
                    <h3 className="text-lg font-semibold text-black mb-4">Tax Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500">GST Number</h4>
                            <div className="text-black">
                                {supplierProfile?.gst_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Tax ID Type</h4>
                            <div className="text-black">
                                {supplierProfile?.tax_id_type || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Tax Number</h4>
                            <div className="text-black">
                                {supplierProfile?.tax_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Tourism number</h4>
                            <div className="text-black">
                                {supplierProfile?.tourism_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Expiration date</h4>
                            <div className="text-black">
                                {formatDate(supplierProfile?.expiration_date) || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Service tax number</h4>
                            <div className="text-black">
                                {supplierProfile?.service_tax_number || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-violet-50 rounded-lg p-6 border border-violet-300 hover:border-violet-600 hover:cursor-pointer hover:shadow-2xl">
                    <h3 className="text-lg font-semibold text-black mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500">Account open date</h4>
                            <div className="text-black">
                                {formatDate(supplierProfile?.account_open_date) || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Registration Number</h4>
                            <div className="text-black">
                                {supplierProfile?.registration_number || 'N/A'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500">Remarks</h4>
                            <div className="text-black">
                                {supplierProfile?.remark || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SupplierProfileDetails;
