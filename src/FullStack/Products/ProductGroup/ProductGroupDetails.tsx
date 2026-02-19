import { buttons } from "../constants/Styles";
import { ProductGroupDetailsProps } from "../constants/Types";


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};












const ProductGroupDetails: React.FC<ProductGroupDetailsProps> = ({
    productGroup,
    isLoading,
    onBack,
    onEdit
}) => {
    const productGroupId = productGroup?.group_code;


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">fetching product group...</p>
            </div>
        );
    }


    if (!productGroup) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Group Not Found</h2>
                <p className="text-gray-600 mb-4">Unable to load product group.</p>
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
        <div className="w-full bg-white shadow-gray-400 rounded-xl shadow-2xl border border-gray-200">
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
                        <h2 className="text-xl font-semibold text-gray-800">SKG-{productGroup.group_code}</h2>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div className="text-sm text-gray-500">Product group details</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                        Active: {productGroup.active ? 'Yes' : 'No'}
                    </span>
                    <button 
                        onClick={() => onEdit(productGroupId)}
                        className={buttons.editButtonGreen}
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
                    <div className="bg-blue-50 text-center border border-blue-300 hover:border-blue-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <div className="text-sm text-blue-900 font-medium">Group code</div>

                        <div className="text-lg font-semibold text-black">
                            SKG-{productGroup.group_code}
                        </div>
                    </div>

                    <div className="bg-green-50 text-center border border-green-300 hover:border-green-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <div className="text-sm text-green-900 font-medium">Group name</div>

                        <div className="text-lg font-semibold text-black">
                            {productGroup.group_name}
                        </div>
                    </div>

                    <div className="bg-orange-50 text-center border border-orange-300 hover:border-orange-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <div className="text-sm text-orange-900 font-medium">Costing method</div>

                        <div className="text-lg font-semibold text-black">
                            {productGroup.costing_method}
                        </div>
                    </div>

                    <div className="bg-purple-50 text-center border border-purple-300 hover:border-purple-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <div className="text-sm text-purple-900 font-medium">Date created</div>

                        <div className="text-lg font-semibold text-black">
                            {formatDate(productGroup.date_created)}
                        </div>
                    </div>

                    <div className="bg-purple-50 text-center border border-purple-300 hover:border-purple-600 hover:shadow-2xl hover:cursor-pointer rounded-lg p-6">
                        <div className="text-sm text-purple-900 font-medium">created by</div>

                        <div className="text-lg font-semibold text-black">
                            {productGroup.created_by}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 hover:cursor-pointer hover:shadow-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Group Description</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                        <div className="text-gray-800">
                            {productGroup.description || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Info */}
            <div className="bg-slate-50 rounded-lg p-6 hover:cursor-pointer hover:shadow-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Group Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <div className="text-sm text-gray-500">Sales code</div>
                        <div className="text-black">
                            {productGroup.sales_code || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Purchase code</div>
                        <div className="text-black">
                            {productGroup.purchase_code || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Cash sales code</div>
                        <div className="text-black">
                            {productGroup.cash_sales_code || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Cash purchase code</div>
                        <div className="text-black">
                            {productGroup.cash_purchase_code || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Sales return code</div>
                        <div className="text-black">
                            {productGroup.sales_return_code || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Purchase return code</div>
                        <div className="text-black">
                            {productGroup.purchase_return_code || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Balance sheet stock</div>
                        <div className="text-black">
                            {productGroup.balance_sheet_stock || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductGroupDetails;
