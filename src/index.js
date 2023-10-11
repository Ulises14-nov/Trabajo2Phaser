import Escena from "./escenas/Escena.js"

let config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: Escena
};

let game = new Phaser.Game(config);