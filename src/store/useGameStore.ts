import { create } from 'zustand';

interface GameState {
    score: number;
    highScore: number;
    status: 'menu' | 'playing' | 'gameover' | 'leaderboard';
    combo: number;
    lastScore: number;

    setScore: (score: number) => void;
    setHighScore: (score: number) => void;
    setStatus: (status: 'menu' | 'playing' | 'gameover' | 'leaderboard') => void;
    setCombo: (combo: number) => void;
    resetGame: () => void;
    gameOver: (finalScore: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
    score: 0,
    highScore: 0,
    status: 'menu',
    combo: 1,
    lastScore: 0,

    setScore: (score) => set({ score }),
    setHighScore: (highScore) => set({ highScore }),
    setStatus: (status) => set({ status }),
    setCombo: (combo) => set({ combo }),

    resetGame: () => set({
        score: 0,
        status: 'playing',
        combo: 1
    }),

    gameOver: (finalScore) => set((state) => {
        const isNewHighScore = finalScore > state.highScore;
        return {
            status: 'gameover',
            lastScore: finalScore,
            highScore: isNewHighScore ? finalScore : state.highScore,
        };
    }),
}));
