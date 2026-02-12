import { useEffect, useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { ArrowLeft, Trophy, Shield } from 'lucide-react';

interface Entry {
    name: string;
    score: number;
}

export const LeaderboardUI = () => {
    const setStatus = useGameStore((state) => state.setStatus);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/leaderboard')
            .then(res => res.json())
            .then(data => {
                setEntries(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="flex items-center justify-center h-full bg-black/90 p-6">
            <div className="glass-panel w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-4">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Global Ranking</h2>
                    </div>
                    <button
                        onClick={() => setStatus('menu')}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
                            <div className="text-neutral-500 uppercase tracking-widest text-sm">Accessing Mainframe...</div>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-neutral-500 text-xs uppercase tracking-widest">
                                    <th className="pb-4 pl-4 font-normal">Rank</th>
                                    <th className="pb-4 font-normal">Survivor</th>
                                    <th className="pb-4 pr-4 text-right font-normal">Drift Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {entries.map((entry, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-4 pl-4">
                                            <span className={`
                        w-8 h-8 flex items-center justify-center rounded-lg font-bold
                        ${i === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                                                    i === 1 ? 'bg-neutral-300/20 text-neutral-300 border border-neutral-300/50' :
                                                        i === 2 ? 'bg-orange-600/20 text-orange-600 border border-orange-600/50' : 'text-neutral-500'}
                      `}>
                                                {i + 1}
                                            </span>
                                        </td>
                                        <td className="py-4 font-semibold group-hover:text-neon-blue transition-colors">
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-3 h-3 opacity-50" />
                                                {entry.name}
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4 text-right font-mono font-bold neon-text-purple">
                                            {entry.score.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="p-6 bg-white/5 text-center">
                    <p className="text-neutral-500 text-xs uppercase italic tracking-widest">Only the top 10 survivors are recorded in permanent memory</p>
                </div>
            </div>
        </div>
    );
};
