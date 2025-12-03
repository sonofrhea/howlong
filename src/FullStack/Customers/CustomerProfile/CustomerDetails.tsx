import React from "react";
import './CustomerCss.css';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const formatNumber = () => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-`;
    };

const CustomerDetails = ({ customer, isLoading, onBack, onEdit }) => {

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading customer details...</p>
            </div>
        );
    }


    if (!customer) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Customer Not Found</h2>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                        <h2 className="text-xl font-semibold text-gray-800">{customer.customer_name}</h2>
                        <p className="text-gray-600">{customer.company_name}</p>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="text-sm text-gray-500">Customer provided details</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {customer.status}
                    </span>
                    <button 
                        onClick={onEdit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-sm text-blue-600 font-medium">Customer Number</div>

                        <div className="text-lg font-semibold text-gray-800">
                            CV-{formatNumber()}{customer.customer_number}
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-600 font-medium">Control Account</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {customer.control_account.account_code} - {customer.control_account.account_name} - {customer.control_account.account_type}
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-sm text-orange-600 font-medium">ID Type</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {customer.id_type || 'ID not provided'}
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-sm text-purple-600 font-medium">Date created</div>
                        
                        <div className="text-lg font-semibold text-gray-800">
                            {formatDate(customer.date_created)}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <div className="text-gray-800">
                                {customer.email || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Mobile</div>
                            <div className="text-gray-800">
                                {customer.mobile_number || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Home Phone</div>
                            <div className="text-gray-800">
                                {customer.home_number || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Fax</div>
                            <div className="text-gray-800">
                                {customer.fax || 'Not provided'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-gray-50 rounded-lg p-6">

                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            
                            <div className="text-sm text-gray-500">Address</div>
                            <div className="text-gray-800">
                                {customer.address || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">City</div>
                            <div className="text-gray-800">
                                {customer.city || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">State</div>
                            <div className="text-gray-800">
                                {customer.state || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Country</div>
                            <div className="text-gray-800">
                                {customer.country || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Post Code</div>
                            <div className="text-gray-800">
                                {customer.post_code || 'Not provided'}
                            </div>
                        </div>
                    </div>
                </div>

                    {/* CURRENCY INFO */}
                <div className="bg-gray-50 rounded-lg p-6">

                    <div className="text-lg font-semibold text-gray-800 mb-4">Preferred Currency</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <div className="text-sm text-gray-500">Currency code</div>
                            <div className="text-gray-800">
                                {customer.preferred_currency.currency_code || 'Not provided'} 
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Currency name</div>
                            <div className="text-gray-800">
                                {customer.preferred_currency.currency_name || 'Not provided'}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Currency symbol</div>
                            <div className="text-gray-800">
                                {customer.preferred_currency.currency_symbol}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Exchange rate</div>
                            <div>
                                buying: {customer.preferred_currency.buy} | selling: {customer.preferred_currency.sell}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <div className="text-sm text-gray-500">Bank Name</div>
                            <div className="text-gray-800">
                                {customer.customer_bank_name || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Bank account number</div>
                            <div className="text-gray-800">
                                {customer.customer_bank_account_number || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Account type</div>
                            <div className="text-gray-800">
                                {customer.bank_account_type || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Swift code</div>
                            <div className="text-gray-800">
                                {customer.swift_code || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Status</div>
                            <div className="text-gray-800">
                                {customer.status || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Remark</div>
                            <div className="text-gray-800">
                                {customer.remark || 'Not provided'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tax Information */}
                <div className="bg-orange-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <div className="text-sm text-gray-500">GST Number</div>
                            <div className="text-gray-800">
                                {customer.gst_number || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Tax ID Type</div>
                            <div className="text-gray-800">
                                {customer.tax_id_type || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Tax Number</div>
                            <div className="text-gray-800">
                                {customer.tax_number || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Tourism number</div>
                            <div className="text-gray-800">
                                {customer.tourism_number || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Expiration date</div>
                            <div className="text-gray-800">
                                {formatDate(customer.expiration_date) || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Service tax number</div>
                            <div className="text-gray-800">
                                {customer.service_tax_number || 'Not provided'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;