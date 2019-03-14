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
        //touchscreen stuff
        this.scene.input.on('pointerdown', this.handlePointerDown, this);
        this.scene.input.on('pointerup', this.handlePointerUp, this);
        this.isTouching = false;
        this.touchData = {};

        console.log(this);
    }
    handlePointerDown(pointer) {
        this.touchData.startX = pointer.x;
        this.touchData.startY = pointer.y;
    }
    handlePointerUp(pointer) {
        this.touchData.endX = pointer.x;
        this.touchData.endY = pointer.y;
        this.handleTouch();
    }
    handleTouch() {
        const distX = this.touchData.endX - this.touchData.startX;
        const distY = this.touchData.endY - this.touchData.startY;
        this.touchData = {};
        const tolerance = 5;
        if (distX > 0 + tolerance) {
            this.moveRight = true;
        } else if (distX < 0 - tolerance) {
            this.moveLeft = true;
        } else if (Math.abs(distX) < tolerance && Math.abs(distY) < tolerance) {
            this.jumpUp = true;
        }
    }
        update() {
            if (this.keys.right.isDown) {
                
                this.sprite.flipX = false;
                this.moveRight = true;


            } else if (this.keys.left.isDown) {

                this.sprite.flipX = true;
                this.moveLeft = true;
            } 

            if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
                this.jumpUp = true;
            }
            const xForce = 0.013;
            const yForce = 0.011;

            if (this.moveRight) {
                this.sprite.applyForce({
                    x: xForce,
                    y: 0.001
                });
            } else if (this.moveLeft) {
                this.sprite.applyForce({
                    x: -xForce,
                    y: 0
                });
            } else {
                this.sprite.anims.play("idle",true);
                this.sprite.applyForce({
                    x: 0,
                    y: 0
                })
            }
            if (this.jumpUp) {
                this.sprite.anims.play("jump", true)
                this.sprite.applyForce({
                    x: 0,
                    y: -yForce
                });
            }
            
            // clamp velocity
            const clamp = 10;
            if (this.sprite.body.velocity.x > clamp) {
                this.sprite.setVelocityX(clamp);
            } else if (this.sprite.body.velocity.x < -clamp) {
                this.sprite.setVelocityX(-clamp);
            }
            this.moveLeft = this.moveRight = this.jumpUp = false;

            if (this.sprite.body.velocity.x > 0) {
                this.sprite.anims.play('walk', true);
                this.sprite.flipX = false;
            } else if (this.sprite.body.velocity.x < 0) {
                this.sprite.anims.play('walk', true);
                this.sprite.flipX = true;
            }
    }

    freeze() {
        this.sprite.setStatic(true);
    }


    //***ANIMATION***//

    destroy() { }

}
