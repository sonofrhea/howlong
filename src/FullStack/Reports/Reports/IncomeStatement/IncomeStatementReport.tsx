import React from "react";
import { IncomeStatementResponse, PeriodTypes } from "../../constants/Types";
import { getAllAccountNames, getBalances } from "../../constants/helpers";



const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};



const IncomeStatementReport: React.FC<{ incomeStatement: IncomeStatementResponse[],
    periodType: PeriodTypes }> = ({ incomeStatement, periodType }) => {

    

    const columnCount = incomeStatement.length;


    

    if (!incomeStatement) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data found</h3>
                <p className="text-gray-500">Income statement report not available for the selected period.</p>
            </div>
        );
    }



    return(
        <div className="w-[112%]">
            <div className="px-4 py-2 bg-linear-to-r ">
                <div className="flex items-center justify-between">
                    <h3 className="text-s font-semibold text-gray-800">
                        Income statement for the period...
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
                                            {incomeStatement.map((report: IncomeStatementResponse, index: number) => (
                                                <th key={index}
                                                    className="text-right py-4 px-6 font-semibold text-slate-800 text-sm uppercase tracking-wider whitespace-nowrap"
                                                >
                                                    {report.period}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Revenue Section */}
                                        <tr>
                                            <td className="py-5 px-3 text-left font-bold text-slate-900 text-base" colSpan={columnCount + 1}>
                                                REVENUE
                                            </td>
                                        </tr>
                                        {getAllAccountNames(incomeStatement, 'revenue_accounts').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2.5 px-3 pl-8 font-medium text-left text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {incomeStatement.map((period, periodIndex) => (
                                                    <td key={periodIndex} 
                                                        className="text-right py-2.5 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalances(period, 'revenue_accounts', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="border-t border-slate-300">
                                            <td className="py-3 text-left px-3 pl-8 font-semibold text-slate-900">
                                                <span className="ml-6 uppercase">Total Sales</span>
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-3 px-6 number-cell font-semibold text-slate-900 whitespace-nowrap"
                                                >
                                                    {period.total_sales}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Sales Adjustments */}
                                        <tr>
                                            <td className="py-5 px-3 text-left font-semibold text-slate-700 text-sm" colSpan={columnCount + 1}>
                                                <span className="ml-6 uppercase">SALES RETURNS</span>
                                            </td>
                                        </tr>
                                        {getAllAccountNames(incomeStatement, 'sales_returns').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2.5 font-medium text-left px-3 pl-8 text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {incomeStatement.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2.5 px-6 number-cell text-red-600 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalances(period, 'sales_returns', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        <tr>
                                            <td className="py-4 px-3 text-left font-semibold text-slate-700 text-sm" colSpan={columnCount + 1}>
                                            <span className="ml-6 uppercase">SALES DISCOUNTS AND ADJUSTMENTS</span>
                                            </td>
                                        </tr>
                                        {getAllAccountNames(incomeStatement, 'sales_discounts_and_adjustment').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2.5 font-medium text-left px-3 pl-8 text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {incomeStatement.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2.5 px-6 number-cell text-red-600 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalances(period, 'sales_discounts_and_adjustment', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="border-t border-slate-300">
                                            <td className="py-3 px-3 pl-8 text-left font-semibold text-slate-900">
                                                <span className="ml-6 uppercase">Total Adjustments</span>
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-3 px-6 number-cell font-semibold text-red-600 whitespace-nowrap"
                                                >
                                                    {period.sales_adjustments}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Net Sales */}
                                        <tr className="border-t-2 text-left border-slate-800 bg-linear-to-r from-blue-50 to-indigo-50">
                                            <td className="py-4 px-3 font-bold text-slate-900 text-base">
                                                NET SALES
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-4 px-6 number-cell font-bold text-slate-900 text-base whitespace-nowrap"
                                                >
                                                    {period.net_sales}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* COGS */}
                                        <tr>
                                            <td className="py-5 px-3 text-left font-bold text-slate-900 text-base" colSpan={columnCount + 1}>
                                            COST OF GOODS SOLD
                                            </td>
                                        </tr>
                                        {getAllAccountNames(incomeStatement, 'cost_of_goods_sold').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2.5 font-medium text-left px-3 pl-8 text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {incomeStatement.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2.5 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalances(period, 'cost_of_goods_sold', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="border-t border-slate-300">
                                            <td className="py-3 text-left px-3 pl-8 font-semibold text-slate-900">
                                                <span className="ml-6">Total Cost of Goods Sold</span>
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-3 px-6 number-cell font-semibold text-slate-900 whitespace-nowrap"
                                                >
                                                    {period.total_cost_of_goods_sold}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Gross Profit */}
                                        <tr className="border-t-2 text-left border-slate-800 bg-linear-to-r from-emerald-50 to-teal-50">
                                            <td className="py-4 px-3 font-bold text-slate-900 text-base">
                                                GROSS PROFIT OR LOSS
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                className="text-right py-4 px-6 number-cell font-bold text-emerald-700 text-base whitespace-nowrap"
                                                >
                                                    {period.gross_profit_or_loss}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Operating Expenses */}
                                        <tr>
                                            <td className="py-5 px-3 text-left font-bold text-slate-900 text-base" colSpan={columnCount + 1}>
                                                OPERATING EXPENSES
                                            </td>
                                        </tr>
                                        {getAllAccountNames(incomeStatement, 'expense_accounts').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2.5 font-medium text-left px-3 pl-8 text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {incomeStatement.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2.5 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getBalances(period, 'expense_accounts', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="border-t border-slate-300">
                                            <td className="py-3 px-3 pl-8 text-left font-semibold text-slate-900">
                                                <span className="ml-6">Total Operating Expenses</span>
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-3 px-6 number-cell font-semibold text-slate-900 whitespace-nowrap"
                                                >
                                                    {period.total_expense}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Net Profit Before Tax */}
                                        <tr className="border-t-2 text-left border-slate-800 bg-linear-to-r from-amber-50 to-orange-50">
                                            <td className="py-4 px-3 font-bold text-slate-900 text-base">
                                                NET PROFIT BEFORE TAX
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-4 px-6 number-cell font-bold text-amber-700 text-base whitespace-nowrap"
                                                >
                                                    {period.net_profit_or_loss}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Taxes */}
                                        <tr>
                                            <td className="py-5 px-3 text-left font-semibold text-slate-700" colSpan={columnCount + 1}>
                                                TAXATION
                                            </td>
                                        </tr>
                                        {getAllAccountNames(incomeStatement, 'other_taxes').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2.5 font-medium text-left px-3 pl-8 text-slate-700">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {incomeStatement.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2.5 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        ({getBalances(period, 'other_taxes', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="border-t border-slate-300">
                                            <td className="py-3 text-left px-3 pl-8 font-semibold text-slate-900">
                                                <span className="ml-6">Total Taxes</span>
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-3 px-6 number-cell font-semibold text-slate-900 whitespace-nowrap"
                                                >
                                                    {period.total_taxes}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Net Profit After Tax */}
                                        <tr className="border-t-4 text-left border-double border-slate-900 bg-linear-to-r from-green-50 via-emerald-50 to-teal-50">
                                            <td className="py-5 px-3 font-bold text-slate-900 text-lg statement-title">
                                                NET PROFIT AFTER TAX
                                            </td>
                                            {incomeStatement.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className="text-right py-5 px-6 number-cell font-bold text-green-700 text-lg whitespace-nowrap"
                                                >
                                                    {period.net_profit_or_loss_after_tax}
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
export default IncomeStatementReport;