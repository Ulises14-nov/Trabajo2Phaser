class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 950, 300, 'boss');
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
        this.x = 1200;
        this.y = Phaser.Math.Between(30, 570);
        this.setVelocity(0, 0);
        this.setAcceleration(0);
        this.setAngularVelocity(0);
        this.angle = 0;

        this.anims.play('enemy_idle', true);
        this.setFrame(0);

        this.explosionPlaying = false;
    };
};

export default Boss;