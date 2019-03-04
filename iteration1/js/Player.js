class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.matter.add
            .sprite(0, 0, "player", 0)
            .setBody({
                type: "circle",
                radius: 6
            })
            .setScale(2)
            .setFixedRotation()
            .setPosition(x, y)
            .setBounce(0.01)
            .setFriction(0.001);

        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }
        update() {
            if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
                this.moveRight = true;

            } else if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
                this.moveLeft = true;
            }
            if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
                this.jumpUp = true;
            }

            if (this.moveRight) {

                this.sprite.applyForce({
                    x: this.xForce,
                    y: 0
                });
            } else if (this.moveLeft) {
                this.sprite.applyForce({
                    x: -this.xForce,
                    y: 0
                });
            }
            if (this.jumpUp) {
                this.sprite.applyForce({
                    x: 0,
                    y: -this.yForce
                });
            }
            // clamp velocity
            const clamp = 5;
            if (this.sprite.body.velocity.x > clamp) {
                this.sprite.setVelocityX(clamp);
            } else if (this.sprite.body.velocity.x < -clamp) {
                this.sprite.setVelocityX(-clamp);
            }
            this.moveLeft = this.moveRight = this.jumpUp = false;
        }
    
}
