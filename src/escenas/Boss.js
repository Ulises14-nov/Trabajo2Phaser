class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 950, 300, 'boss');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.isMovingUp = true;

        this.bossLife = 15;

        scene.anims.create({
            key: 'bossExplotion',
            frames: scene.anims.generateFrameNumbers('enemigoExplosion', { start: 0, end: 5 }),
            frameRate: 8
        });

        scene.anims.create({
            key: 'enemy_idle',
            frames: [{ key: 'boss', frame: 0 }],
            frameRate: 4,
        });
    };


    update() {
        this.x += -6;
        if (this.x < -10) {
            this.reset();
        };

        setTimeout(() => {
            if (this.isMovingUp) {
                this.y -= 2;
                if (this.y <= 150) {
                    this.isMovingUp = false;
                };
            } else {
                this.y += 2;
                if (this.y >= 450) {
                    this.isMovingUp = true;
                };
            };
        }, 2000);

        if (this.vida <= 0) {
        };
    };

    destroyBoss() {

        this.destroy();
    }
};

export default Boss;