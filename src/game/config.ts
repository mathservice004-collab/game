import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { PlayScene } from './scenes/PlayScene';
import { GameOverScene } from './scenes/GameOverScene';

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#050505',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    scene: [BootScene, PlayScene, GameOverScene],
};
