class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 1150, 300, 'boss');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.isMovingUp = true;

        scene.anims.create({
            key: 'enemy_idle',
            frames: [{ key: 'boss', frame: 0 }],
            frameRate: 4,
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