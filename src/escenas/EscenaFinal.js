import EscenaBase from "./EscenaBase.js";
import Bala from "./Bala.js";

class EscenaFinal extends EscenaBase {
    constructor() {
        super("EscenaFinal");
    };

    init(data) {
        this.score = data.score;
    };

    create() {
        this.add.image(550, 300, 'bossBG');
        this.lifes = 3;
        this.balasBoss = this.physics.add.group();
        this.balas = this.physics.add.group();
        this.createPlayer();
        this.createBoss();


        this.physics.add.collider(this.balas, this.boss, this.reduceLife, null, this);
        this.physics.add.collider(this.balasBoss, this.nave, this.handlePlayerDamage, null, this);
        this.physics.add.collider(this.nave, this.boss, this.handlePlayerDamage, null, this);

        this.lifeText = this.add.text(16, 16, `Vidas: ${this.lifes}`, {
            fontFamily: 'VT323, monospace',
            fontSize: '52px',
            fill: '#F9F9F9'
        });

        this.scoreText = this.add.text(814, 520, `Puntos: ${this.score}`, {
            fontFamily: 'VT323, monospace',
            fontSize: '52px',
            fill: '#F9F9F9'
        });

        this.bossBulletTimer = this.time.addEvent({
            delay: 650,
            callback: this.bossBullets,
            callbackScope: this,
            loop: true
        });

        this.particles = this.add.particles(-5, 0, 'red', {
            speed: 100,
            angle: { min: -30, max: 200 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            x: this.boss.x + 60,
            y: this.boss.y
        });

        this.particles2 = this.add.particles(-5, 0, 'orange', {
            speed: 100,
            angle: { min: -30, max: 200 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            x: this.boss.x + 60,
            y: this.boss.y
        });
    };

    update() {
        this.nave.update(this.input.keyboard.createCursorKeys());
        this.boss.update();

        this.balasBoss.children.iterate(bala => {
            if (bala && bala.update) {
                bala.setTint(0xFF0000);
                bala.update();
            };
        });

        this.balas.children.iterate(bala => {
            if (bala && bala.update) {
                bala.update();
            };
        });
    };

    bossBullets() {
        const atackSound = this.sound.add('atackSound');
        atackSound.volume = 0.2;
        atackSound.play();
        const bala = new Bala(this, this.boss.x, this.boss.y, -8);
        this.balasBoss.add(bala);
    };

    reduceLife() {
        this.loseSound = this.sound.add('loseSound');
        this.loseSound.volume = 0.1;

        if (!this.bossSoundPlayed) {
            this.bossSoundPlayed = true;
            this.boss.setTint(0xFF0000);
            this.loseSound.play();
            this.boss.bossLife -= 1;
            console.log(this.boss.bossLife)

            this.time.delayedCall(1000, () => {
                this.bossSoundPlayed = false;
                this.boss.clearTint();
            });
        };

        if (this.boss.bossLife <= 8) {
            this.particles.startFollow(this.boss);
            if (this.boss.bossLife <= 5) {
                this.particles2.startFollow(this.boss);
            };
        };

        if (this.bossLife <= 8) {
            this.particles.startFollow(this.boss);
            if (this.bossLife <= 5) {
                this.particles2.startFollow(this.boss);
            }
        }

        if (this.boss.bossLife <= 0) {
            this.boss.play('hit', true);
            this.balasBoss.children.iterate(bala => {
                if (bala) {
                    bala.destroy();
                }
            });

            setTimeout(() => {
                this.balasBoss.clear(true, true);
                this.bossSoundPlayed = false;
                this.scene.start('Gana', { score: this.score });
            }, 1500);
        };
    };
};

export default EscenaFinal;