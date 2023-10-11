class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 1100, Phaser.Math.Between(30, 570), 'enemigo');

        scene.add.existing(this);
        scene.physics.world.enable(this);
    };

    update() {
        this.x += -6;
        if (this.x < -10) {
            this.reset();
        };
    };

    reset() {
        this.x = 1150;
        this.y = Phaser.Math.Between(30, 570);
    };
};

export default Enemigo;