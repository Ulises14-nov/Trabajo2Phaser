class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 1100, Phaser.Math.Between(30, 570), 'enemigo');
        this.hasBeenHit = false;

        scene.add.existing(this);
        scene.physics.world.enable(this);

        scene.anims.create({
            key: 'enemy_idle',
            frames: [{ key: 'enemigo', frame: 0 }],
            frameRate: 4,
        });

        scene.anims.create({
            key: 'explotion',
            frames: scene.anims.generateFrameNumbers('enemigoExplosion', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
            yoyo: true
        });

        this.explosionPlaying = false;
    };

    update() {
        this.x += -6;
        if (this.x <= -10) {
            this.destroy();
        };

        if (this.hasBeenHit) {
            this.play('explotion', true);
            this.x -= -10;

            setTimeout(() => {
                this.destroy();
            }, 500);
        }
    };
};

export default Enemigo;