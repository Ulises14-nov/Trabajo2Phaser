import EscenaBase from "./EscenaBase.js";

class Pierde extends EscenaBase {
    constructor() {
        super("Pierde");
        this.text;
    };

    preload() {
        this.load.audio('selectSound', '../public/sounds/SelectSound.wav');

        this.load.image('sky', 'img/sky.png');
        this.load.image('ground', 'img/platform.png');
        this.load.image('bomb', 'img/bomb.png');
    };

    create() {
        this.selectSound = this.sound.add('selectSound');

        this.add.image(500, 300, 'sky').setScale(2);

        this.text = this.add.text(500, 300, 'Perdiste :(', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#000'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(500, 300, 'PRESIONA R PARA REINICIAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

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