class Escena2 extends Phaser.Scene{
    constructor(){
        super("Escena2");
    }
    init(){

    }
    preload(){
        //this.load.path=""
        this.load.image('fond','../public/img/nave.png');
    }
    create(){
        this.add.image(500,500,'fond');
      // this.scene.start('Escena1');
    }
    update(time, deltatime){
        
    }   
}
export default Escena2;