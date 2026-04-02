import { useState } from 'react';
import { useActivityLog } from './useActivityLog';
import { ActivityLogEntry } from './constants/Types';
import { VERB_STYLES } from './constants/Options';





function getInitials(name: string | null): string {
    if (!name) return '-';
    return name.split(' ').map(w =>
        w[0]).join('').toUpperCase().slice(0, 2);
}

function timeAgo(ts: string): string {
    const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

function ActivityRow({
    log,
    flip = false,
    compact = false,
}: {
    log: ActivityLogEntry;
    flip?: boolean;
    compact?: boolean;
}) {
    const s = VERB_STYLES[log.verb] ?? VERB_STYLES['updated'];

  return (
    <div
        className={`
            flex items-center justify-between border-b border-gray-100
            hover:bg-gray-50 transition-colors duration-150 border-y-2!
            ${compact ? 'px-8 py-2.5' : 'px-8 py-3'}
            ${flip ? 'activity-flip-in' : ''}
        `}
        >
        <div className="flex items-center gap-3 flex-1 min-w-0 hover:cursor-pointer ">
            <div
            className="rounded-full flex items-center justify-center font-extrabold shrink-0"
            style={{
                width: compact ? 26 : 30,
                height: compact ? 26 : 30,
                fontSize: compact ? 9 : 10,
                background: s.bg,
                color: s.text,
                fontFamily: 'Montserrat, system-ui'
            }}
            >
                {getInitials(log.actor)}
            </div>

            <div
                className="rounded-full shrink-0"
                style={{ width: 6, height: 6, background: s.dot }}
            />

            <div className="min-w-0 flex-1">
            <p
                className="font-semibold text-black truncate font-[Montserrat]! text-left!"
                style={{ fontSize: compact ? 11 : 12 }}
            >
                <span style={{ color: s.text, fontWeight: 700 }} className='font-[Montserrat]! text-left!'>
                    {log.actor ?? '—'} {log.verb} {log.object_type} 
                </span>
                {' · '}
                {log.object_type} {log.object_id}
            </p>
            </div>
        </div>

        <div className="shrink-0 ml-4 text-right">
            <p className="text-[10px] font-semibold text-gray-800 mt-0.5 font-[Montserrat]!">
                {timeAgo(log.timestamp)}
            </p>
        </div>
    </div>
);

}


const VISIBLE = 5;

export default function ActivityFeed() {
    const { logs, loading, newEntryKey } = useActivityLog(15000);
    const [expanded, setExpanded] = useState(false);

    const visible = logs.slice(0, VISIBLE);
    const rest = logs.slice(VISIBLE);

    return (
        <>
        {/* Flip animation — injected once, lightweight */}
        <style>{`
            @keyframes activityFlipIn {
            0%   { opacity: 0; transform: translateY(-14px); }
            60%  { opacity: 1; transform: translateY(4px); }
            100% { opacity: 1; transform: translateY(0); }
            }
            .activity-flip-in {
            animation: activityFlipIn 0.38s cubic-bezier(0.4,0,0.2,1) forwards;
            }
        `}</style>

        <div
            className="overflow-hidden "
            style={{ fontFamily: 'Montserrat, system-ui' }}
        >
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex items-start justify-between border-b border-gray-50">
            <div>
                <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-black font-[Montserrat]!">
                    Live
                </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                </div>
                <h2 className="text-2xl text-left font-extrabold text-black tracking-tight font-[Montserrat]!">
                    Activity
                </h2>
                <p className="text-sm font-medium text-black mt-0.5 font-[Montserrat]!">
                    Real-time across all modules
                </p>
            </div>

            {logs.length > VISIBLE && (
                <button
                onClick={() => setExpanded(e => !e)}
                className="text-[11px] font-semibold text-black border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 hover:text-gray-900 transition-all duration-150 mt-1 font-[Montserrat]!"
                style={{ fontFamily: 'Montserrat, system-ui' }}
                >
                {expanded ? '↑ Collapse' : `View all +${rest.length}`}
                </button>
            )}
            </div>

            {/* Top 5 rows */}
            <div className="relative">
            {loading ? (
                <p className="px-8 py-6 text-sm text-black font-medium font-[Montserrat]!">
                    Loading activity...
                </p>
            ) : visible.length === 0 ? (
                <p className="px-8 py-6 text-sm text-black font-medium font-[Montserrat]!">
                    No activity yet.
                </p>
            ) : (
                visible.map((log, i) => {
                const key = log.object_id + log.timestamp + i;
                const isNew = i === 0 && newEntryKey === log.object_id + log.timestamp;
                return <ActivityRow key={key} log={log} flip={isNew} />;
                })
            )}

            {/* Bottom fade mask — only when collapsed */}
            {!expanded && rest.length > 0 && (
                <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none font-[Montserrat]!"
                style={{
                    background: 'linear-gradient(to top, rgba(255,255,255,1) 20%, rgba(255,255,255,0))',
                }}
                />
            )}
            </div>

            {/* Expanded rows */}
            <div
            className="overflow-hidden transition-all duration-500 ease-in-out font-[Montserrat]!"
            style={{ maxHeight: expanded ? rest.length * 52 + 'px' : '0px' }}
            >
            {rest.map((log, i) => (
                <ActivityRow
                key={log.object_id + log.timestamp + i}
                log={log}
                compact
                />
            ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50/50 border-t border-gray-100 px-8 py-4 flex items-center justify-between">
            <p className="text-xs! text-gray-500 italic font-[Montserrat]!">
                * Rolls when new activity arrives · updates every 15s
            </p>
            {!expanded && rest.length > 0 && (
                <button
                onClick={() => setExpanded(true)}
                className="text-[10px] font-bold text-black hover:text-black transition-colors"
                style={{ fontFamily: 'Montserrat, system-ui' }}
                >
                +{rest.length} more
                </button>
            )}
            </div>
        </div>
        </>
    );
}
