import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { gameConfig } from './game/config';
import { useGameStore } from './store/useGameStore';
import { MainMenu } from './ui/MainMenu';
import { GameOverUI } from './ui/GameOverUI';
import { HUD } from './ui/HUD';
import { LeaderboardUI } from './ui/LeaderboardUI';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const gameRef = useRef<Phaser.Game | null>(null);
    const status = useGameStore((state) => state.status);

    useEffect(() => {
        if (!gameRef.current) {
            gameRef.current = new Phaser.Game(gameConfig);
        }

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black font-['Outfit']">
            {/* Game Container */}
            <div id="game-container" className="absolute inset-0 z-0" />

            {/* UI Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <AnimatePresence>
                    {status === 'menu' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pointer-events-auto"
                        >
                            <MainMenu />
                        </motion.div>
                    )}

                    {status === 'playing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="pointer-events-none"
                        >
                            <HUD />
                        </motion.div>
                    )}

                    {status === 'gameover' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="pointer-events-auto"
                        >
                            <GameOverUI />
                        </motion.div>
                    )}

                    {status === 'leaderboard' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="pointer-events-auto"
                        >
                            <LeaderboardUI />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative Neon Background */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/40 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/40 rounded-full blur-[120px] animate-pulse-slow delay-700" />
            </div>
        </div>
    );
}

export default App;
