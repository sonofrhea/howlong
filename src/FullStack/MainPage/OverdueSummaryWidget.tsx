import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchOverdueReceivablesSummary } from "../Reports/Engines";
import { OverdueReceivablesSummaryResponse } from "../Reports/constants/Types";
import { formatCurrency } from "../../components/store";




function OverdueSummaryWidget() {
    const { data, isLoading } = useQuery<OverdueReceivablesSummaryResponse>({
        queryKey: ['overdueReceivablesSummary'],
        queryFn: fetchOverdueReceivablesSummary
    });



    return (
        <div
            className=" rounded-4xl border-gray-50!  overflow-hidden"
            style={{ fontFamily: 'Montserrat, system-ui' }}
        >
            <div className="px-8 pt-8 pb-4 flex items-start justify-between border-b border-gray-50">
                <div>
                    <p className="text-[10px] font-bold font-[Montserrat]! tracking-[0.14em] uppercase text-left! text-gray-500 mb-1">
                        Receivables
                    </p>
                    <h2 className="text-2xl font-extrabold font-[Montserrat]! text-black text-left! tracking-tight">
                        Overdue
                    </h2>
                    <p className="text-sm font-medium text-gray-500 mt-0.5 font-[Montserrat]! text-left!">
                        As of {data?.as_of ?? '—'}
                    </p>
                </div>
                <Link
                    to="/reports/overdue-receivables"
                    className="text-[12px] font-semibold text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 hover:text-gray-900 transition-all duration-150 mt-1 no-underline font-[Montserrat]!"
                >
                    Full report →
                </Link>
            </div>

            {isLoading ? (
                <div className="px-8 py-8">
                    <p className="text-sm text-gray-300 font-medium">Loading...</p>
                </div>
            ) : data ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                    {[
                        { label: 'Total overdue', value: `${formatCurrency(Number(data.total_overdue))}`, danger: true },
                        { label: 'Invoices', value: data.invoice_count, danger: false },
                        { label: 'Customers', value: data.customer_count, danger: false },
                        { label: 'Oldest due', value: data.oldest_due_date, danger: true },
                    ].map(({ label, value, danger }, i) => (
                        <div
                            key={label}
                            className={`px-8 py-6 ${i < 3 ? 'border-r border-gray-50' : ''}`}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 font-[Montserrat]!">
                                {label}
                            </p>
                            <p className={`text-xl font-[Montserrat]! font-bold! ${danger ? 'text-red-700' : 'text-black'}`}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            ) : null}

            <div className="bg-gray-50/50 border-t border-gray-100 px-8 py-4">
                <p className="text-xs text-gray-400 italic">
                    * Overdue = unpaid or partially paid invoices past their due date.
                </p>
            </div>
        </div>
    );
};
export default OverdueSummaryWidget;

