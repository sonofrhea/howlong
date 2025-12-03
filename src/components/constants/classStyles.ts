

export const iconStyles = {
    small: "w-5 h-5"
};


export const sideBarStyles = {
    background: "min-h-screen bg-white",
    backdrop: "h-16 border-b border-gray-100 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6",
    expansion: "sidebar fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-40 transition-all duration-300",
    open: "w-55",
    closed: "w-16",
    menu: "h-20 border-b border-gray-100 flex items-center justify-center cursor-pointer",
    menu2: "w-10 h-10 bg-gradient-to-br from-green-500 to-violet-500 rounded-lg flex items-center justify-center shadow-sm",
    propagation: "absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow",
    dashboard: "text-sm text-gray-600 hover:text-gray-600 transition-colors duration-200 flex items-center gap-2",
    dashboardLink: "flex items-center px-6 py-3 text-gray-600 hover:text-gray-600 hover:bg-gray-50 transition-colors duration-200",
    justify: "w-6 h-6 flex items-center justify-center text-gray-500 hover:text-green-500",
    expandedFont: "ml-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:text-green-500",
    transition: {
        open: "bg-blue-50 border-r-2 border-blue-500 text-blue-600",
        closed: "text-gray-600 hover:bg-gray-50",
        all: "transition-all duration-200"
    },
    current: "flex items-center px-6 py-3 bg-blue-50 text-blue-600 border-r-2 border-blue-600",
    expanded : {
        open: "text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap",
    },
    availability: {
        duration: "flex items-center px-6 py-3 transition-colors duration-200",
        yes: "text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer",
        no: "text-gray-400 cursor-not-allowed",
        fullDuration: "w-full flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200",
    },
    sidebarBackground: "w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center",
};



export const textStyles = {
    semiBoldGray: "text-sm font-semibold text-gray-900",
    smallGrayMb2: "text-xs text-gray-400 mb-2",
    lightFont: "text-xl font-light text-gray-900",
};


export const dashboardStyles = {
    main: "min-h-screen bg-gray-50 p-4",
    gridStyle3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    gridStyle4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
    gridStyle5: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6",
    gridStyle6: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6",
    gridStyle7: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6",
    availability: "bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200",
    yes: "cursor-pointer",
    no: "cursor-not-allowed opacity-50",
};



export const appMenuStyle = {
    inset: "fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-8",
    whiteBackground: "bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden",
    header2 : "text-xl font-light text-gray-900",
    hover: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
};



export const menuClick = {
    onClick: {
        availability: "p-4 rounded-xl border transition-all duration-200",
        yes: "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer",
        no: "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60",
        pathname: "ring-2 ring-blue-500 ring-opacity-20"
    },
    unavailable: {
        justify: "w-10 h-10 rounded-lg flex items-center justify-center",
    },
};