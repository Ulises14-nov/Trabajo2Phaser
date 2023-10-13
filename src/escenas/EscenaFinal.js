import Boss from "./Boss.js";
import EscenaBase from "./EscenaBase.js";

class EscenaFinal extends EscenaBase {

    constructor() {
        super("EscenaFinal");
    };

    init(data) {
        this.score = data.score;
    };

    create() {
        //Imagenes
        this.add.image(550, 300, 'bossBG');
        this.lifes = 3;

        const boss = new Boss(this);
        this.boss = boss;
        this.createPlayer();
        this.balas = this.physics.add.group();

        this.physics.add.overlap(this.balas, this.enemigos, this.bulletCollision, null, this);
        this.physics.add.collider(this.nave, this.enemigos, this.enemyCollision, null, this);

        this.lifeText = this.add.text(16, 16, 'Vidas: 3', {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });

        this.scoreText = this.add.text(814, 520, `Puntos: ${this.score}`, {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });
    };

    update() {
        this.nave.update(this.input.keyboard.createCursorKeys());
        this.boss.update();
    };
};

export default EscenaFinal;