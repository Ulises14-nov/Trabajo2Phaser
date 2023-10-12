import EscenaBase from "./EscenaBase.js";

class Menu extends EscenaBase {
    constructor() {
        super("Menu");
        this.text;
    };

    preload() {
        super.preload();
    };

    create() {
        this.selectSound = this.sound.add('selectSound');
        this.selectSound.volume = 0.5;

        this.add.image(500, 300, 'winBG').setScale(2);

        this.text = this.add.text(550, 300, 'BLUE HOPE', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#F9F9F9'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(550, 300, 'PRESIONA ENTER PARA EMPEZAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

        this.input.keyboard.on('keydown-ENTER', () => {
            this.selectSound.play();
            this.scene.start('EscenaFinal');
        });
    };
};

export default Menu;