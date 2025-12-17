

export const spinningStyles = {
    terminalBar: {
        container: "font-mono p-8",
        row: "flex items-center",
        spinner: "text-blue-500 mr-2 animate-spin text-4xl",
        barContainer: "w-64 h-4 bg-gray-800 border border-gray-700 overflow-hidden",
        barFill: "h-full bg-black animate-progress",
        text: "text-gray-600 text-sm mt-2 ml-8"
    }
};




export const forms = {
  body: "w-[100%] mx-auto page bg-white shadow-lg rounded-2xl overflow-hidden",
  input: {
    date: "px-3 py-2 border hover:cursor-pointer selection:cursor-pointer border-violet-300 drop-shadow-md shadow-inner rounded focus:ring-2 focus:ring-green-500 focus:border-violet-500 transition-colors",
    number: "w-full border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
    base: "px-3 py-2 border rounded focus:ring-2 focus:border-transparent transition-colors"
  },
  select: {
    full: "w-full drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300",
    partial: "w-[60%] drop-shadow-md shadow-inner rounded cursor-pointer border border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300",
    small: "w-[80%] cursor-pointer border drop-shadow-md shadow-inner rounded border-violet-300 px-3 py-2 focus:ring-2 focus:ring-green-300"
  },
  label: "px-2 py-1 text-center tracking-[0.1em] text-xs font-semibold uppercase",
  nextLevelLabel: "px-2 py-1 text-center tracking-[0.1em] text-xs font-semibold uppercase mt-4",
  secondLevelLabel: "px-2 py-1 text-center tracking-[0.1em] text-xs font-semibold uppercase mt-5",
  description: "w-[50%] border border-gray-300 drop-shadow-md shadow-inner rounded p-1 focus:outline-none focus:ring-1 focus:ring-green-500"
};







export const buttons = {
  primary: "px-6 py-3 bg-amber-900 text-white rounded drop-shadow-md shadow-xl hover:bg-green-700 font-medium disabled:opacity-50",
  remove: "text-red-600 hover:text-red-800 font-medium text-sm",
  add: "text-blue-600 hover:text-blue-800 font-medium text-sm w-full",
  addLine: "min-w-full divide-y divide-gray-100"
};









export const layout = {
  tag: "flex items-center gap-4",
  page: "w-[100%] mx-auto bg-white shadow-lg rounded-2xl overflow-hidden",
  header: "flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6",
  badge: "inline-block bg-amber-50 border border-amber-100 px-4 py-2 rounded drop-shadow-md shadow-xl",
  redBadge: "inline-block bg-rose-50 border border-rose-100 px-4 py-2 rounded drop-shadow-md shadow-xl",
  formSectionCol2: "border-t border-b border-gray-100 p-6 grid grid-cols-2 gap-6",
  formSectionCol3: "border-t border-b border-gray-100 p-6 grid grid-cols-3 gap-6",
  formSectionCol4: "border-t border-b border-gray-100 p-6 grid grid-cols-4 gap-6",
  submitSection: "flex justify-end gap-4 pt-6 border-t border-gray-200",
  horizontalRule: "my-6 border-gray-200"
};

export const tables = {
  base: "w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner",
  header: "bg-blue-100 drop-shadow-md shadow-lg",
  headerCell: "text-center text-xs font-semibold uppercase",
  body: "bg-white divide-y divide-gray-100",
  row: "bg-white divide-y divide-x divide-gray-100",
  cell: "px-4 py-4 text-sm text-gray-600",
  autoCalculate: "px-4 py-4 text-sm text-gray-600 whitespace-nowrap",
  text: "w-[100%] border border-gray-300 drop-shadow-md shadow-inner rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
};

export const text = {
  badgeSmall: "text-xs text-amber-700 uppercase tracking-wide",
  redBadgeSmall: "text-xs text-rose-700 uppercase tracking-wide",
  badgeLarge: "text-lg tracking-[0.0.5em] font-bold text-amber-800",
  redBadgeLarge: "text-lg tracking-[0.0.5em] font-bold text-rose-800",
  loading: "flex items-center gap-2",
  numbers: "text-gray-500 mr-1"
};

export const utils = {
  spinner: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
};



export const listTable = {
  headerPlacement: "w-1/5 text-center"
};


export const management = {
  searchSize: "pl-10 pr-2 py-1 border border-gray-200 rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 w-64 focus:shadow-sm"
};





export const iconStyles = {
    small: "w-6 h-6"
};

