class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 1100, Phaser.Math.Between(30, 570), 'enemigo');
        this.hasBeenHit = false;

        scene.add.existing(this);
        scene.physics.world.enable(this);

        scene.anims.create({
            key: 'explotion',
            frames: scene.anims.generateFrameNumbers('enemigoExplosion', { start: 0, end: 4 }),
            frameRate: 8,
            onStart: function (anims, anim, gameObject) {
                const explosionSound = scene.sound.add('explosionSound');
                explosionSound.play();
            },
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
        if (this.x <= 0) {
            this.destroy();
        };
    };
};

export default Enemigo;