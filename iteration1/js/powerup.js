class Powerup {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.matter.add
            .sprite(0, 0, "Powerup", 0)
            .setBody({
                type: "circle",
                radius: 17
            })
            .setScale(1)
            .setFixedRotation()
            .setPosition(x, y)
            .setSensor(true)
            .setStatic(true)
    }

}