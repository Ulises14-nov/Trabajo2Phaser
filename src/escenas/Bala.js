class Bala extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bala');

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.scene = scene;
    };

    update() {
        this.x += 8;
        if (this.x < 0) {
            this.destroy();
        };
    };
};

export default Bala;
