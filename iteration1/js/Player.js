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
            if (this.keys.right.isDown) {
                this.sprite.anims.play('walk');
                this.sprite.flipX = false;
                this.moveRight = true;


            } else if (this.keys.left.isDown) {
                this.sprite.flipX = true;
                this.moveLeft = true;
            } 

            if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
                this.jumpUp = true;
            }
            const xForce = 0.003;
            const yForce = 0.011;

            if (this.moveRight) {

                this.sprite.applyForce({
                    x: xForce,
                    y: 0
                });
            } else if (this.moveLeft) {
                
                this.sprite.applyForce({
                    x: -xForce,
                    y: 0
                });
            } else {
                //this.sprite.anims.play("idle", true);
                this.sprite.applyForce({
                    x: 0,
                    y: 0
                })
            }
            if (this.jumpUp) {
                this.sprite.applyForce({
                    x: 0,
                    y: -yForce
                });
            }
            
            // clamp velocity
            const clamp = 0.1;
            if (this.sprite.body.velocity.x > clamp) {
                this.sprite.setVelocityX(clamp);
            } else if (this.sprite.body.velocity.x < -clamp) {
                this.sprite.setVelocityX(-clamp);
            }
            this.moveLeft = this.moveRight = this.jumpUp = false;
    }
    freeze() {
        this.sprite.setStatic(true);
    }


    //***ANIMATION***//
    createPlayerAnimations() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start:0,end: 15}),
            frameRate: 15,
            repeat: 1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 11, end: 15 }),
            frameRate: 15,
            repeat: -1
        });
    }
    destroy() { }

}
