import React from "react";
import { CashFLowProps, CashFlowResponse } from "../../constants/Types";
import { getAllCashFlowAccountNames, getCashFlowBalances } from "../../constants/helpers";







const CashFlowReport: React.FC<CashFLowProps> = ({ cashFlow, periodType }) => {

    const columnCount = cashFlow.length;






    if (!cashFlow) {
        return(
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data found</h3>
                <p className="text-gray-500">Cash Flow report not available for the selected period.</p>
            </div>
        );
    }



    return(
        <div className="w-[112%]">
            <div className="px-4 py-2 bg-linear-to-r ">
                <div className="flex items-center justify-between">
                    <h3 className="text-s font-semibold text-gray-800">
                        Cash Flow Statement
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
                                                Activity Description
                                            </th>
                                            {cashFlow.map((report: CashFlowResponse, index: number) => (
                                                <th key={index}
                                                    className="text-right py-4 px-6 font-semibold text-slate-800 text-sm uppercase tracking-wider whitespace-nowrap"
                                                >
                                                    {report.period}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* OPERATING ACTIVITIES */}
                                        <tr className="bg-blue-50">
                                            <td className="py-3 px-3 text-left font-bold text-green-900 text-base" colSpan={columnCount + 1}>
                                                CASH FLOWS FROM OPERATING ACTIVITIES
                                            </td>
                                        </tr>

                                        {/* NET PROFIT BEFORE TAX */}
                                        <tr className="table-row-hover">
                                            <td className="py-2 px-3 text-left pl-8 text-slate-700 font-medium">
                                                <span className="ml-6">Net Profit Before Tax</span>
                                            </td>
                                            {cashFlow.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.net_profit_before_tax) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                        {Number(period.net_profit_before_tax) < 0 ? '(' : ''}{period.net_profit_before_tax}{Number(period.net_profit_before_tax) < 0 ? ')': ''}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* NON-CASH ADJUSTMENTS */}
                                        <tr>
                                            <td className="py-3 px-3 text-left font-bold text-purple-900 text-base" colSpan={columnCount + 1}>
                                                Adjustments for:
                                            </td>
                                        </tr>

                                        {/* depreciation */}
                                        {getAllCashFlowAccountNames(cashFlow, 'depreciation').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getCashFlowBalances(period, 'depreciation', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/*allowance for doubtful accounts*/}
                                        {getAllCashFlowAccountNames(cashFlow, 'allowance_for_doubtful_accounts').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getCashFlowBalances(period, 'allowance_for_doubtful_accounts', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* WORKING CAPITAL CHANGES */}
                                        <tr>
                                            <td className="py-3 px-3 text-left font-bold text-purple-900 text-base" colSpan={columnCount + 1}>
                                                Changes in Working Capital:
                                            </td>
                                        </tr>

                                        {/* account receivables */}
                                        {getAllCashFlowAccountNames(cashFlow, 'accounts_receivables').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.accounts_receivables) < 0 ? 'text-slate-700' : 'text-green-700'}`}
                                                    >
                                                        {Number(period.accounts_receivables) < 0 ? '(' : ''}{getCashFlowBalances(period, 'accounts_receivables', accountName)}{Number(period.accounts_receivables) < 0 ? ')' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* inventories */}
                                        {getAllCashFlowAccountNames(cashFlow, 'inventories').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.inventories) < 0 ? 'text-slate-700' : 'text-green-700'}`}
                                                    >
                                                        {Number(period.inventories) < 0 ? '(' : ''}{getCashFlowBalances(period, 'inventories', accountName)}{Number(period.inventories) < 0 ? ')' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* prepaid expenses */}
                                        {getAllCashFlowAccountNames(cashFlow, 'prepaid_expenses').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.prepaid_expenses) < 0 ? 'text-slate-700' : 'text-green-700'}`}
                                                    >
                                                        {Number(period.prepaid_expenses) < 0 ? '(' : ''}{getCashFlowBalances(period, 'prepaid_expenses', accountName)}{Number(period.prepaid_expenses) < 0 ? ')' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* wip assets */}
                                        {getAllCashFlowAccountNames(cashFlow, 'wip_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.wip_assets) < 0 ? 'text-slate-700' : 'text-green-700'}`}
                                                    >
                                                        {Number(period.wip_assets) < 0 ? '(' : ''}{getCashFlowBalances(period, 'wip_assets', accountName)}{Number(period.wip_assets) < 0 ? ')' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* accounts payable*/}
                                        {getAllCashFlowAccountNames(cashFlow, 'accounts_payable').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getCashFlowBalances(period, 'accounts_payable', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* accruals*/}
                                        {getAllCashFlowAccountNames(cashFlow, 'accruals').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getCashFlowBalances(period, 'accruals', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* unearned revenue*/}
                                        {getAllCashFlowAccountNames(cashFlow, 'unearned_revenue').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {getCashFlowBalances(period, 'unearned_revenue', accountName)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* other taxes */}
                                        {getAllCashFlowAccountNames(cashFlow, 'other_taxes').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        ({getCashFlowBalances(period, 'other_taxes', accountName)})
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}


                                        {/* Net Cash from Operating Activities */}
                                        <tr className="border-t border-slate-400">
                                            <td className="py-3 px-3 text-left pl-8 font-bold text-slate-900">
                                                <span className="ml-6">Net Cash from Operating Activities</span>
                                            </td>
                                            {cashFlow.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.operating_cash) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                    {Number(period.operating_cash) < 0 ? '(' : ''}{period.operating_cash}{Number(period.operating_cash) < 0 ? ')' : ''}
                                                </td>
                                            ))}
                                        </tr>


                                        {/* CASH FLOWS FROM INVESTING ACTIVITIES */}
                                        <tr className="bg-blue-50">
                                            <td className="py-3 px-3 text-left font-bold text-blue-900 text-base" colSpan={columnCount + 1}>
                                                CASH FLOWS FROM INVESTING ACTIVITIES
                                            </td>
                                        </tr>

                                        {/* fixed assets */}
                                        {getAllCashFlowAccountNames(cashFlow, 'fixed_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {Number(period.fixed_assets) < 0 ? '(' : ''}{getCashFlowBalances(period, 'fixed_assets', accountName)}{Number(period.fixed_assets) < 0 ? '(' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* contra-fixed assets */}
                                        {getAllCashFlowAccountNames(cashFlow, 'contra_fixed_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {Number(period.contra_fixed_assets) < 0 ? '(' : ''}{getCashFlowBalances(period, 'contra_fixed_assets', accountName)}{Number(period.contra_fixed_assets) < 0 ? '(' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* other assets */}
                                        {getAllCashFlowAccountNames(cashFlow, 'other_assets').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {Number(period.other_assets) < 0 ? '(' : ''}{getCashFlowBalances(period, 'other_assets', accountName)}{Number(period.other_assets) < 0 ? '(' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}


                                        {/* Net Cash from investing Activities */}
                                        <tr className="border-t border-slate-400">
                                            <td className="py-3 px-3 text-left pl-8 font-bold text-slate-900">
                                                <span className="ml-6">Net Cash from Investing Activities</span>
                                            </td>
                                            {cashFlow.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.investing_cash) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                    {Number(period.investing_cash) < 0 ? '(' : ''}{period.investing_cash}{Number(period.investing_cash) < 0 ? ')' : ''}
                                                </td>
                                            ))}
                                        </tr>


                                        {/* CASH FLOWS FROM FINANCING ACTIVITIES */}
                                        <tr className="bg-blue-50">
                                            <td className="py-3 px-3 text-left font-bold text-purple-900 text-base" colSpan={columnCount + 1}>
                                                CASH FLOWS FROM FINANCING ACTIVITIES
                                            </td>
                                        </tr>

                                        {/* long term liabilities */}
                                        {getAllCashFlowAccountNames(cashFlow, 'long_term_liabilities').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {Number(period.long_term_liabilities) < 0 ? '(' : ''}{getCashFlowBalances(period, 'long_term_liabilities', accountName)}{Number(period.long_term_liabilities) < 0 ? '(' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* equity and owner draws */}
                                        {getAllCashFlowAccountNames(cashFlow, 'equity_and_owner_draws').map((accountName, index) => (
                                            <tr key={index} className="table-row-hover">
                                                <td className="py-2 px-3 pl-8 text-slate-700 font-medium text-left">
                                                    <span className="ml-6">{accountName}</span>
                                                </td>
                                                {cashFlow.map((period, periodIndex) => (
                                                    <td key={periodIndex}
                                                        className="text-right py-2 px-6 number-cell text-slate-700 font-medium whitespace-nowrap"
                                                    >
                                                        {Number(period.equity_and_owner_draws) < 0 ? '(' : ''}{getCashFlowBalances(period, 'equity_and_owner_draws', accountName)}{Number(period.equity_and_owner_draws) < 0 ? '(' : ''}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}


                                        {/* Net Cash from Financing Activities */}
                                        <tr className="border-t border-slate-400">
                                            <td className="py-3 px-3 text-left pl-8 font-bold text-slate-900">
                                                <span className="ml-6">Net Cash from Financing Activities</span>
                                            </td>
                                            {cashFlow.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.financing_cash) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                    {Number(period.financing_cash) < 0 ? '(' : ''}{period.financing_cash}{Number(period.financing_cash) < 0 ? ')' : ''}
                                                </td>
                                            ))}
                                        </tr>


                                        {/* Net Change In Cash */}
                                        <tr className="border-t border-slate-400">
                                            <td className="py-3 px-3 text-left font-bold text-blue-900 text-base">
                                                NET INCREASE/(DECREASE) IN CASH
                                            </td>
                                            {cashFlow.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.total_cash_flow) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                    {Number(period.total_cash_flow) < 0 ? '(' : ''}{period.investing_cash}{Number(period.total_cash_flow) < 0 ? ')' : ''}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* CASH RECONCILIATION */}
                                        {/* cash at beginning */}
                                        <tr className="table-row-hover">
                                            <td className="py-2 px-3 text-left pl-8 text-slate-700 font-medium">
                                                <span className="ml-6">Cash at Beginning of Period</span>
                                            </td>
                                            {cashFlow.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.cash_at_beginning) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                        {Number(period.cash_at_beginning) < 0 ? '(' : ''}{period.cash_at_beginning}{Number(period.cash_at_beginning) < 0 ? ')': ''}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* cash at end */}
                                        <tr className="table-row-hover">
                                            <td className="py-2 px-3 text-left pl-8 text-slate-700 font-medium">
                                                <span className="ml-6">Cash at End of Period</span>
                                            </td>
                                            {cashFlow.map((period, periodIndex) => (
                                                <td key={periodIndex}
                                                    className={`text-right py-2 px-6 number-cell font-medium whitespace-nowrap ${Number(period.cash_balance) < 0 ? 'text-slate-700' : 'text-green-700'}`}>
                                                        {Number(period.cash_balance) < 0 ? '(' : ''}{period.cash_balance}{Number(period.cash_balance) < 0 ? ')': ''}
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
}
export default CashFlowReport;