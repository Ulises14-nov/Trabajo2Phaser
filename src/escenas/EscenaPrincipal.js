import EscenaBase from "./EscenaBase.js";

class Escena extends EscenaBase {

    constructor() {
        super("Escena");
    };

    init(data) {
        this.score = data.score;
        this.lifes = data.lifes;
    };

    create() {
        //Imagenes
        this.add.image(600, 300, 'fondo');
        this.add.image(300, 300, 'fondo2');
        this.lifes = 3;
        this.score = 0;

        this.balas = this.physics.add.group();

        this.createPlayer();
        this.createEnemies();

        this.physics.add.collider(this.balas, this.enemigos, this.bulletCollision, null, this);
        this.physics.add.collider(this.nave, this.enemigos, this.handlePlayerDamage, null, this);

        this.lifeText = this.add.text(16, 16, 'Vidas: 3', {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });

        this.scoreText = this.add.text(814, 520, `Puntos: ${this.score}`, {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });
    };

    update() {
        this.nave.update(this.input.keyboard.createCursorKeys());
        this.enemigos.children.iterate(enemigo => {
            if (enemigo && enemigo.update) {
                enemigo.update();
            };
        });

        this.balas.children.iterate(bala => {
            if (bala && bala.update) {
                bala.update();
            };
        });

        if (this.score >= 200) {
            this.scene.start('EscenaFinal', { score: this.score, lifes: this.lifes }, { reset: true });
        };
    };
};

export default Escena;