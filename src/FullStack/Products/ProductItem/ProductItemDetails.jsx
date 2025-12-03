import React from "react";



const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};


const ProductItemDetails = ({ productItem, isLoading, onBack, onEdit }) => {


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading product item...</p>
            </div>
        );
    }

    if (!productItem) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Item Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load product item.</p>
                <button 
                    onClick={onBack}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }

    console.log(productItem);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                        <h2 className="text-xl font-semibold text-gray-800">SKU-{productItem.item_code}</h2>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="text-sm text-gray-500">Product item details</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        productItem.active === 'True' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {productItem.active}
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
                        <div className="text-sm text-blue-600 font-medium">Group code</div>

                        <div className="text-lg font-semibold text-gray-800">
                            SKU-{productItem.item_code}
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-600 font-medium">Group</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {productItem.product_group}
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-sm text-orange-600 font-medium">Description</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {productItem.item_description}
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-sm text-purple-600 font-medium">Date created</div>

                        <div className="text-lg font-semibold text-gray-800">
                            {formatDate(productItem.date_created)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Info */}
            <div className="bg-amber-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Item Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <div className="text-sm text-gray-500">Product serial number</div>
                        <div className="text-gray-800">
                            {productItem.product_serial_number || 'Not provided'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Base Unit Of Measure</div>
                        <div className="text-gray-800">
                            {productItem.base_unit_of_measure || 'Not provided'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Reference cost</div>
                        <div className="text-gray-800">
                            RM {productItem.reference_cost || 'Not provided'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Reference price</div>
                        <div className="text-gray-800">
                            RM {productItem.reference_price || 'Not provided'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Quantity available</div>
                        <div className="text-gray-800">
                            {productItem.quantity_available || 'Not provided'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Supplier name</div>
                        <div className="text-gray-800">
                            {productItem.supplier_name || 'Not provided'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Photo(s)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-gray-500">Product Photo</div>
                        <img 
                            src={productItem.product_photo}
                            alt="product_photo" 
                            className="w-[200px] h-[200px] rounded-lg object-contain mx-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Additional Images */}
            {productItem.additional_photos && productItem.additional_photos.length > 0 && (
            <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Photo(s)</h3>

                <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-gray-200">
                        <div className="bg-violet-100 p-3 font-medium text-gray-700">Additional photo</div>
                        <div className="bg-green-100 p-3 font-medium text-gray-700">Description</div>
                    </div>

                    <div className="space-y-4 divide-x divide-y">
                        {productItem.additional_photos.map((line, index) => (
                            <>
                                <div key={`photo-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <img 
                                        src={line.additional_photo}
                                        alt="additional_photo"
                                        className="w-[200px] h-[200px] rounded-2xl object-contain mx-auto"
                                    />
                                    <div key={`description-${index}`} className="text-gray-800 content-center text-center">
                                        {line.description}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};
export default ProductItemDetails;
