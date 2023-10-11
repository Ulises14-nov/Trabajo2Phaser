import Enemigo from "./Enemigo.js";
import Nave from "./Nave.js";

class EscenaBase extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.nave;
        this.enemigo;
        this.lifes = 3;
        this.soundPlayed = false;
        this.canLoseLife = true;
    };

    preload() {
        //Imagenes
        this.load.image('fondo', '../public/img/sky.png');
        this.load.image('fondo2', '../public/img/PlanetBG.png');
        this.load.image('red', '../public/img/red.png');
        this.load.spritesheet('nave', '../public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.spritesheet('enemigo', '../public/img/enemy.png', { frameWidth: 70, frameHeight: 62 });

        //Sonidos
        this.load.audio('loseSound', '../public/sounds/LoseSound.wav');
        this.load.audio('selectSound', '../public/sounds/SelectSound.wav');
        this.load.audio('hurtSound', '../public/sounds/HurtSound.wav');
        this.load.audio('spawnSound', '../public/sounds/SpawnSound.wav');
        this.load.audio('atackSound', '../public/sounds/AtackSound.wav');
        this.load.audio('atackSuccessSound', '../public/sounds/AtackSuccessSound.wav');
    };

    create() {
        //Sonidos
        this.loseSound = this.sound.add('loseSound');
        this.selectSound = this.sound.add('selectSound');
        this.spawnSound = this.sound.add('spawnSound');
    };

    createPlayer() {
        this.nave = new Nave(this);

        const particles = this.add.particles(-10, 0, 'red', {
            speed: 100,
            angle: { min: 150, max: 200 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        particles.startFollow(this.nave);
    };

    createEnemies() {
        this.enemigos = this.physics.add.group();

        this.enemySpawnTimer = this.time.addEvent({
            delay: 1000,
            repeat: 4,
            callback: this.spawnEnemy,
            callbackScope: this
        });
    };

    spawnEnemy() {
        const enemigo = new Enemigo(this);
        this.enemigos.add(enemigo);
    };

    enemyCollision() {
        if (this.canLoseLife) {
            this.canLoseLife = false;

            if (!this.soundPlayed) {
                this.loseSound.play();
                this.soundPlayed = true;
                this.nave.setTint(0xFF0000);
            }

            this.lifes--;
            this.scoreText.setText(`Vidas: ${this.lifes}`);

            if (this.lifes <= 0) {
                setTimeout(() => {
                    if (this.nave) {
                        this.soundPlayed = false;
                        this.canLoseLife = true;
                        this.scene.start('Pierde');
                    }
                }, 500);
            }

            this.time.delayedCall(1000, () => {
                this.soundPlayed = false;
                this.canLoseLife = true;
                this.nave.clearTint();
            });
        };
    };
};

export default EscenaBase;