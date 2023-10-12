import Escena from "./escenas/EscenaPrincipal.js";
import Menu from "./escenas/Menu.js";
import Pierde from "./escenas/Pierde.js";
import Gana from "./escenas/Gana.js";
import EscenaFinal from "./escenas/EscenaFinal.js";

const createScene = (Scene) => new Scene();
const Escenas = [Menu, Escena, EscenaFinal, Pierde, Gana];
const iniciarEscena = () => Escenas.map(createScene);

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
    scene: iniciarEscena()
};

let game = new Phaser.Game(config);