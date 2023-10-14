import Enemigo from "./Enemigo.js";
import Nave from "./Nave.js";
import Bala from "./Bala.js";
import Boss from "./Boss.js";

class EscenaBase extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.balasJefe;
        this.score = 0;
        this.lifes = 3;
        this.soundPlayed = false;
        this.hurtSoundPlayed = false;
        this.bossSoundPlayed = false;
        this.canLoseLife = true;
        this.collidingEnemy = null;
    };

    preload() {
        //Imagenes
        this.load.image('fondo', '../public/img/SpaceBackground.png');
        this.load.image('fondo2', '../public/img/PlanetBG.png');
        this.load.image('loseBG', '../public/img/LoseBG.png');
        this.load.image('winBG', '../public/img/WinBG.png');
        this.load.image('bossBG', '../public/img/BossBG.png');
        this.load.image('red', '../public/img/red.png');
        this.load.image('orange', '../public/img/orange.png');
        this.load.image('enemigo', '../public/img/Enemy.png', { frameWidth: 70, frameHeight: 70 });
        this.load.image('boss', '../public/img/Boss.png', { frameWidth: 160, frameHeight: 220 });
        this.load.spritesheet('nave', '../public/img/Player.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('bala', '../public/img/shoot.png', { frameWidth: 38, frameHeight: 12 });
        this.load.spritesheet('enemigoExplosion', '../public/img/explotion.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('hit', '../public/img/hit.png', { frameWidth: 64, frameHeight: 64 });

        //Sonidos
        this.load.audio('loseSound', '../public/sounds/LoseSound.wav');
        this.load.audio('selectSound', '../public/sounds/SelectSound.wav');
        this.load.audio('hurtSound', '../public/sounds/HurtSound.wav');
        this.load.audio('spawnSound', '../public/sounds/SpawnSound.wav');
        this.load.audio('atackSound', '../public/sounds/AtackSound.wav');
        this.load.audio('atackSuccessSound', '../public/sounds/AtackSuccessSound.wav');
    };

    createPlayer() {
        if (this.nave) {
            this.nave.destroy();
        };

        this.nave = new Nave(this, this.balas);

        const particles = this.add.particles(-10, 0, 'red', {
            speed: 100,
            angle: { min: 150, max: 200 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        particles.startFollow(this.nave);
    };

    createBoss() {
        if (this.boss) {
            this.boss.destroy();
        };

        this.boss = new Boss(this, this.balasBoss);
    };

    createEnemies() {
        this.enemigos = this.physics.add.group();

        this.enemySpawnTimer = this.time.addEvent({
            delay: 500,
            repeat: -1,
            callback: this.spawnEnemy,
            callbackScope: this
        });
    };

    spawnEnemy() {
        const enemigo = new Enemigo(this);
        this.enemigos.add(enemigo);
    };

    bulletCollision(bala, enemigo) {
        bala.destroy();

        this.atackSuccessSound = this.sound.add('atackSuccessSound');
        this.atackSuccessSound.volume = 0.3;

        if (!enemigo.hasBeenHit) {
            this.atackSuccessSound.play();
            enemigo.hasBeenHit = true;
        };

        this.score += 25;
        this.scoreText.setText(`Puntos: ${this.score}`);
    };

    bossCollision(bala) {
        bala.destroy();

        this.boss.bossLife--;

        if (this.boss.bossLife <= 0) {
            this.score += 1000;
            this.scene.start('EscenaFinal', { score: this.score });
        };
    };

    handlePlayerDamage() {
        this.hurtSound = this.sound.add('hurtSound');
        this.hurtSound.volume = 0.2;
        this.loseSound = this.sound.add('loseSound');
        this.loseSound.volume = 0.2;

        if (this.canLoseLife) {
            this.canLoseLife = false;

            if (!this.hurtSoundPlayed) {
                this.hurtSound.play();
                this.hurtSoundPlayed = true;
                this.nave.setTint(0xFF0000);
            };

            this.lifes--;
            this.score -= 50;
            this.lifeText.setText(`Vidas: ${this.lifes}`);
            this.scoreText.setText(`Puntos: ${this.score}`);

            if (this.lifes <= 0) {
                setTimeout(() => {
                    if (this.nave) {
                        this.hurtSoundPlayed = false;
                        this.canLoseLife = true;
                        this.loseSound.play();
                        this.scene.start('Pierde');
                    }
                }, 500);
            } else {
                // Aplicar un breve tiempo de invulnerabilidad
                this.nave.setAlpha(0.5);

                this.time.delayedCall(1000, () => {
                    this.hurtSoundPlayed = false;
                    this.canLoseLife = true;
                    this.nave.clearTint();
                    this.nave.setAlpha(1);
                });
            };
        };
    };

    shoot(shooter, posicion, velocidad, balas) {
        const atackSound = this.sound.add('atackSound');
        atackSound.volume = 0.2;
        balas = this.balas;

        if (!this.soundPlayed) {
            this.soundPlayed = true;
            setTimeout(() => {
                if (shooter) {
                    this.soundPlayed = false;
                    atackSound.play();
                    const bala = new Bala(this, shooter.x + posicion, shooter.y, velocidad);

                    balas.add(bala);
                }
            }, 350);
        };
    };
};

export default EscenaBase;