import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Create simple shapes as placeholders/assets since we can't easily load external assets in this environment without specific URLs
        // We'll generate textures programmatically
        this.createTextures();

        const loadingText = this.add.text(400, 300, 'LOADING...', {
            fontSize: '32px',
            color: '#bc13fe'
        }).setOrigin(0.5);

        this.load.on('complete', () => {
            this.scene.start('PlayScene');
        });
    }

    createTextures() {
        // --- Improved Neon Car ---
        const graphics = this.make.graphics({ x: 0, y: 0 });

        // Body
        graphics.lineStyle(2, 0x00e5ff, 1);
        graphics.fillStyle(0x00e5ff, 0.2);

        // Main chassis
        graphics.strokeRect(5, 10, 30, 20);
        graphics.fillRect(5, 10, 30, 20);

        // Cabin
        graphics.strokeRect(10, 14, 15, 12);
        graphics.fillStyle(0x00e5ff, 0.6);
        graphics.fillRect(10, 14, 15, 12);

        // Spoiler
        graphics.lineStyle(2, 0x00e5ff, 1);
        graphics.lineBetween(5, 10, 0, 8);
        graphics.lineBetween(5, 30, 0, 32);
        graphics.lineBetween(0, 8, 0, 32);

        // Headlights (neon glow)
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(32, 12, 4, 2);
        graphics.fillRect(32, 26, 4, 2);

        graphics.generateTexture('player', 40, 40);
        graphics.clear();

        // --- Improved Neon Crystal Obstacle ---
        graphics.lineStyle(2, 0xbc13fe, 1);
        graphics.fillStyle(0xbc13fe, 0.3);

        // Crystal shape
        graphics.beginPath();
        graphics.moveTo(20, 0);   // Top
        graphics.lineTo(40, 20);  // Right
        graphics.lineTo(20, 40);  // Bottom
        graphics.lineTo(0, 20);   // Left
        graphics.closePath();
        graphics.strokePath();
        graphics.fillPath();

        // Inner detail
        graphics.lineStyle(1, 0xffffff, 0.5);
        graphics.lineBetween(20, 0, 20, 40);
        graphics.lineBetween(0, 20, 40, 20);

        graphics.generateTexture('obstacle', 40, 40);
        graphics.clear();

        // --- Particle ---
        graphics.fillStyle(0x00e5ff, 1);
        graphics.fillRect(0, 0, 4, 4);
        graphics.generateTexture('pixel', 4, 4);
        graphics.clear();
    }
}
