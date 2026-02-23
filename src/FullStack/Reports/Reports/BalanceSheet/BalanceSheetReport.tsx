import React from "react";
import { BalanceSheetPeriodTypes, BalanceSheetResponse } from "../../constants/Types";
import { getAllBalanceSheetAccountNames, getBalanceSheetBalances } from "../../constants/helpers";






const BalanceSheetReport: React.FC<{ balanceSheet: BalanceSheetResponse[],
    periodType: BalanceSheetPeriodTypes }> = ({ balanceSheet, periodType }) => {
    

    
    const columnCount = balanceSheet.length;






    if (!balanceSheet) {
        return(
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data found</h3>
                <p className="text-gray-500">Balance Sheet report not available for the selected period.</p>
            </div>
        );
    }




    return(
        <div className="w-[112%]">
            <div className="px-4 py-2 bg-linear-to-r ">
                <div className="flex items-center justify-between">
                    <h3 className="text-s font-semibold text-gray-800">
                        Statement Of Financial position As At... {new Date().toISOString().split("T")[0]}
                    </h3>
                    <div className="flex items-center gap-4">
                    </div>
                </div>
            </div>

            <div className="min-h-full min-w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="fade-in bg-white rounded-2xl shadow-xl shadow-slate-300/40 overflow-hidden border border-slate-200/60">
                        <div className="overflow-x-auto">
                            <div className="p-6 md:p-8 min-w-max">

                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-slate-800">
                                            <th className="text-left py-4 px-3 font-semibold text-slate-800 text-sm uppercase tracking-wider">
                                                Account
                                            </th>
                                            {balanceSheet.map((report: BalanceSheetResponse, index: number) => (
                                                <th key={index}
                                                    className="text-right py-4 px-6 font-semibold text-slate-800 text-sm uppercase tracking-wider whitespace-nowrap"
                                                >
                                                    {report.period}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* NON-CURRENT ASSETS */}
                                        <tr className="bg-blue-50">
                                            <td className="py-3 px-3 text-left font-bold text-blue-900 text-base" colSpan={columnCount + 1}>
                                            NON-CURRENT ASSETS
                                            </td>
                                        </tr>

                                        {/* Fixed Assets */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'fixed_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-20 text-left text-slate-700 font-medium">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalanceSheetBalances(period, 'fixed_assets', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* Contra Fixed Assets */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'contra_fixed_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 text-left px-3 pl-8 text-slate-700 font-medium">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalanceSheetBalances(period, 'contra_fixed_assets', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* Other Assets */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'other_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 text-left px-3 pl-8 text-slate-700 font-medium">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalanceSheetBalances(period, 'other_assets', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* Other Contra Assets */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'other_contra_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 text-left px-3 pl-8 text-slate-700 font-medium">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalanceSheetBalances(period, 'other_contra_assets', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* CURRENT ASSETS */}
                                        <tr className="bg-blue-50">
                                            <td className="py-3 px-3 text-left font-bold text-blue-900 text-base" colSpan={columnCount + 1}>
                                            CURRENT ASSETS
                                            </td>
                                        </tr>

                                        {/* current_assets */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'current_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 text-left px-3 pl-8 text-slate-700 font-medium">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalanceSheetBalances(period, 'current_assets', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* contra_current_assets */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'contra_current_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalanceSheetBalances(period, 'contra_current_assets', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* TOTAL ASSETS */}
                                        <tr className="border-t-2 border-slate-900 bg-linear-to-r from-blue-50 to-cyan-50">
                                            <td className="py-4 px-3 text-left font-bold text-slate-900 text-base">
                                                TOTAL ASSETS
                                            </td>
                                            {balanceSheet.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-4 px-6 number-cell font-bold text-blue-700 text-base whitespace-nowrap"
                                                >
                                                    {period.total_assets}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* EQUITY */}
                                        <tr className="bg-purple-50">
                                            <td className="py-3 px-3 text-left font-bold text-purple-900 text-base" colSpan={columnCount + 1}>
                                                EQUITY
                                            </td>
                                        </tr>

                                        {/* shareholder equity */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'shareholder_equity').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 text-left pl-8 text-slate-700 font-medium">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalanceSheetBalances(period, 'shareholder_equity', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* RETAINED EARNING */}
                                        <tr className="bg-purple-50">
                                            <td className="py-3 px-3 text-left font-bold text-purple-900 text-base" colSpan={columnCount + 1}>
                                                RETAINED EARNINGS
                                            </td>
                                        </tr>

                                        {/* TOTAL EQUITY AND DRAWS */}
                                        <tr className="table-row-hover">
                                            <td className="py-2 px-3 pl-8 text-left text-slate-700 font-medium">
                                                <span className="ml-6">RETAINED EARNING</span>
                                            </td>
                                            {balanceSheet.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                >
                                                    {period.total_equity_and_draws}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* NET PROFIT */}
                                        <tr className="table-row-hover">
                                            <td className="py-2 px-3 text-left pl-8 text-slate-700 font-medium">
                                                <span className="ml-6">NET PROFIT/(LOSS)</span>
                                            </td>
                                            {balanceSheet.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.net_income) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                    {Number(period.net_income) < 0 ? '(' : ''}{period.net_income}{Number(period.net_income) < 0 ? ')' : ''}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* OWNER DRAWS */}
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'owner_draws_and_dividend').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalanceSheetBalances(period, 'owner_draws_and_dividend', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        <tr className="border-t border-slate-400">
                                            <td className="py-3 px-3 text-left pl-8 font-bold text-slate-900">
                                                <span className="ml-6">TOTAL EQUITY</span>
                                            </td>
                                            {balanceSheet.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.total_equity) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                    {Number(period.total_equity) < 0 ? '(' : ''}{period.total_equity}{Number(period.total_equity) < 0 ? ')' : ''}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* CURRENT LIABILITIES */}
                                        <tr className="bg-orange-50">
                                            <td className="py-3 px-3 text-left font-bold text-orange-900 text-base" colSpan={columnCount + 1}>
                                            CURRENT LIABILITIES
                                            </td>
                                        </tr>
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'current_liabilities').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 text-left font-medium pl-8 text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalanceSheetBalances(period, 'current_liabilities', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* NON-CURRENT LIABILITIES */}
                                        <tr className="bg-amber-50">
                                            <td className="py-3 px-3 text-left font-bold text-slate-700 text-base" colSpan={columnCount + 1}>
                                            NON-CURRENT LIABILITIES
                                            </td>
                                        </tr>
                                        {getAllBalanceSheetAccountNames(balanceSheet, 'long_term_liabilities').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 text-left font-medium pl-8 text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {balanceSheet.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalanceSheetBalances(period, 'long_term_liabilities', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        <tr className="border-t border-slate-400">
                                            <td className="py-3 px-3 pl-8 font-bold text-slate-900 text-left">
                                                <span className="ml-6">TOTAL LIABILITIES</span>
                                            </td>
                                            {balanceSheet.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                >
                                                    {period.total_liabilities}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* TOTAL EQUITY AND LIABILITIES */}
                                        <tr className="border-t-4 border-double border-slate-900 bg-linear-to-r from-purple-50 via-violet-50 to-purple-50">
                                            <td className="py-5 text-left px-3 font-bold text-slate-900 text-lg statement-title">
                                                TOTAL EQUITY AND LIABILITIES
                                            </td>
                                            {balanceSheet.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-5 px-6 number-cell font-bold text-purple-700 text-lg whitespace-nowrap"
                                                >
                                                    {period.equity_liabilities}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};
export default BalanceSheetReport;
