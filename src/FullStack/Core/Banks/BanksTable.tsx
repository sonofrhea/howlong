import React, { useState } from "react";
import { BankInterface, BanksTableProps } from "../constants/Types";







const BanksTable: React.FC<BanksTableProps> = ({
    banks,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBanks = banks.filter((bank: BankInterface) => 
        bank.bank_alias?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.bank_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.swift_code?.toLowerCase().includes(searchTerm.toLowerCase())
    );





    if (filteredBanks.length === 0) {
        return(
            <div className="hidden flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <div className="text-[0.88rem] font-bold text-gray-400 mb-1">No banks found</div>
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

            <div className="bg-[#f0f2f7] font-sans text-gray-900 min-h-screen px-4 py-8 pb-16" style={{ fontFamily: 'Montserrat, system-ui' }}>


                <div className="max-w-4xl mx-auto mb-9 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter leading-none text-[#0a0a0a]">
                            <em>Banks</em>
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-[#e2e6f0] rounded-xl px-4 py-2.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600">
                            {filteredBanks.length} Banks
                        </span>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col gap-6">


                <div className="fade-up bg-white border border-[#e2e6f0] rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-50 flex items-center gap-2.5 bg-[#f8f9fc] border border-[#e2e6f0] rounded-xl px-3 py-2.5">
                    <svg className="shrink-0 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input
                        type="text"
                        placeholder="Search by name, alias or SWIFT…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent w-full text-[0.82rem] font-semibold text-gray-700 placeholder:text-gray-300 placeholder:font-normal outline-none border-none"/>
                    </div>
                    <div className="text-[0.7rem] font-bold tracking-widest uppercase text-gray-400" id="resultCount">Showing 24</div>
                </div>


                <div className="fade-up-1 bg-white border border-[#e2e6f0] rounded-2xl overflow-hidden shadow-sm">


                    <div className="flex items-center gap-3 px-6 py-4 bg-[#f8f9fc] border-b border-[#e2e6f0]">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                        </div>
                        <h2 className="flex-1 text-[0.75rem] font-extrabold tracking-widest uppercase text-gray-600" style={{ fontFamily: 'Montserrat, system-ui' }}>Bank Directory</h2>
                    </div>


                    <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[0.82rem]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                        <colgroup>
                        {[
                            "w-1/25 text-left",
                            "w-1/5 text-left",
                            "w-1/70 text-left",
                        ].map((line, index) => (
                            <col key={index} className={line} />
                        ))}
                        </colgroup>
                        <thead className="font-[Montserrat]!">
                        <tr className="px-5! py-5! bg-[#f8f9fc]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <th className="px-7! py-5! text-left text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Alias
                            </th>
                            <th className="px-7! py-5! text-left text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Bank Name
                            </th>
                            <th className="px-7! py-5! text-left text-[0.65rem] font-extrabold tracking-[0.09em] uppercase text-gray-400 border-b border-[#e2e6f0]" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                SWIFT Code
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredBanks.map((bank: BankInterface) => {

                                function avatarColor(alias: string) {
                                    const palette = [
                                    '#0a0a0a','#374151','#1d4ed8','#059669','#d97706',
                                    '#7c3aed','#dc2626','#0891b2','#be185d','#065f46'
                                    ];
                                    let hash = 0;
                                    for (let i = 0; i < alias.length; i++) hash = alias.charCodeAt(i) + ((hash << 5) - hash);
                                    return palette[Math.abs(hash) % palette.length];
                                }

                                function initials(alias: string) {
                                    return alias.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
                                }

                                const init  = initials(bank.bank_alias);
                                const color = avatarColor(bank.bank_alias);
                                
                                return(
                                    <tr 
                                        className="border-b border-[#e2e6f0] hover:bg-[#f8f9fc] transition-colors group text-left" 
                                        style={{ fontFamily: 'Montserrat, system-ui' }}
                                        key={bank.bank_alias}
                                    >

                                        <td className="px-5! py-5! whitespace-nowrap">
                                            <div className="flex items-center gap-2.5">
                                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-[0.6rem] font-black shrink-0"
                                                style={{ background: `${color}` }}>{init}</span>
                                            <span className="text-[0.85rem] font-bold text-gray-800 text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>{bank.bank_alias}</span>
                                            </div>
                                        </td>

                                        <td className="px-5! py-5! text-[0.82rem] font-medium text-gray-500 max-w-xs text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                            {bank.bank_name}
                                        </td>

                                        <td className="px-5! py-5!">
                                            <span className="inline-flex items-center bg-gray-100 text-gray-600 text-[0.7rem] font-extrabold tracking-widest uppercase rounded-lg px-2.5 py-1 font-mono text-left" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                                {bank.swift_code}
                                            </span>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    </div>

                </div>

                </div>


            </div>

        </div>
    );
};
export default BanksTable;
