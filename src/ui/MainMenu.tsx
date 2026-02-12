import { useGameStore } from '../store/useGameStore';
import { Play, Trophy, Cpu } from 'lucide-react';

export const MainMenu = () => {
    const setStatus = useGameStore((state) => state.setStatus);

    const handleStart = () => {
        setStatus('playing');
        // Phaser scene transition is handled in App.tsx by restarting or we can trigger it here
        // Actually, we'll let the user click play to start the scene if it's not already running
        window.location.reload(); // Simple way to reset everything for a fresh start
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-black/60 backdrop-blur-sm">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                    <Cpu className="w-12 h-12 text-neon-blue mr-4 animate-pulse" />
                    <h1 className="text-7xl font-extrabold tracking-tighter italic">
                        <span className="neon-text-purple">NEON</span>
                        <span className="text-white ml-2">DRIFT</span>
                    </h1>
                </div>
                <p className="text-neutral-400 text-lg tracking-widest uppercase">Survival Arcade Protocol</p>
            </div>

            <div className="flex flex-col gap-4 w-64">
                <button
                    onClick={() => setStatus('playing')}
                    className="btn-neon flex items-center justify-center gap-2 group"
                >
                    <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
                    START ENGINE
                </button>

                <button
                    onClick={() => setStatus('leaderboard')}
                    className="btn-secondary flex items-center justify-center gap-2"
                >
                    <Trophy className="w-5 h-5" />
                    LEADERBOARD
                </button>
            </div>

            <div className="absolute bottom-12 text-neutral-500 text-sm flex gap-8">
                <div className="flex flex-col items-center">
                    <span className="text-neon-blue font-bold">LEFT / RIGHT</span>
                    <span>ARROWS TO MOVE</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-neon-purple font-bold">AVOID</span>
                    <span>THE VOID CRYSTALS</span>
                </div>
            </div>
        </div>
    );
};
