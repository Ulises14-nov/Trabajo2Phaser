class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, balasBoss) {
        super(scene, 1150, 300, 'boss');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.setCollideWorldBounds(true);
        this.isMovingUp = true;
        this.bossHasBeenHit = false;

        this.balasBoss = balasBoss;

        this.bossLife = 12;

        scene.anims.create({
            key: 'hit',
            frames: scene.anims.generateFrameNumbers('enemigoExplosion', { start: 0, end: 5 }),
            frameRate: 8
        });
    };

    update() {
        this.x += -2;
        if (this.x < 950) {
            this.x = 950;
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
    };
};

export default Boss;