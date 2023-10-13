class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 950, 300, 'boss');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        scene.anims.create({
            key: 'enemy_idle',
            frames: [{ key: 'boss', frame: 0 }],
            frameRate: 4,
        });
    };

    update() {
        this.x += -6;
        if (this.x < 700) {
            this.reset();
        };
    };

    reset() {
        this.x = 1200;
        this.y = Phaser.Math.Between(30, 570);
        this.setVelocity(10, 10);
        this.setAcceleration(0);
        this.setAngularVelocity(0);
        this.angle = 0;
        this.anims.play('enemy_idle', true);
        this.setFrame(0);
       
    };
};

export default Boss;