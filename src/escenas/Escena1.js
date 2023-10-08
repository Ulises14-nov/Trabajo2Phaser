import Nave from "./nave.js";
class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1");
        this.physics;
        this.nave;
    }
    init(){

    }
    preload(){
        this.load.image('fondo','../public/img/sky.png');
        this.load.image('red','../public/img/red.png');
        this.load.spritesheet('nave', '../public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
    }
    create(){
        this.add.image(500, 300, 'fondo').setScale(2);
        this.nave=new Nave(this, 100, 100);
        
        let particles=this.add.particles(-10,0,'red',{
            speed:100,
            angle:{min:150,max:200},
            scale:{start:1,end:0},
            blendMode:'ADD'
        });

        particles.startFollow(this.nave)
    }
    update(time, deltatime){
        // this.img.on('pointerdown', ()=>{
        //     this.scene.start('Escena2');
        // });
        this.nave.update(this.input.keyboard.createCursorKeys());
    }   
}
export default Escena1;