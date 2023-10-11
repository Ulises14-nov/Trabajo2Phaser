import EscenaBase from "./EscenaBase.js";

class Menu extends EscenaBase {
    constructor() {
        super("Menu");
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

        this.text = this.add.text(500, 300, 'PRESIONA ENTER PARA EMPEZAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

        this.input.keyboard.on('keydown-ENTER', () => {
            this.selectSound.play();
            this.scene.start('Escena');
        });
    };
};

export default Menu;