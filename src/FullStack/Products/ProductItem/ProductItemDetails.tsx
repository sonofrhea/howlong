import { buttons } from "../constants/Styles";


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};


const ProductItemDetails: React.FC<any> = ({ productItem, isLoading, onBack, onEdit }) => {


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



    return (
        <div className="w-full  overflow-hidden font-sans rounded-2xl! bg-gray-50 min-h-screen border border-gray-200 shadow-2xl ">

            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Products</span>
                    <span>/</span>
                    <span className="text-gray-800 font-semibold">SKU-{productItem.item_code}</span>
                </div>
                </div>

                <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    productItem.active
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${productItem.active ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {productItem.active ? 'Active' : 'Inactive'}
                </span>
                <button onClick={onEdit} className={buttons.editButtonGreen}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Item
                </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

                {/* ── ROW 1: Photo + Core Identity ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Photo card */}
                <div className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center p-8 shadow-sm">
                    <div className="w-full aspect-square max-w-xs flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                    <img
                        src={productItem.product_photo}
                        alt="product_photo"
                        className="w-full h-full object-contain p-4"
                    />
                    </div>
                    <p className="mt-4 text-xs text-gray-400 font-medium tracking-wide uppercase">Primary Photo</p>
                </div>

                {/* Identity + quick stats */}
                <div className="lg:col-span-2 flex flex-col gap-4">

                    {/* Title card */}
                    <div className="bg-white rounded-2xl border border-gray-200 px-7 py-6 shadow-sm">
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Product Item</p>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                        SKU-{productItem.item_code}
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {productItem.item_description || <span className="italic text-gray-300">No description provided.</span>}
                    </p>
                    </div>

                    {/* 4 stat tiles */}
                    <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                        <a className="text-xs font-bold tracking-widest text-indigo-900 uppercase mb-1">Product Group</a>
                        <p className="text-sm font-bold text-gray-800">SKG-{productItem.product_group}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                        <a className="text-xs font-bold tracking-widest text-amber-900 uppercase mb-1">Supplier</a>
                        <p className="text-sm font-bold text-gray-800 truncate">{productItem.supplier_name || '—'}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                        <a className="text-xs font-bold tracking-widest text-emerald-900 uppercase mb-1">Date Created</a>
                        <p className="text-sm font-bold text-gray-800">{formatDate(productItem.date_created)}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm">
                        <a className="text-xs font-bold tracking-widest text-pink-900 uppercase mb-1">Created By</a>
                        <p className="text-sm font-bold text-gray-800 truncate">{productItem.created_by || '—'}</p>
                    </div>
                    </div>

                </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-7 py-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full bg-indigo-500" />
                    <h2 className="text-sm font-bold text-gray-700 tracking-wide">Specifications</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-gray-100">
                    {[
                    { label: 'Serial Number',       value: productItem.product_serial_number },
                    { label: 'Unit of Measure',     value: productItem.base_unit_of_measure },
                    { label: 'Quantity Available',  value: productItem.quantity_available },
                    { label: 'Reference Cost',      value: productItem.reference_cost },
                    { label: 'Reference Price',     value: productItem.reference_price },
                    { label: 'Supplier Name',       value: productItem.supplier_name },
                    ].map((item, i) => (
                    <div key={i} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                        <a className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-1.5">{item.label}</a>
                        <p className="text-sm font-semibold text-gray-800">
                        {item.value || <span className="text-gray-300 italic font-normal">Not provided</span>}
                        </p>
                    </div>
                    ))}
                </div>
                </div>

                {/* ── ROW 3: Additional Photos ── */}
                {productItem.additional_photos && productItem.additional_photos.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-7 py-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full bg-violet-500" />
                    <h2 className="text-sm font-bold text-gray-700 tracking-wide">Additional Photos</h2>
                    <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">
                        {productItem.additional_photos.length}
                    </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y divide-gray-100">
                    {productItem.additional_photos.map((line: any, index: any) => (
                        <div key={`photo-${index}`} className="p-5  transition-colors flex flex-col gap-3">
                        <div className="w-full aspect-square rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-400 hover:border-3 cursor-pointer overflow-hidden flex items-center justify-center">
                            <img
                            src={line.additional_photo}
                            alt="additional_photo"
                            className="w-full h-full object-contain p-3"
                            />
                        </div>
                        <div className="flex items-start gap-2.5">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-[10px] font-black flex items-center justify-center mt-0.5">
                            {index + 1}
                            </span>
                            <a key={`description-${index}`} className="text-xs text-gray-500 leading-relaxed">
                            {line.description || <span className="italic text-gray-300">No description</span>}
                            </a>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}

            </div>
        </div>
    );
};
export default ProductItemDetails;
