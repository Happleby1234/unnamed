class SceneB extends BaseScene {
    constructor() {
        super('SceneB');
        this.tileDataKey = 'castle2';
        this.tileDataSource = 'assets/level2castle.json';
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        this.player = new Player(this, 90, 980);
        this.player.sprite.label = 'player'


        this.exit = this.matter.add.sprite(275, 60, 'exit');
        this.exit.setStatic(true);
        this.exit.label = 'exit';



        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

    }

    update(time, delta) {
        super.update(time, delta)
    }
    makeBarrel() {
        let barrel = this.matter.add.image(400, 32, 'barrel', { restitution: 1, friction: 0.5, density: 0.01 });
        //barrel.setScale(1);
        barrel.setBody({
            type: 'circle',
            radius: 10
        });
    }
}
