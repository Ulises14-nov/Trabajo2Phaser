class Nave extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 100, 300, 'nave');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        scene.anims.create({
            key: 'up_move',
            frames: scene.anims.generateFrameNumbers('nave', { start: 2, end: 0 }),
            frameRate: 5,
            repeat: 0,
            yoyo: true
        });

        scene.anims.create({
            key: 'down_move',
            frames: scene.anims.generateFrameNumbers('nave', { start: 2, end: 4 }),
            frameRate: 5,
            repeat: 0,
            yoyo: true
        });

        scene.anims.create({
            key: 'turn_idle',
            frames: [{ key: 'nave', frame: 2 }],
            frameRate: 4,
            repeat: -1,
            yoyo: true
        });

        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            up2: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            down2: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    };

    update() {
        if (this.body) {
            if (this.cursors.up.isDown || this.cursors.up2.isDown) {
                this.setVelocityY(-160);
                this.anims.play('up_move', true);
            } else if (this.cursors.down.isDown || this.cursors.down2.isDown) {
                this.setVelocityY(160);
                this.anims.play('down_move', true);
            } else if (this.cursors.right.isDown || this.cursors.right2.isDown) {
                this.setVelocityX(160);
                this.anims.play('turn_idle', true);
            } else if (this.cursors.left.isDown || this.cursors.left2.isDown) {
                this.setVelocityX(-160);
                this.anims.play('turn_idle');
            } else {
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.anims.play('turn_idle');
            };

            if (this.cursors.space.isDown) {
                this.scene.shoot();
            };
        };
    };
};

export default Nave;
