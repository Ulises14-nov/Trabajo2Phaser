import EscenaBase from "./EscenaBase.js";

class Gana extends EscenaBase {
    constructor() {
        super("Gana");
        this.text;
    };

    preload() {
        super.preload();
    }

    create() {
        this.selectSound = this.sound.add('selectSound');

        this.add.image(500, 300, 'sky').setScale(2);

        this.text = this.add.text(550, 300, '¡Ganaste!', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#000'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(550, 300, 'PRESIONA R PARA REINICIAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

        this.input.keyboard.on('keydown-R', () => {
            this.physics.pause();
            this.selectSound.play();
            this.scene.start('Escena', { restart: true });
        });
    };
};

export default Gana;