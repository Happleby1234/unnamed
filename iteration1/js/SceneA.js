class SceneA extends BaseScene {
    constructor(){
      super('SceneA');
      this.tileDataKey = 'castle';
      this.tileDataSource = 'assets/level1.json';
    }

    preload() {
        super.preload();

        this.load.spritesheet(
            'player',
            'assets/player.png', {
                frameWidth: 15,
                frameHeight: 15,
                margin: 1,
                spacing: 2
            }
        );
    }

    create() {
        super.create();
        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        this.player = new Player(this, 200, 128);
        this.player.sprite.label = 'player'

        this.exit = this.matter.add.sprite(450, 45, 'exit');
        this.exit.setStatic(true);
        this.exit.label = 'exit';
    }

    update(time, delta) {
      super.update(time, delta);
    }
}
