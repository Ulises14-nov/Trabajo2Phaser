import Enemigo from "./Enemigo.js";
import Nave from "./Nave.js";

class EscenaBase extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.nave;
        this.enemigo;
        this.lifeText;
        this.scoreText;
        this.score = 0;
        this.lifes = 3;
        this.soundPlayed = false;
        this.canLoseLife = true;
        this.collidingEnemy = null;
    };

    preload() {
        //Imagenes
        this.load.image('fondo', '../public/img/SpaceBackground.png');
        this.load.image('fondo2', '../public/img/PlanetBG.png');
        this.load.image('red', '../public/img/red.png');
        this.load.spritesheet('nave', '../public/img/Player.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('enemigo', '../public/img/Enemy.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('boss', '../public/img/Boss.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('enemigoExplosion', '../public/img/EnemyExplotion.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('bossExplosion', '../public/img/ExplotionEND.png', { frameWidth: 70, frameHeight: 70 });

        //Sonidos
        this.load.audio('loseSound', '../public/sounds/LoseSound.wav');
        this.load.audio('selectSound', '../public/sounds/SelectSound.wav');
        this.load.audio('hurtSound', '../public/sounds/HurtSound.wav');
        this.load.audio('spawnSound', '../public/sounds/SpawnSound.wav');
        this.load.audio('atackSound', '../public/sounds/AtackSound.wav');
        this.load.audio('atackSuccessSound', '../public/sounds/AtackSuccessSound.wav');
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

    enemyCollision(nave, enemigo) {
        this.collidingEnemy = enemigo; // Guarda la referencia al enemigo colisionado

        this.collidingEnemy.play('explotion'); // Reproduce la animación en el enemigo colisionado
        this.hurtSound = this.sound.add('hurtSound');
        this.loseSound = this.sound.add('loseSound');

        if (this.canLoseLife) {
            this.canLoseLife = false;

            if (!this.soundPlayed) {
                this.hurtSound.play();
                this.soundPlayed = true;
                this.nave.setTint(0xFF0000);
            }

            this.lifes--;
            this.score -= 50;
            this.lifeText.setText(`Vidas: ${this.lifes}`);
            this.scoreText.setText(`Puntos: ${this.score}`);

            if (this.lifes <= 0) {
                setTimeout(() => {
                    if (this.nave) {
                        this.soundPlayed = false;
                        this.canLoseLife = true;
                        this.loseSound.play();
                        this.scene.start('Pierde');
                    }
                }, 500);
            }

            this.time.delayedCall(1000, () => {
                this.soundPlayed = false;
                this.canLoseLife = true;
                this.nave.clearTint();
            });
        }
    }

};

export default EscenaBase;