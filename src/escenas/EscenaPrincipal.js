import EscenaBase from "./EscenaBase.js";

class Escena extends EscenaBase {

    constructor() {
        super("Escena");
        this.physics;
        this.nave;
    };

    create() {
        //Imagenes
        this.add.image(500, 300, 'fondo').setScale(2);
        this.add.image(300, 300, 'fondo2').setScale(2, 2.5);
        super.create();
        this.lifes = 3;

        this.createPlayer();
        this.createEnemies();

        this.physics.add.collider(this.nave, this.enemigos, this.enemyCollision, null, this);

        this.scoreText = this.add.text(16, 16, 'Vidas: 3', {
            fontSize: '32px',
            fill: '#F9F9F9'
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