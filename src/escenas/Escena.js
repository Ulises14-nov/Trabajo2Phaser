import Enemigo from "./Enemigo.js";
import Nave from "./Nave.js";
//import Bala from "./Balas.js";

class Escena extends Phaser.Scene {

    constructor() {
        super("Escena");
        this.physics;
        this.nave;
        // this.balas;
        // this.disparo;
        // this.tiempo=0;
        // this.unabala;
        // this.game = new Phaser.Game();
    };
    

    preload() {
        this.load.image('fondo', '../public/img/sky.png');
        this.load.image('red', '../public/img/red.png');
        this.load.image('bala', '../public/img/shoot.png');
        this.load.spritesheet('nave', '../public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
    };

    create() {
        this.add.image(500, 300, 'fondo').setScale(2);
        this.add.image(100, 70, 'bala');
        this.nave = new Nave(this);

        let particles = this.add.particles(-10, 0, 'red', {
            speed: 100,
            angle: { min: 150, max: 200 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        particles.startFollow(this.nave);
        this.enemigos = this.physics.add.group();
        this.enemySpawnTimer = this.time.addEvent({
            delay: 1000, // Intervalo de tiempo en milisegundos entre la aparición de enemigos
            repeat: 4,   // Número de enemigos a crear (ajusta según tu necesidad)
            callback: this.spawnEnemy,
            callbackScope: this
        });

        // this.disparo=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // this.balas=this.game.add.group();
        // this.balas.enableBody=true;
        // this.balas.physicsBodyType=Phaser.physics.ARCADE;
        // this.balas.createMultiple(30,'bala');
        // this.balas.setAll('outOfBoundsKill',true);
        // this.balas.setAll('checkWorlBounds',true);
    };

    update() {
        this.nave.update(this.input.keyboard.createCursorKeys());
        this.enemigos.children.iterate(enemigo => {
            enemigo.update();
        });

        // this.nave.update(this.input.keyboard.createCursorKeys());
        // this.balas.children.iterate(bala => {
        //     bala.update();
        // });
        
        // if(this.disparo.isDown){
        //     if(this.game.time.now > this.tiempo){
        //         this.unabala=this.balas.getFirstExists(false);
        //     }
        //     if(this.unabala){
        //         this.unabala.reset(nave.x,nave.y);
        //         this.unabala.body.velocity.x=200;
        //         this.tiempo=this.escena.time.now+100;
        //     }
        // }

    };

    spawnEnemy() {
        const enemigo = new Enemigo(this);
        this.enemigos.add(enemigo);
    };
};

export default Escena;