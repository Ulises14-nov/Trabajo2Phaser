class Bala extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 600, 600, 'bala');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        // scene.physics.add.existing(this);

        // this.setCollideWorldBounds(true);

        scene.anims.create({
            key: 'turn_idle',
            frames: [{ key: 'bala', frame: 0 }],
            frameRate: 5,
            repeat: -1
        });

        this.cursors = scene.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE     
        });
    }

    update() {
        if (this.body) {
            //  if (this.cursors.space.isDown) {
            //     this.setVelocityY(160);
            //     this.anims.play('turn_idle', true);
            //  }
            this.input.keyboard.on('keydown-R', () => {
                this.physics.resume();
                this.x += 6;
                if (this.x < 10) {
                    this.reset();
                };
            });
        }     
      
    }    

    reset() {
        this.x = 12;
     };
}
export default Bala;