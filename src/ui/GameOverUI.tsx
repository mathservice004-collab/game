import { useGameStore } from '../store/useGameStore';
import { RotateCcw, Home, Send } from 'lucide-react';

export const GameOverUI = () => {
    const { lastScore, highScore, setStatus } = useGameStore();

    const handleRestart = () => {
        // We need to restart the phaser scene. The simplest way is to reload or use a message bus.
        // In this MVP, we'll just reload the page to ensure all state is clean.
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center h-full bg-black/80 backdrop-blur-md">
            <div className="glass-panel p-12 max-w-md w-full text-center border-t-4 border-t-red-600">
                <h2 className="text-5xl font-black text-white mb-2 italic tracking-tighter uppercase">Terminated</h2>
                <div className="text-red-500 font-bold tracking-widest text-sm mb-8">CONNECTION LOST</div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-neutral-500 text-xs uppercase mb-1">Final Score</div>
                        <div className="text-2xl font-bold neon-text-purple">{lastScore}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-neutral-500 text-xs uppercase mb-1">Best Score</div>
                        <div className="text-2xl font-bold neon-text-blue">{highScore}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleRestart}
                        className="btn-neon flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        REBOOT SYSTEM
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStatus('menu')}
                            className="btn-secondary flex-1 flex items-center justify-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            MENU
                        </button>
                        <button
                            className="btn-secondary flex-1 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                            title="Work in progress"
                        >
                            <Send className="w-4 h-4" />
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
