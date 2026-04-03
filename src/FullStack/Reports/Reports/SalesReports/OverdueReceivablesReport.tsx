import React from "react";
import { OverdueReceivablesProps } from "../../constants/Types";
import { formatCurrency } from "../../../../components/store";








const BucketBar = ({ value, total }: { value: string; total: string }) => {
    const pct = Number(total) > 0 ? (Number(value) / Number(total)) * 100 : 0;
    const color = pct > 50 ? '#dc2626' : pct > 20 ? '#f97316' : '#22c55e';
    return (
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:3 }}>
            <div style={{ flex:1, height:4, background:'#f3f4f6', borderRadius:9999, overflow:'hidden' }}>
                <div style={{ width:`${pct}%`, background:color, height:'100%', borderRadius:9999 }} />
            </div>
            <span style={{ fontSize:10, fontWeight:500, color:'#9ca3af', minWidth:24, textAlign:'right' }}>
                {Math.round(pct)}%
            </span>
        </div>
    );
};


function OverdueReceivablesReport({ summary, customers }: OverdueReceivablesProps) {
    return (
        <div style={{ fontFamily:'Montserrat, system-ui', padding:'2rem 0' }}>

            {/* Metrics */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:12, marginBottom:'1rem' }}>
                {[
                    { label:'Total overdue', value: formatCurrency(summary.total_overdue), red: true  },
                    { label:'Overdue invoices', value: summary.invoice_count, red: false },
                    { label:'Customers affected', value: summary.customer_count, red: false },
                    { label:'Oldest due date', value: summary.oldest_due_date, red: true  },
                ].map(({ label, value, red }) => (
                    <div key={label} style={{ background:'#f9fafb', borderRadius:12, padding:'1rem 1.25rem', cursor: 'pointer' }}>
                        <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#9ca3af', marginBottom:6, }}>
                            {label}
                        </div>
                        <div style={{ fontSize:20, fontWeight:800, color: red ? '#dc2626' : '#111' }}>
                            {value}
                        </div>
                    </div>
                ))}
            </div>

            <p style={{ fontSize:13, color:'#9ca3af', fontWeight:500, marginBottom:'1.5rem' }} className="font-['Montserrat']! text-left!">
                As of <span style={{ fontWeight:700, color:'#6b7280' }}>
                        {summary.as_of}
                    </span>
            </p>

            {/* Table */}
            <div style={{ border:'0.5px solid rgba(0,0,0,0.06)', borderRadius:16, overflow:'hidden', marginBottom:'1rem' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11, tableLayout:'fixed' }}>
                    <colgroup>
                        {[
                            'w-1/8 text-center',
                            'w-1/8 text-center',
                            'w-1/8 text-center',
                            'w-1/8 text-center',
                            'w-1/8 text-center',
                            'w-1/8 text-center',
                            'w-1/8 text-center',
                            'w-1/8 text-center',
                        ].map((line, index) => (
                            <col key={index} style={{ [line.split(':')[0]]: line.split(':')[1] }} />
                        ))}
                    </colgroup>
                    <thead>
                        <tr style={{ background:'#f9fafb', borderBottom:'0.5px solid rgba(0,0,0,0.06)' }}>
                            {[
                                { label:'Customer', color:'#9ca3af' },
                                { label:'Name', color:'#9ca3af' },
                                { label:'No. of Invoices.', color:'#9ca3af' },
                                { label:'Total overdue', color:'#9ca3af' },
                                { label:'1–30 days', color:'#9ca3af' },
                                { label:'31–60 days', color:'#f97316' },
                                { label:'61–90 days', color:'#f97316' },
                                { label:'90+ days', color:'#dc2626' },
                            ].map(({ label, color }) => (
                                <th key={label} style={{ padding: '0.7rem 1rem', textAlign: 'center', color }}
                                    className="font-['Montserrat']! text-[0.7rem]! font-bold uppercase tracking-wider">
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => {
                            const pct = Number(summary.total_overdue) > 0
                                ? (Number(c.total_overdue) / Number(summary.total_overdue)) * 100
                                : 0;
                            const barColor = pct > 50 ? '#dc2626' : pct > 20 ? '#f97316' : '#22c55e';

                            const tdStyle: React.CSSProperties = {
                                padding:'0.65rem 1rem',
                                borderBottom:'0.5px solid rgba(0,0,0,0.04)',
                                color:'#111',
                            };

                            const renderBucket = (val: string, danger = false) => {
                                const isZero = Number(val) === 0;
                                return (
                                    <td style={tdStyle}>
                                        {isZero
                                            ? <span style={{ color:'#d1d5db' }}>—</span>
                                            : <span style={{ fontSize:14, fontWeight: danger ? 800 : 600, color: danger ? '#dc2626' : '#374151' }}>
                                                {formatCurrency(val)}
                                              </span>
                                        }
                                    </td>
                                );
                            };

                            return (
                                <tr key={c.customer_id} style={{ cursor:'pointer' }}
                                    onMouseEnter={e => (e.currentTarget.querySelectorAll('td') as any).forEach((td: HTMLElement) => td.style.background = '#fafafa')}
                                    onMouseLeave={e => (e.currentTarget.querySelectorAll('td') as any).forEach((td: HTMLElement) => td.style.background = '')}
                                >
                                    <td style={tdStyle}>
                                        <span style={{ fontSize:14, fontWeight:700, color:'#9ca3af', fontFamily:'monospace' }}>
                                            {c.formatted_number}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ fontSize:14, fontWeight:600, color:'#111' }}>
                                            {c.customer_name}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', background:'#f3f4f6', borderRadius:6, padding:'2px 7px', fontSize:14, fontWeight:700, color:'#6b7280' }}>
                                            {c.invoice_count}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>{formatCurrency(c.total_overdue)}</div>
                                        <BucketBar value={c.total_overdue} total={summary.total_overdue} />
                                    </td>
                                    {renderBucket(c.bucket_1_30)}
                                    {renderBucket(c.bucket_31_60)}
                                    {renderBucket(c.bucket_61_90)}
                                    {renderBucket(c.bucket_90_plus, true)}
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr style={{ borderTop:'0.5px solid rgba(0,0,0,0.08)', background:'#f9fafb', cursor: 'pointer' }}>
                            <td colSpan={3} style={{ padding:'0.65rem 1rem', fontWeight:700, fontSize:15 }}>Totals</td>
                            <td style={{ fontFamily:'Montserrat, system-ui', padding:'0.65rem 1rem', fontWeight:700, fontSize:15 }}>
                                {formatCurrency(summary.total_overdue)}
                            </td>
                            {(['bucket_1_30', 'bucket_31_60', 'bucket_61_90', 'bucket_90_plus'] as const).map((b, i) => (
                                <td key={b} style={{ padding:'0.65rem 1rem', fontWeight:700, fontSize:15, color: i === 3 ? '#dc2626' : '#111' }}>
                                    {formatCurrency(
                                        customers.reduce((sum, c) => sum + Number(c[b]), 0).toFixed(2)
                                    )}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>

            <p style={{ fontSize:12, color:'#9ca3af', fontStyle:'italic' }}>
                * Buckets represent days past due date. 90+ days indicates serious collection risk.
            </p>
        </div>
    );
}

export default OverdueReceivablesReport;