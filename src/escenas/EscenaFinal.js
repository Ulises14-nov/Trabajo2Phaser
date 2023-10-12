import EscenaBase from "./EscenaBase.js";

class EscenaFinal extends EscenaBase {

    constructor() {
        super("Escena");
        this.physics;
        this.nave;
        this.lifeText;
        this.score;
        this.scoreText;
    };

    create() {
        //Imagenes
        this.add.image(550, 300, 'bossBG');
        this.lifes = 3;
        this.score = 0;

        this.createPlayer();

        this.physics.add.collider(this.nave, this.enemigos, this.enemyCollision, null, this);

        this.lifeText = this.add.text(16, 16, 'Vidas: 3', {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });

        this.scoreText = this.add.text(814, 520, 'Puntos: 0', {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });
    };

    update() {
        this.nave.update(this.input.keyboard.createCursorKeys());
    };
};

export default EscenaFinal;