import Phaser from 'phaser';
import { useGameStore } from '../../store/useGameStore';

export class PlayScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private obstacles!: Phaser.Physics.Arcade.Group;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private gameSpeed = 300;
    private spawnTimer = 0;
    private isGameOver = false;
    private score = 0;
    private nextSpeedIncrease = 1000;

    constructor() {
        super('PlayScene');
    }

    create() {
        this.isGameOver = false;
        this.gameSpeed = 300;
        this.score = 0;
        this.nextSpeedIncrease = 1000;

        // Background effect (scrolling lines)
        this.setupBackground();

        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setAngle(-90); // Point upwards

        this.obstacles = this.physics.add.group();

        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        this.physics.add.overlap(this.player, this.obstacles, this.handleCollision, undefined, this);

        // Communicate with React Store
        useGameStore.getState().setStatus('playing');
        useGameStore.getState().setScore(0);
    }

    setupBackground() {
        // Basic neon grid effect
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x111111, 1);

        for (let x = 0; x < 800; x += 40) {
            graphics.lineBetween(x, 0, x, 600);
        }
        for (let y = 0; y < 600; y += 40) {
            graphics.lineBetween(0, y, 800, y);
        }
    }

    update(time: number, delta: number) {
        if (this.isGameOver) return;

        // Movement
        if (this.cursors.left?.isDown) {
            this.player.setVelocityX(-400);
            this.player.setAngle(-100);
        } else if (this.cursors.right?.isDown) {
            this.player.setVelocityX(400);
            this.player.setAngle(-80);
        } else {
            this.player.setVelocityX(0);
            this.player.setAngle(-90);
        }

        // Spawning
        this.spawnTimer += delta;
        if (this.spawnTimer > Math.max(400, 800 - (this.gameSpeed / 10))) {
            this.spawnObstacle();
            this.spawnTimer = 0;
        }

        // Update score based on survival
        this.score += delta * 0.01 * (this.gameSpeed / 300);
        const roundedScore = Math.floor(this.score);
        if (roundedScore % 10 === 0) {
            useGameStore.getState().setScore(roundedScore);
        }

        // Increase speed and Level
        if (this.score > this.nextSpeedIncrease) {
            this.gameSpeed += 60;
            this.nextSpeedIncrease += 1000;

            const currentLevel = useGameStore.getState().level;
            const newLevel = currentLevel + 1;
            useGameStore.getState().setLevel(newLevel);

            // Visual feedback for level up
            this.cameras.main.flash(500, 0, 229, 255, 0.3); // Flash neon blue
        }

        // Cleanup obstacles
        this.obstacles.getChildren().forEach((obj) => {
            const obstacle = obj as Phaser.Physics.Arcade.Sprite;
            if (obstacle.y > 700) {
                obstacle.destroy();
            }
        });
    }

    spawnObstacle() {
        const x = Phaser.Math.Between(50, 750);
        const obstacle = this.obstacles.create(x, -50, 'obstacle');
        obstacle.setVelocityY(this.gameSpeed);
        obstacle.setAngularVelocity(Phaser.Math.Between(-100, 100));
    }

    handleCollision() {
        this.isGameOver = true;
        this.physics.pause();
        this.player.setTint(0xff0000);

        // Shake effect
        this.cameras.main.shake(200, 0.02);

        // Particles
        const emitter = this.add.particles(this.player.x, this.player.y, 'pixel', {
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            lifespan: 1000,
            gravityY: 0
        });
        emitter.explode(20);

        setTimeout(() => {
            useGameStore.getState().gameOver(Math.floor(this.score));
            this.scene.start('GameOverScene');
        }, 1000);
    }
}
