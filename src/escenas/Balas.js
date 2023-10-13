class Balas extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'balas');

        scene.add.existing(this);
        scene.physics.world.enable(this);

        // Resto de la configuración de la bala
        this.setDepth(1);
        this.setOrigin(0.5, 0.5);
        this.setVelocityX(0);
        this.setVelocityY(0);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }

    update() {
        this.x += 8;
    }
}

export default Balas;