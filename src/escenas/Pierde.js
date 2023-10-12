import EscenaBase from "./EscenaBase.js";

class Pierde extends EscenaBase {
    constructor() {
        super("Pierde");
        this.text;
    };

    preload() {
        super.preload();
    };

    create() {
        this.selectSound = this.sound.add('selectSound');
        this.selectSound.volume = 0.5;

        this.add.image(550, 300, 'loseBG');

        this.text = this.add.text(550, 300, 'Perdiste :(', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#F9F9F9'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(550, 300, 'PRESIONA R PARA REINICIAR', {
            fontFamily: 'VT323, monospace', fontSize: '32px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

        this.text = this.add.text(550, 300, 'PRESIONA ENTER PARA VOLVER AL MENU', {
            fontFamily: 'VT323, monospace', fontSize: '32px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, -2);

        this.input.keyboard.on('keydown-R', () => {
            this.selectSound.play();
            this.scene.start('Escena', { reset: true });
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.selectSound.play();
            this.scene.start('Menu', { reset: true });
        });
    };
};

export default Pierde;