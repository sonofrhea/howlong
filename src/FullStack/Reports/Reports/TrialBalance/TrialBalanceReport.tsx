import React from "react";
import { TrialBalanceAccount, TrialBalanceResponse } from "../../constants/Types";
import { trialBalanceStyle } from "../../constants/Styles";




const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};


const TrialBalanceReport: React.FC<{
    trialBalance: TrialBalanceResponse;
    startDate: string; 
    endDate: string;
}> = ({ trialBalance, startDate, endDate }) => {

    if (!trialBalance || trialBalance.accounts.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data found</h3>
                <p className="text-gray-500">Trial balance report not available for the selected date range.</p>
            </div>
        );
    }



    return(
        <div className="w-[112%]">
            <div className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Trial Balance for dates between... {formatDate(startDate)} and {formatDate(endDate)}
                    </h3>
                    <div className="flex items-center gap-4">
                    </div>
                </div>
            </div>
            

            {/* Report Body */}
            <div className="w-full bg-white overflow-x-scroll">
                <div className="overflow-x-scroll">
                    <table className="w-full border-collapse border border-gray-400 text-xs overflow-x-scroll">
                        <colgroup>
                            {[
                                "w-[8%] text-center",
                                "w-[25%] text-center",
                                "w-[8%] text-center",
                                "w-[8%] text-center",
                                "w-[8%] text-center",
                                "w-[8%] text-center",
                                "w-[8%] text-center",
                                "w-[8%] text-center",
                                "w-[8%] text-center",
                                "w-[8%] text-center",
                            ].map((width, index) => (
                                <col key={index} className={width} />
                            ))}
                        </colgroup>
                        <thead>
                            <tr className="bg-gray-200">
                                <th rowSpan={2} className={trialBalanceStyle.header}>Account Code</th>
                                <th rowSpan={2} className={trialBalanceStyle.header}>Account Description</th>
                                <th colSpan={2} className={trialBalanceStyle.header}>Opening Balance</th>
                                <th colSpan={2} className={trialBalanceStyle.header}>Period To Date</th>
                                <th colSpan={2} className={trialBalanceStyle.header}>Month To Date</th>
                                <th colSpan={2} className={trialBalanceStyle.header}>Year To Date</th>
                            </tr>
                            <tr className="bg-gray-200">
                                <th className={trialBalanceStyle.header2}>DR</th>
                                <th className={trialBalanceStyle.header2}>CR</th>
                                <th className={trialBalanceStyle.header2}>DR</th>
                                <th className={trialBalanceStyle.header2}>CR</th>
                                <th className={trialBalanceStyle.header2}>DR</th>
                                <th className={trialBalanceStyle.header2}>CR</th>
                                <th className={trialBalanceStyle.header2}>DR</th>
                                <th className={trialBalanceStyle.header2}>CR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trialBalance.accounts.map((account, index) => {

                                return(
                                    <tr key={index} className="hover:bg-gray-200 font-medium hover:cursor-pointer">
                                        <td className="border border-gray-300 p-2 text-left">
                                            {account.account_code}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-left">
                                            {account.account_name} - {account.account_type}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.opening_dr}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.opening_cr}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.period_dr}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.period_cr}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.month_dr}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.month_cr}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.year_dr}
                                        </td>

                                        <td className="border border-gray-300 p-2 text-right">
                                            {account.year_cr}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 border-t-2 border-gray-500 font-bold">
                                <td className="border border-gray-300 p-2"></td>
                                
                                <td className="border border-gray-300 p-2">
                                    {trialBalance.accounts.length} Accounts
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.opening_dr}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.opening_cr}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.period_dr}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.period_cr}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.month_dr}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.month_cr}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.year_dr}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {trialBalance.totals.year_cr}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default TrialBalanceReport;
