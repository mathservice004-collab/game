import { useGameStore } from '../store/useGameStore';

export const HUD = () => {
    const score = useGameStore((state) => state.score);
    const level = useGameStore((state) => state.level);

    return (
        <div className="p-8 flex justify-between items-start">
            <div className="flex gap-4">
                <div className="glass-panel px-6 py-3 border-l-4 border-l-neon-blue">
                    <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Score</div>
                    <div className="text-3xl font-black neon-text-blue">{score.toLocaleString().padStart(6, '0')}</div>
                </div>

                <div className="glass-panel px-6 py-3 border-l-4 border-l-neon-purple">
                    <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Level</div>
                    <div className="text-3xl font-black neon-text-purple">{level.toString().padStart(2, '0')}</div>
                </div>
            </div>

            <div className="glass-panel px-6 py-3 border-r-4 border-r-neon-purple text-right">
                <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Status</div>
                <div className="text-xl font-bold text-white animate-pulse">DRIVE ACTIVE</div>
            </div>
        </div>
    );
};
