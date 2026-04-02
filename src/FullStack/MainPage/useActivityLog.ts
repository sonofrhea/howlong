import { useEffect, useRef, useState } from 'react';
import { fetchActivityLogs } from './Engines';

import { ActivityLogEntry } from './constants/Types';




export function useActivityLog(pollInterval = 15000) {
    const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [newEntryKey, setNewEntryKey] = useState<string | null>(null);
    const prevTopKey = useRef<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const incoming: ActivityLogEntry[] = await fetchActivityLogs();
                if (!incoming || !incoming.length) return;

                const topKey = incoming[0].object_id + incoming[0].timestamp;

                if (prevTopKey.current && prevTopKey.current !== topKey) {
                    setNewEntryKey(topKey);
                    setTimeout(() => setNewEntryKey(null), 600);
                }

                prevTopKey.current = topKey;
                setLogs(incoming);
            } catch (e) {
                console.error('ActivityLog fetch failed:', e);
            } finally {
                setLoading(false);
            }
        };

        load();
        const interval = setInterval(load, pollInterval);
        return () => clearInterval(interval);
    }, [pollInterval]);

    return { logs, loading, newEntryKey };
}



