import React, { useState } from "react";
import { CurrencyTableProps, CurrencyInterface } from "../constants/Types";








const CurrenciesTable: React.FC<CurrencyTableProps> = ({
    currencies,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCurrencies = currencies.filter((currency: CurrencyInterface) => 
        currency.currency_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.currency_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.currency_symbol?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    if (filteredCurrencies.length === 0) {
        return(
            <div id="emptyState" className="hidden flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <div className="text-[0.88rem] font-bold text-gray-400 mb-1">No currencies found</div>
                <div className="text-[0.75rem] text-gray-300 font-medium">Try a different search term</div>
            </div>
        );
    }






    return(
        <div className="min-w-full">

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");

                    @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                    }
                    .fade-up  { animation: fadeUp .35s ease both; }
                    .fade-up-1{ animation: fadeUp .35s ease .05s both; }
                    em { font-style: normal; border-bottom: 3.5px solid #f59e0b; padding-bottom: 1px; }
                `}
            </style>


            <div className="bg-[#f0f2f7] font-sans text-gray-900 min-h-screen px-4 py-8 pb-16">

                <div className="max-w-4xl mx-auto mb-9 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-3xl text-left font-black tracking-tighter leading-none text-[#0a0a0a]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Supported <em>Currencies</em>
                        </h1>
                        <p className="text-[0.7rem] text-gray-400 text-left mt-2 font-semibold tracking-widest uppercase" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Exchange rates &amp; regional currencies
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-[#e2e6f0] rounded-xl px-4 py-2.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>{filteredCurrencies.length} Currencies</span>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col gap-6">


                    <div className="fade-up bg-white border border-[#e2e6f0] rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3 flex-wrap">
                        <div className="flex-1 min-w-50 flex items-center gap-2.5 bg-[#f8f9fc] border border-[#e2e6f0] rounded-xl px-3 py-2.5">
                            <svg className="shrink-0 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <input 
                                type="text" 
                                placeholder="Search by code, name or country…"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ fontFamily: 'Montserrat, system-ui' }}
                            className="bg-transparent w-full text-[0.82rem] font-semibold text-gray-700 placeholder:text-gray-300 placeholder:font-normal outline-none border-none"/>
                        </div>
                        <div className="text-[0.7rem] font-bold tracking-widest uppercase text-gray-400" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            Showing 5
                        </div>
                    </div>


                    <div className="fade-up-1 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm">


                        <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                            <h2 className="flex-1 text-[0.75rem] font-extrabold text-left tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Currency Directory
                            </h2>
                        </div>


                        <div className="overflow-x-auto" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <table className="w-full border-collapse text-[0.82rem]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                <colgroup>
                                {[
                                    "w-1/10 text-left style={{ fontFamily: 'Montserrat, system-ui' }}",
                                    "w-1/10 text-left style={{ fontFamily: 'Montserrat, system-ui' }}",
                                    "w-1/40 text-left style={{ fontFamily: 'Montserrat, system-ui' }}",
                                    "w-1/20 text-left style={{ fontFamily: 'Montserrat, system-ui' }}",
                                    "w-1/20 text-left style={{ fontFamily: 'Montserrat, system-ui' }}",
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                                </colgroup>
                                <thead>
                                    <tr className="bg-[#f8f9fc]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                        <th className="px-5! py-5! text-left text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                            Currency
                                        </th>
                                        <th className="px-5! py-5! text-left text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                            Country
                                        </th>
                                        <th className="px-5! py-5! text-left text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Symbol</th>
                                        <th className="px-5! py-5! text-right text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Buy</th>
                                        <th className="px-5! py-5! text-right text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]">Sell</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    {filteredCurrencies.map((currency: CurrencyInterface) => {

                                        function avatarColor(code: string) {
                                            const palette = [
                                                '#0a0a0a','#1d4ed8','#059669',
                                                '#d97706','#7c3aed','#dc2626',
                                                '#0891b2','#be185d'
                                            ];
                                            let h = 0;
                                            for (let i = 0; i < code.length; i++) h = code.charCodeAt(i) + ((h << 5) - h);
                                            return palette[Math.abs(h) % palette.length];
                                        }

                                        const color = avatarColor(currency.currency_code);
                                        const rateClass = 'text-[0.82rem] font-bold tabular-nums text-right';




                                        return(
                                            <tr 
                                                className="border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors group text-left"
                                                style={{ fontFamily: 'Montserrat, system-ui' }}
                                                key={currency.currency_code}
                                            >

                                                <td className="px-5! py-5! whitespace-nowrap">
                                                    <div className="flex items-center gap-3">

                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white text-[0.65rem] font-black shrink-0 tracking-tight"
                                                        style={{ background: `${color}` }}>
                                                            {currency.currency_code}
                                                        </span>
                                                    <div>
                                                        <div className="text-[0.85rem] font-bold text-left text-gray-800 leading-tight">{currency.currency_code}</div>
                                                        <div className="text-[0.72rem] text-gray-400 font-medium leading-tight">{currency.currency_name}</div>
                                                    </div>
                                                    </div>
                                                </td>


                                                <td className="px-5! py-5! text-left text-[0.82rem] font-medium text-gray-500">{currency.country}</td>


                                                <td className="px-5! py-5! text-left">
                                                    <span className="inline-flex text-left items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-700 text-[0.9rem] font-extrabold">
                                                    {currency.currency_symbol}
                                                    </span>
                                                </td>


                                                <td className={`px-5! py-5! text-left ${rateClass}`}>{currency.buy || '--'}</td>

                                                <td className={`px-5! py-5! text-left ${rateClass}`}>{currency.sell || '--'}</td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>


                        <div className="flex items-center gap-2 px-6 py-3 bg-amber-50 border-t border-amber-100 text-[0.72rem] font-semibold text-gray-400 text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            Buy &amp; sell rates are updated by the system. A rate of 0.00 indicates not yet configured.
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};
export default CurrenciesTable;
