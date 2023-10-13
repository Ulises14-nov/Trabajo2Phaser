class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 1100, Phaser.Math.Between(30, 570), 'enemigo');
this.hasBeenHit = false;

        scene.add.existing(this);
        scene.physics.world.enable(this);

        scene.anims.create({
            key: 'explotion',
            frames: scene.anims.generateFrameNumbers('enemigoExplosion', { start: 0, end: 5 }),
            frameRate: 8
        });

        scene.anims.create({
            key: 'enemy_idle',
            frames: [{ key: 'enemigo', frame: 0 }],
            frameRate: 4,
        });

        this.explosionPlaying = false;
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

export default Enemigo;