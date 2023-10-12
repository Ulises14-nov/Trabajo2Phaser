import EscenaBase from "./EscenaBase.js";

class Escena extends EscenaBase {

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
        this.add.image(500, 300, 'fondo').setScale(2);
        this.add.image(300, 300, 'fondo2');
        this.lifes = 3;
        this.score = 0;

        this.createPlayer();
        this.createEnemies();

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
        this.enemigos.children.iterate(enemigo => {
            enemigo.update();
        });
    };
};

export default Escena;