import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        // We handle the UI in React, so this scene can be empty or just show a background dim
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);
    }
}
