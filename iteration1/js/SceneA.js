class SceneA extends BaseScene {
    constructor(){
      super('SceneA');
      this.tileDataKey = 'castle';
      this.tileDataSource = 'assets/level1.json';
    }

    preload() {
        super.preload();
        this.load.image('castle_tileset_part1', 'assets/castle_tileset_part1.png');
        this.load.image('castle_tileset_part2', 'assets/castle_tileset_part2.png');
        this.load.image('castle_tileset_part3', 'assets/castle_tileset_part3.png');
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

    }

    update(time, delta) {
      super.update(time, delta);
    }
}
