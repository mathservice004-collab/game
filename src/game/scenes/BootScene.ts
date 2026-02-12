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
        // Player ship
        const graphics = this.make.graphics({ x: 0, y: 0 });

        // Player
        graphics.lineStyle(2, 0x00e5ff, 1);
        graphics.fillStyle(0x00e5ff, 0.3);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(40, 20);
        graphics.lineTo(0, 40);
        graphics.lineTo(10, 20);
        graphics.closePath();
        graphics.strokePath();
        graphics.fillPath();
        graphics.generateTexture('player', 40, 40);
        graphics.clear();

        // Obstacle
        graphics.lineStyle(2, 0xbc13fe, 1);
        graphics.fillStyle(0xbc13fe, 0.2);
        graphics.strokeRect(0, 0, 40, 40);
        graphics.fillRect(2, 2, 36, 36);
        graphics.generateTexture('obstacle', 40, 40);
        graphics.clear();

        // Particle
        graphics.fillStyle(0x00e5ff, 1);
        graphics.fillRect(0, 0, 4, 4);
        graphics.generateTexture('pixel', 4, 4);
        graphics.clear();
    }
}
